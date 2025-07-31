from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import links, clicks, stats, webhook

app = FastAPI()

# Substitua pela URL do seu frontend hospedado no Render
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://seu-site.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(links.router, prefix="/links")
app.include_router(clicks.router, prefix="/clicks")
app.include_router(stats.router, prefix="/stats")
app.include_router(webhook.router, prefix="/webhook")

@app.get("/")
def root():
    return {"status": "ad-tracking-pro online"}
