from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Conversion
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/conversions")
def get_conversions(db: Session = Depends(get_db)):
    conversions = db.query(Conversion).order_by(Conversion.timestamp.desc()).all()

    result = []
    for conv in conversions:
        result.append({
            "id": conv.id,
            "link_id": conv.link_id,
            "timestamp": conv.timestamp.isoformat(),
            "email": conv.email,
            "phone": conv.phone,
            "produto": conv.produto,
            "utm_campaign": conv.utm_campaign,
            "utm_content": conv.utm_content
        })

    return JSONResponse(content={"data": result})
