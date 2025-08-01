from fastapi import APIRouter, Query
from sqlalchemy import func
from models import SessionLocal, Click, Conversion
from datetime import datetime

router = APIRouter()

@router.get("/overview")
def get_kpis():
    db = SessionLocal()
    clicks = db.query(Click).count()
    conversions = db.query(Conversion).count()
    total_value = db.query(func.sum(Conversion.value)).scalar() or 0
    return {
        "clicks": clicks,
        "conversions": conversions,
        "total_value": total_value,
        "conversion_rate": f"{(conversions / clicks * 100):.2f}%" if clicks else "0.00%"
    }

@router.get("/link/{link_id}")
def stats_by_link(link_id: str,
                  start_date: str = Query(None),
                  end_date: str = Query(None)):
    db = SessionLocal()

    # Preparar range de datas
    click_query = db.query(Click).filter(Click.link_id == link_id)
    conv_query = db.query(Conversion).join(Click, Conversion.click_id == Click.id).filter(Click.link_id == link_id)

    if start_date:
        start_dt = datetime.fromisoformat(start_date)
        click_query = click_query.filter(Click.timestamp >= start_dt)
        conv_query = conv_query.filter(Conversion.timestamp >= start_dt)

    if end_date:
        end_dt = datetime.fromisoformat(end_date)
        click_query = click_query.filter(Click.timestamp <= end_dt)
        conv_query = conv_query.filter(Conversion.timestamp <= end_dt)

    total_clicks = click_query.count()
    total_convs = conv_query.count()
    total_value = db.query(func.sum(Conversion.value)).filter(
        Conversion.id.in_([c.id for c in conv_query])
    ).scalar() or 0

    return {
        "link_id": link_id,
        "clicks": total_clicks,
        "conversions": total_convs,
        "total_value": total_value,
        "conversion_rate": f"{(total_convs / total_clicks * 100):.2f}%" if total_clicks else "0.00%"
    }
