def subscribeEntity(item) -> dict:
  return {
    "id": str(item["_id"]),
    "idCliente": item["idCliente"],
    "idProducto": item["idProducto"],
    "tipo": item["tipo"],
    "productDetails": item.get("productDetails", None)
  }

def subscribesEntity(entity) -> list:
  return [subscribeEntity(item) for item in entity]