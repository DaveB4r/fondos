import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout/index"
import Productos from "./Pages/Productos/index"
import Subscripciones from "./Pages/Subscripciones/index"
import Transacciones from "./Pages/Transacciones/index"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index path="/" element={<Productos />} />
        <Route path="/subscripciones" element={<Subscripciones />} />
        <Route path="/transacciones" element={<Transacciones />} />
      </Route>
    </Routes>
  )
}

export default App
