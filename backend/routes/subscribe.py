from fastapi import APIRouter
from config.db import conn
from schemas.subscribe import subscribesEntity
from models.subscribe import Subscribe
from models.transaction import Transaction
from bson import ObjectId
from datetime import datetime
from mail.sendEmail import sendEmail

subscriptions = APIRouter()

@subscriptions.get('/subscribe/{id_client}', tags=["subscripciones"])
def find_subscriptions(id_client: str):
  query = [
    {
      "$match":{
        "idCliente": id_client,
        "tipo": "Suscribirse"
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
        "productDetails.nombre": 1
      }
    }
  ]
  return subscribesEntity(conn.fondos.subscripciones.aggregate(query))

@subscriptions.post('/subscribe', tags=["subscripciones"])
def subscribe_client(subscribe: Subscribe):
  new_subscribe = dict(subscribe)
  del new_subscribe["id"]
  idProducto = new_subscribe["idProducto"]
  idCliente = new_subscribe["idCliente"]
  cliente = conn.fondos.clientes.find_one({"_id": ObjectId(idCliente)})
  saldoCliente = cliente["saldo"]
  producto = conn.fondos.productos.find_one({"_id": ObjectId(idProducto)})
  montoMinimo = producto["monto_minimo"]
  if saldoCliente < montoMinimo and new_subscribe["tipo"] == "Suscribirse":
    return {"nuevo_saldo": "Saldo insuficiente"}
  query = {
    "idCliente": idCliente,
    "idProducto": idProducto
  }
  subscription = subscribesEntity(conn.fondos.subscripciones.find(query))
  if len(subscription) > 0 and new_subscribe["tipo"] == "Suscribirse" and subscription[0]["tipo"] == "Suscribirse":
    return {"nuevo_saldo": "Ya existe una suscripcion para este cliente"}
  if len(subscription) > 0:
    conn.fondos.subscripciones.find_one_and_update({"_id": ObjectId(subscription[0]["id"])}, {"$set": new_subscribe})
  else:
    conn.fondos.subscripciones.insert_one(new_subscribe)
  total = saldoCliente - montoMinimo if new_subscribe["tipo"] == "Suscribirse" else saldoCliente + montoMinimo
  conn.fondos.clientes.find_one_and_update({"_id": ObjectId(idCliente)}, {"$set": dict({
    "saldo": total
  })})
  # transaccion
  new_transaction: Transaction = dict({
    "idCliente": idCliente,
    "idProducto": idProducto,
    "tipo": new_subscribe["tipo"],
    "monto": montoMinimo,
    "date": datetime.now()
  })
  conn.fondos.transacciones.insert_one(new_transaction)
  # enviar correo
  correoCliente = conn.fondos.clientes.find_one({'_id': ObjectId(idCliente)})
  sendEmail("Acabas de "+new_subscribe["tipo"]+" con fondos app", correoCliente["correo"])
  return {"nuevo_saldo": total}