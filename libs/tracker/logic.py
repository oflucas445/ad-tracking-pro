from fastapi.responses import RedirectResponse
from models import SessionLocal, Click, TrackingLink
from datetime import datetime

async def track_click_and_redirect(link_id, request):
    db = SessionLocal()
    link = db.query(TrackingLink).filter(TrackingLink.id == link_id).first()
    if not link:
        return {"error": "Link not found"}

    click = Click(
        link_id=link_id,
        ip=request.client.host,
        user_agent=request.headers.get("user-agent"),
        timestamp=datetime.utcnow()
    )
    db.add(click)
    db.commit()

    return RedirectResponse(url=link.destination_url)