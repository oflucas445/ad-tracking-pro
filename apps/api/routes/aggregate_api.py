from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from apps.api.database import get_db
from apps.api.models import Click, Conversion
from collections import defaultdict
from datetime import datetime
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/aggregate")
def aggregate_data(db: Session = Depends(get_db)):
    click_rows = db.query(Click).all()
    conversion_rows = db.query(Conversion).all()

    # Organiza por data
    data = defaultdict(lambda: {"clicks": 0, "conversions": 0})

    for click in click_rows:
        date = click.timestamp.strftime("%d/%m")
        data[date]["clicks"] += 1

    for conv in conversion_rows:
        date = conv.timestamp.strftime("%d/%m")
        data[date]["conversions"] += 1

    # Converte para lista ordenada por data
    result = [{"date": d, "clicks": v["clicks"], "conversions": v["conversions"]}
              for d, v in sorted(data.items())]

    return JSONResponse(content={"data": result})
