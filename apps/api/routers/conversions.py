from fastapi import APIRouter, Response
from models import SessionLocal, Conversion
import csv
import io

router = APIRouter()

@router.get("/by-link/{link_id}")
def get_conversions_by_link(link_id: str):
    db = SessionLocal()
    return db.query(Conversion).filter(Conversion.click_id == link_id).all()

@router.get("/export")
def export_conversions():
    db = SessionLocal()
    convs = db.query(Conversion).all()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "id", "click_id", "timestamp", "value", "email", "telefone",
        "produto", "utm_campaign", "utm_content", "meta"
    ])

    for c in convs:
        writer.writerow([
            c.id, c.click_id, c.timestamp, c.value, c.email, c.telefone,
            c.produto, c.utm_campaign, c.utm_content, c.meta
        ])

    response = Response(content=output.getvalue(), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=conversions.csv"
    return response
