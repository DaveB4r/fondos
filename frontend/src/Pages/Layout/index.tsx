import { Outlet } from "react-router-dom"
import Navbar from "../../Components/Navbar"
import { Option } from "../../interfaces/options"


const Layout = () => {

  const options: Option[] = [
    {
      to: '/',
      name: 'Productos'
    },
    {
      to: '/subscripciones',
      name: 'Subscripciones'
    },
    {
      to: '/transacciones',
      name: 'Transacciones'
    },
  ]

  return (
    <div>
      <Navbar options={options} />
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout