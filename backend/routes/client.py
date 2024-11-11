from fastapi import APIRouter
from config.db import conn
from bson import ObjectId

balance = APIRouter()

@balance.get('/balance/{id_client}')
def find_balance(id_client):
  cliente = conn.fondos.clientes.find_one({'_id': ObjectId(id_client)})
  return {'saldo': cliente['saldo']}