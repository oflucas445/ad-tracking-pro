from fastapi import APIRouter
from models import SessionLocal, Click

router = APIRouter()

@router.get("/overview")
def get_kpis():
    db = SessionLocal()
    clicks = db.query(Click).count()
    return {"clicks": clicks, "conversions": 0, "leads": 0, "roi": 0}