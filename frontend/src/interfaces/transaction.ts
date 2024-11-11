export interface Transaction {
  id?: string | undefined;
  tipo: string;
  monto: Number;
  date: string;
  productDetails?: {
    nombre?: string
  };
  nombre ?: string | undefined
}