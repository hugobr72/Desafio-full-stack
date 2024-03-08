import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListarClientes from './pages/Clientes/Lista'
import CadastrarClientes from './pages/Clientes/Cadastro'
import Navbar from './components/Navbar/index'
function App() {

  return (

    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<ListarClientes />} />
        <Route path='/cadastrar' element={<CadastrarClientes />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
