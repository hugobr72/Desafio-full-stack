import { useState } from 'react'
import API from '../../../utils/API'
import Swal from 'sweetalert2'

const index = () => {

  const [nome, setNome] = useState<string>()
  const [telefone, setTelefone] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [x, setX] = useState<string>()
  const [y, setY] = useState<string>()

  const CadastrarCliente = async () => {
    if(nome === "" || telefone === "" || email === "" || x === "" || y === ""){
      Swal.fire({
        icon:  "error",
        text: "Você precisa informar todos os dados!"
      })
      return;
    }

    try {
      const res = await API.post("/cliente", {
        nome,
        telefone,
        email,
        x,
        y
      });
      const data = res.data as response;
      Swal.fire({
        icon: data.success == "true" ? "success" : "error",
        text: data.msg
      })
    } catch (error) {
      Swal.fire({
        icon:  "error",
        text: "Ocorreu um erro, tente novamente mais tarde!"
      })
    }
  } 

  return (
    <div className='row col-12 p-2' style={{marginTop: "25px"}}>

      <h1 className='col-12' style={{textAlign: "center"}}>Cadastro de cliente</h1>
      <div className='col-3'>
        <div className="input-group mb-3">
          <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="form-control" placeholder="Nome do Cliente" aria-label="nome" aria-describedby="basic-addon1" />
        </div>
      </div>

      <div className='col-3'>
        <div className="input-group mb-3">
          <input value={telefone} onChange={(e) => setTelefone(e.target.value)} type="text" className="form-control" placeholder="Telefone do Cliente" aria-label="telefone" aria-describedby="basic-addon1" />
        </div>
      </div>
      <div className='col-3'>
        <div className="input-group mb-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Email do Cliente" aria-label="email" aria-describedby="basic-addon1" />
        </div>
      </div>
      <div className='col-3'>
        <div className="input-group mb-3">
          <input value={x} onChange={(e) => setX(e.target.value)} type="text" className="form-control" placeholder="Coordenada X do Cliente" aria-label="x" aria-describedby="basic-addon1" />
        </div>
      </div>
      <div className='col-3'>
        <div className="input-group mb-3">
          <input value={y} onChange={(e) => setY(e.target.value)} type="text" className="form-control" placeholder="Coordenada Y do Cliente" aria-label="y" aria-describedby="basic-addon1" />
        </div>
      </div>

      <div className='col-3'>
        <button className='btn btn-primary' onClick={() => {CadastrarCliente()}}>
          Cadastrar cliente
        </button>
      </div>
    </div>
  )
}

export default index
