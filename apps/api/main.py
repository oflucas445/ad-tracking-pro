from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import clicks, conversions, links, stats
from .routes.aggregate_api import router as aggregate_router
from .routes.stats_api import router as stats_router
from .routes.conversions_api import router as conversions_router
from .routes.webhook_clickbank import router as clickbank_router

app = FastAPI(title="Ad Tracking Pro API")

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas principais
app.include_router(clicks.router, prefix="/clicks")
app.include_router(conversions.router, prefix="/conversions")
app.include_router(links.router, prefix="/links")
app.include_router(stats.router, prefix="/stats")

# Rotas adicionais
app.include_router(aggregate_router)
app.include_router(stats_router)
app.include_router(conversions_router)
app.include_router(clickbank_router)

@app.get("/")
def root():
    return {"msg": "API do Ad Tracking Pro online"}
