import { useEffect, useState } from "react"
import { CardProps } from "../../interfaces/cards";
import Card from "../../Components/Card";

const Subscripciones = () => {
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/subscribe/672fba602470e35bd7ee25b4')
    .then(response => response.json())
    .then(json => setData(json))
  },[data])

  return (
    <div className="w-[80%]">
      <h3 className="m-4 text-3xl text-gray-700 font-medium w-full text-center">Revisa tus subscripciones</h3>
      <div className='grid  sm:grid-cols-1 lg:grid-cols-3'>
        {data.map(obj => (
          <Card
            key={obj.id}
            id={obj?.id}
            idCliente={obj?.idCliente}
            idProducto={obj?.idProducto}
            nombre={obj?.productDetails?.nombre}
            tipo={obj?.tipo}
          />
        ))}
      </div>
    </div>
  )
}

export default Subscripciones