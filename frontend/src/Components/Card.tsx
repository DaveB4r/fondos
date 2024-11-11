import { FC } from "react"
import { CardProps } from "../interfaces/cards"
import { Subscribe } from "../interfaces/subscribe"
import { useAppContext } from "../../AppProvider"
import toast, { Toaster } from "react-hot-toast"

const Card: FC<CardProps> = ({ id,idProducto, idCliente, tipo, nombre, monto_minimo, categoria }) => {
  const { updateBalance } = useAppContext();

  const suscribirse = async () => {
    const tipoSubscripcion = tipo === 'Suscribirse' ? 'Desuscribirse' : 'Suscribirse';
    const idSent = tipo === 'Suscribirse' ? idProducto : id;
    const sendObj: Subscribe = {
      idCliente: idCliente,
      idProducto: idSent,
      tipo: tipoSubscripcion
    }
    console.log(sendObj)
    const response = await fetch('http://127.0.0.1:8000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendObj)
    });
    const data = await response.json()
    if (data.nuevo_saldo) {
      let mensaje = "";
      if (!isNaN(data.nuevo_saldo)) {
        updateBalance(data.nuevo_saldo);
        mensaje =`Acaba de ${tipoSubscripcion} a ${String(nombre).replace(/_/g, ' ')} satisfactoriamente.`
      }
      else {
        mensaje = data.nuevo_saldo
      }
      toast(mensaje, {
        duration: 4000,
        position: 'bottom-center',
        icon: '⚠'
      })
    }
  }

  return (
    <div className="shadow p-5 rounded-lg border-t-4 border-red-400 bg-white m-5">
      <p className="mt-4 text-2xl text-gray-700 font-medium">{String(nombre).replace(/_/g, ' ')}</p>
      {!isNaN(monto_minimo as number) &&
        <p className="mt-4 font-medium text-gray-700">Monto Minimo: ${Number(monto_minimo).toLocaleString()}</p>
      }
      <div className="mt-8">
        {categoria &&
          <ul className="grid grid-cols-1 gap-4">
            <li className="inline-flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
              </svg>
              {categoria}
            </li>
          </ul>
        }
      </div>
      <div className="mt-3">
        <button
          className={`bg-${tipo === 'Suscribirse' ? 'red' : 'green'}-600 hover:bg-gray-500 px-3 py-2 rounded-lg w-full text-white`}
          onClick={() => suscribirse()}
        >
          {tipo === 'Suscribirse' ? 'Cancelar subscripcion' : 'Suscribirse'}
        </button>
      </div>
      <Toaster />
    </div>
  )
}

export default Card