from fastapi import APIRouter, Request
from tracker.logic import track_click_and_redirect

router = APIRouter()

@router.get("/{link_id}")
async def handle_click(link_id: str, request: Request):
    return await track_click_and_redirect(link_id, request)