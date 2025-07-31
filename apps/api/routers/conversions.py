from fastapi import APIRouter, Request, Header
from models import SessionLocal, Conversion
import requests
import os

router = APIRouter()

@router.get("/by-link/{link_id}")
def get_conversions_by_link(link_id: str):
    db = SessionLocal()
    convs = db.query(Conversion).join("clicks").filter_by(link_id=link_id).all()
    return convs

@router.post("/send-facebook")
async def send_to_facebook(request: Request, x_token: str = Header(None)):
    if x_token != os.getenv("WEBHOOK_TOKEN"):
        return {"error": "unauthorized"}

    data = await request.json()
    # Enviar evento para Facebook CAPI
    response = requests.post(
        "https://graph.facebook.com/v18.0/YOUR_PIXEL_ID/events?access_token=YOUR_ACCESS_TOKEN",
        json={
            "data": [{
                "event_name": "Purchase",
                "event_time": data.get("timestamp"),
                "action_source": "website",
                "event_source_url": data.get("source_url"),
                "user_data": {
                    "client_ip_address": data.get("ip"),
                    "client_user_agent": data.get("user_agent"),
                    "fbp": data.get("fbp"),
                    "fbc": data.get("fbc")
                }
            }]
        }
    )
    return {"fb_status": response.status_code}
