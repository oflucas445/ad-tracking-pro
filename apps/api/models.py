from sqlalchemy import Column, String, Integer, DateTime, create_engine, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class TrackingLink(Base):
    __tablename__ = "tracking_links"
    id = Column(String, primary_key=True)
    name = Column(String)
    destination_url = Column(String)

class Click(Base):
    __tablename__ = "clicks"
    id = Column(Integer, primary_key=True)
    link_id = Column(String, ForeignKey("tracking_links.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    ip = Column(String)
    user_agent = Column(String)
    fbp = Column(String)
    fbc = Column(String)
    referer = Column(String)
    utm_source = Column(String)
    utm_medium = Column(String)
    utm_campaign = Column(String)
    utm_content = Column(String)
    utm_term = Column(String)

class Conversion(Base):
    __tablename__ = "conversions"
    id = Column(Integer, primary_key=True)
    click_id = Column(Integer, ForeignKey("clicks.id"))
    value = Column(Integer, default=0)
    timestamp = Column(DateTime, default=datetime.utcnow)
    email = Column(String)
    telefone = Column(String)
    produto = Column(String)
    utm_campaign = Column(String)
    utm_content = Column(String)
    meta = Column(String)

Base.metadata.create_all(bind=engine)
