from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Click, Conversion
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/stats")
def global_stats(db: Session = Depends(get_db)):
    total_clicks = db.query(Click).count()
    total_conversions = db.query(Conversion).count()

    if total_clicks == 0:
        conversion_rate = 0.0
    else:
        conversion_rate = (total_conversions / total_clicks) * 100

    return JSONResponse(content={
        "total_clicks": total_clicks,
        "total_conversions": total_conversions,
        "conversion_rate": conversion_rate
    })
