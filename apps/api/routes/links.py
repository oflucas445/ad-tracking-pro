from fastapi import APIRouter
from models import TrackingLink, SessionLocal
from uuid import uuid4

router = APIRouter()

@router.post("/")
def create_link(name: str, destination_url: str):
    db = SessionLocal()
    link = TrackingLink(id=str(uuid4()), name=name, destination_url=destination_url)
    db.add(link)
    db.commit()
    db.refresh(link)
    return link

@router.get("/")
def list_links():
    db = SessionLocal()
    return db.query(TrackingLink).all()