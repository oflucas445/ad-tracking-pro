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

Base.metadata.create_all(bind=engine)