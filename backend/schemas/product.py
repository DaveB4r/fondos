def productEntity(item) -> dict:
  return {
    "id": str(item["_id"]),
    "nombre": item["nombre"],
    "monto_minimo": item["monto_minimo"],
    "categoria": item["categoria"]
  }

def productsEntity(entity) -> list:
  return [productEntity(item) for item in entity]