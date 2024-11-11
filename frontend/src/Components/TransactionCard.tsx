import { FC } from "react"
import { Transaction } from "../interfaces/transaction"


const TransactionCard:FC<Transaction> = ({id, tipo, monto, date, nombre}) => {
  const fecha = new Date(date)
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="tex-sm/6 font-semibold text-gray-900">{nombre}</p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">Transaccion Id: {id}</p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">{tipo}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm/6 text-gray-900">{Number(monto).toLocaleString()}</p>
          <p className="text-sm/6 text-gray-900">{fecha.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}</p>
        </div>
    </li>
  )
}

export default TransactionCard