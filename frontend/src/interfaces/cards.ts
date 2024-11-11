export interface CardProps {
  id?:string | undefined,
  idProducto?: string | undefined,
  idCliente?: string | undefined,
  tipo?: string | undefined, 
  nombre: string | any,
  monto_minimo?: number | undefined,
  categoria?: string | undefined,
  productDetails?: {
    nombre: string
  } | undefined
}