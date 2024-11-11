from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.subscribe import subscriptions
from routes.transaction import transactions
from routes.product import products
from routes.client import balance
from docs import tags_metadata

app = FastAPI(
  title="Fondos API",
  description="API PARA PRUEBA TÉCNICA PARA INGENIERO DE DESARROLLO",
  version="0.0.1",
  openapi_tags=tags_metadata
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

app.include_router(subscriptions)
app.include_router(transactions)
app.include_router(products)
app.include_router(balance)