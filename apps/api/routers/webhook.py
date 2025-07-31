from fastapi import APIRouter, Request, Header, HTTPException
from models import SessionLocal, Conversion, Click
from datetime import datetime
import requests
import os

router = APIRouter()

@router.post("/convert")
async def register_conversion(request: Request, x_webhook_token: str = Header(None)):
    if x_webhook_token != os.getenv("WEBHOOK_TOKEN", "default_token"):
        raise HTTPException(status_code=401, detail="Webhook token inválido ou ausente")

    data = await request.json()
    click_id = data.get("click_id")
    value = data.get("value", 0)

    db = SessionLocal()
    click = db.query(Click).filter(Click.id == click_id).first()
    if not click:
        return {"error": "click not found"}

    conv = Conversion(
        click_id=click.id,
        value=value,
        timestamp=datetime.utcnow(),
        email=data.get("email"),
        telefone=data.get("telefone"),
        produto=data.get("produto"),
        utm_campaign=data.get("utm_campaign"),
        utm_content=data.get("utm_content"),
        meta=data.get("meta", "")
    )
    db.add(conv)
    db.commit()

    try:
        fb_payload = {
            "data": [{
                "event_name": "Purchase",
                "event_time": int(datetime.utcnow().timestamp()),
                "action_source": "website",
                "event_source_url": data.get("source_url", ""),
                "user_data": {
                    "client_ip_address": click.ip,
                    "client_user_agent": click.user_agent,
                    "fbp": click.fbp,
                    "fbc": click.fbc,
                    "em": data.get("email"),
                    "ph": data.get("telefone")
                },
                "custom_data": {
                    "currency": "BRL",
                    "value": value,
                    "content_name": data.get("produto")
                }
            }]
        }

        r = requests.post(
            f"https://graph.facebook.com/v18.0/{os.getenv('FB_PIXEL_ID')}/events?access_token={os.getenv('FB_ACCESS_TOKEN')}",
            json=fb_payload
        )
    except Exception as e:
        print("Erro ao enviar para Facebook:", e)

    return {"status": "conversion registered and sent to Facebook", "conversion_id": conv.id}
