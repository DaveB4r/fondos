import { useEffect, useState } from "react"
import { Transaction } from "../../interfaces/transaction"
import TransactionCard from "../../Components/TransactionCard";

const Transacciones = () => {
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/transactions/672fba602470e35bd7ee25b4')
      .then(response => response.json())
      .then(json => setData(json))
  }, [data])

  return (
    <div className="w-[80%]">
      <h3 className="m-4 text-3xl text-gray-700 font-medium w-full text-center">Revisa tus transacciones</h3>
      <ul className='divide-y divide-gray-100'>
        {data.map(obj => (
          <TransactionCard
            id={obj?.id}
            tipo={obj?.tipo}
            monto={obj?.monto}
            date={obj?.date}
            nombre={obj?.productDetails?.nombre}
          />
        ))}
      </ul>
    </div>
  )
}

export default Transacciones
