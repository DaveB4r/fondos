from typing import Optional, Literal
from pydantic import BaseModel

class Subscribe(BaseModel):
  id: Optional[str] = None
  idCliente: str
  idProducto: str
  tipo: str = Literal["Suscribirse","Desuscribirse"]