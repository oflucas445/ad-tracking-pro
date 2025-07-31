from fastapi import APIRouter, Request, Response
from tracker.logic import track_click_and_redirect
from models import SessionLocal, Click
import csv
import io

router = APIRouter()

@router.get("/{link_id}")
async def handle_click(link_id: str, request: Request):
    return await track_click_and_redirect(link_id, request)

@router.get("/export")
def export_clicks():
    db = SessionLocal()
    clicks = db.query(Click).all()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "id", "link_id", "timestamp", "ip", "user_agent", "fbp", "fbc",
        "referer", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"
    ])

    for c in clicks:
        writer.writerow([
            c.id, c.link_id, c.timestamp, c.ip, c.user_agent, c.fbp, c.fbc,
            c.referer, c.utm_source, c.utm_medium, c.utm_campaign, c.utm_content, c.utm_term
        ])

    response = Response(content=output.getvalue(), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=clicks.csv"
    return response
