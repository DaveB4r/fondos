from fastapi import APIRouter
from config.db import conn
from schemas.transaction import transactionsEntity

transactions = APIRouter()

@transactions.get('/transactions/{id_client}', tags=["transacciones"])
def find_transactions(id_client: str):
  query = [
    {
      "$match": {
        "idCliente": id_client
      }
    },
    {
      "$addFields": {
        "idProductoObj": {"$toObjectId": "$idProducto"}
      }
    },
    {
      "$lookup": {
        "from": "productos",
        "localField": "idProductoObj",
        "foreignField": "_id",
        "as": "productDetails"
      }
    },
    {
      "$unwind": "$productDetails"
    },
    {
      "$project": {
        "idCliente": 1,
        "idProducto": 1,
        "tipo": 1,
        "monto": 1,
        "date": 1,
        "productDetails.nombre": 1
      }
    }
  ]
  return transactionsEntity(conn.fondos.transacciones.aggregate(query))