from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import clicks, conversions, links, stats

app = FastAPI(title="Ad Tracking Pro API")

# CORS (libera acesso para o frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(clicks.router, prefix="/clicks")
app.include_router(conversions.router, prefix="/conversions")
app.include_router(links.router, prefix="/links")
app.include_router(stats.router, prefix="/stats")

@app.get("/")
def root():
    return {"msg": "API do Ad Tracking Pro online"}

from routes.aggregate_api import router as aggregate_router
app.include_router(aggregate_router)

from routes.stats_api import router as stats_router
app.include_router(stats_router)


