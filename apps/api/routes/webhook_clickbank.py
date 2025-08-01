from fastapi import APIRouter, Request, HTTPException
import os
import requests
from models import Conversion
from database import get_db
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import Depends
from schemas import ConversionCreate

router = APIRouter()

@router.post("/conversion-webhook/clickbank")
async def handle_clickbank_conversion(
    request: Request,
    db: Session = Depends(get_db)
):
    # Verifica token de segurança
    token = request.query_params.get("token")
    expected_token = os.getenv("WEBHOOK_TOKEN", "default_token")
    if token != expected_token:
        raise HTTPException(status_code=403, detail="Token inválido")

    data = await request.json()

    # Extrai dados do ClickBank
    email = data.get("email")
    phone = data.get("phone")
    produto = data.get("produto")
    utm_campaign = data.get("utm_campaign")
    utm_content = data.get("utm_content")
    fbclid = data.get("fbclid")
    link_id = data.get("link_id", 0)

    # Salva no banco
    new_conv = Conversion(
        link_id=link_id,
        email=email,
        phone=phone,
        produto=produto,
        utm_campaign=utm_campaign,
        utm_content=utm_content,
        timestamp=datetime.utcnow()
    )
    db.add(new_conv)
    db.commit()

    # Envia para Facebook CAPI
    pixel_id = os.getenv("FB_PIXEL_ID")
    access_token = os.getenv("FB_ACCESS_TOKEN")

    if pixel_id and access_token and fbclid:
        event_payload = {
            "data": [
                {
                    "event_name": "Purchase",
                    "event_time": int(datetime.utcnow().timestamp()),
                    "action_source": "website",
                    "event_source_url": "https://seusite.com/conversion-webhook/clickbank",
                    "user_data": {
                        "em": [email] if email else [],
                        "ph": [phone] if phone else [],
                        "client_user_agent": request.headers.get("user-agent", ""),
                        "fbclid": fbclid
                    },
                    "custom_data": {
                        "content_name": produto,
                        "utm_campaign": utm_campaign,
                        "utm_content": utm_content,
                        "value": 0,
                        "currency": "BRL"
                    }
                }
            ]
        }

        fb_url = f"https://graph.facebook.com/v18.0/{pixel_id}/events?access_token={access_token}"
        try:
            fb_res = requests.post(fb_url, json=event_payload)
            fb_res.raise_for_status()
        except Exception as e:
            print("Erro ao enviar para o Facebook:", str(e))

    return {"message": "Conversão ClickBank registrada com sucesso"}
