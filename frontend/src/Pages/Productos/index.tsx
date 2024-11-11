import { useEffect, useState } from 'react'
import Card from '../../Components/Card'
import { CardProps } from '../../interfaces/cards';

const Productos = () => {
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/products')
      .then(response => response.json())
      .then(json => setData(json))
  }, [data])

  return (
    <div className='w-[80%]'>
      <h3 className="m-4 text-3xl text-gray-700 font-medium w-full text-center">Subscribete a uno de nuestros Fondos</h3>
      <div className='grid  sm:grid-cols-1 lg:grid-cols-3'>
        {data.map(obj => (
          <Card
            key={obj.id}
            id={obj?.id}
            idCliente="672fba602470e35bd7ee25b4"
            nombre={obj?.nombre}
            monto_minimo={obj?.monto_minimo}
            categoria={obj?.categoria}
          />
        ))}
      </div>
    </div>
  )
}

export default Productos