def transactionEntity(item) -> dict:
  return {
    "id": str(item["_id"]),
    "idCliente": item["idCliente"],
    "idProducto": item["idProducto"],
    "tipo": item["tipo"],
    "monto": item["monto"],
    "date": item["date"],
    "productDetails": item.get("productDetails", None)
  }

def transactionsEntity(entity) -> list:
  return [transactionEntity(item) for item in entity]