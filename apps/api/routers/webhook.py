from fastapi import APIRouter, Request
from models import SessionLocal, Conversion, Click
from datetime import datetime

router = APIRouter()

@router.post("/convert")
async def register_conversion(request: Request):
    data = await request.json()
    click_id = data.get("click_id")
    value = data.get("value", 0)
    meta = data.get("meta", "")

    db = SessionLocal()

    click = db.query(Click).filter(Click.id == click_id).first()
    if not click:
        return {"error": "click not found"}

    conversion = Conversion(
        click_id=click.id,
        value=value,
        timestamp=datetime.utcnow(),
        meta=meta
    )
    db.add(conversion)
    db.commit()

    return {"status": "conversion registered", "conversion_id": conversion.id}