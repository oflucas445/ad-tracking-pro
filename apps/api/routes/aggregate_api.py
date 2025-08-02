from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Click, Conversion
from collections import defaultdict
from datetime import datetime
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/api/stats")
def get_aggregated_stats(db: Session = Depends(get_db)):
    clicks = db.query(Click).all()
    conversions = db.query(Conversion).all()

    stats_dict = defaultdict(lambda: {"clicks": 0, "conversions": 0})

    for click in clicks:
        date = click.timestamp.date().isoformat()
        stats_dict[date]["clicks"] += 1

    for conv in conversions:
        date = conv.timestamp.date().isoformat()
        stats_dict[date]["conversions"] += 1

    # Organizar por data crescente
    stats = [{"date": date, **data} for date, data in sorted(stats_dict.items())]
    return JSONResponse(content={"stats": stats})
