from fastapi import APIRouter
from config.db import conn
from schemas.product import productsEntity

products = APIRouter()

@products.get('/products', tags=["productos"])
def find_products():
  return productsEntity(conn.fondos.productos.find())