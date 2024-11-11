from typing import Optional, Literal
from pydantic import BaseModel
from datetime import datetime

class Transaction(BaseModel):
  id: Optional[str] = None
  idCliente: str
  idProducto: str
  tipo: str = Literal["Suscribirse","Desuscribirse"]
  monto: int
  date: datetime