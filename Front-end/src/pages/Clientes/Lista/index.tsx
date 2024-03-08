import { useEffect, useState } from 'react'
import API from '../../../utils/API'
import Swal from 'sweetalert2'
import { Box, Modal, Typography } from '@mui/material';

const index = () => {
  const [clients, setClientes] = useState<Array<Cliente>>();
  const [clienteRotas, setClientesRotas] = useState<Array<Cliente>>();
  const [nome, setNome] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [clientEdit, setClientEdit] = useState<Cliente>({
    nome: "",
    email: "",
    id: 0,
    telefone: "",
    x: 0,
    y: 0
  });

  const getClientes = async () => {
    try {
      const res = await API.get("/cliente");
      setClientes(res.data as Array<Cliente>);
    } catch (error) {
      console.log(error);
    }
  }

  const getClientesRotas = async () => {
    try {
      const res = await API.get("/cliente/rota");
      setClientesRotas(res.data as Array<Cliente>);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteClient = async (id: number) => {
    try {
      const res = await API.delete("/cliente/" + id);
      const resData = res.data as response;
      Swal.fire({
        icon: resData.success == "true" ? "success" : "error",
        text: resData.msg
      })
      getClientes()
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Ocorreu um erro, tente novamente mais tarde!"
      })

      console.log(error);
    }
  }
  useEffect(() => {
    getClientes();
  }, [])

  const filterClientes = async () => {
    try {
      const res = await API.get("/cliente/" + nome);
      setClientes(res.data as Array<Cliente>);
    } catch (error) {
      console.log(error);
    }
  }


  const handleOpen = () => {
    setOpen(!open)
  }


  const editClient = async () => {

    try {
      console.log(clientEdit)
      const res = await API.put("/cliente", {
        nome: clientEdit.nome,
        telefone: clientEdit.telefone,
        email: clientEdit.email,
        x: clientEdit.x,
        y: clientEdit.y,
        id: clientEdit.id
      });
      const resData = res.data as response;
      Swal.fire({
        icon: resData.success == "true" ? "success" : "error",
        text: resData.msg
      })
      getClientes()
      setOpenEdit(false)
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Ocorreu um erro, tente novamente mais tarde!"
      })
      console.log(error);
    }
  };

  return (
    <div className='container' style={{ marginTop: "25px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}> Lista de Clientes </h1>
      <div className='row col-12'>
        <div className='col-4' style={{ minWidth: "200px" }}>
          <div className="input-group mb-3">
            <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="form-control" placeholder="Nome do Cliente" aria-label="nome" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className='col-1' style={{ cursor: "pointer" }} onClick={() => filterClientes()}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "25px" }} viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>

        <div className='col-3'>
          <button
            className='btn btn-dark'
            onClick={() => { getClientesRotas() }}
          >
            Melhor Rota
          </button>
        </div>
      </div>
      <table className='table' style={{ marginTop: "25px" }}>
        <thead className='thead-dark'>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Email</th>
            <th scope="col">(x,y)</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            clients ? (
              clients.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.nome}</td>
                    <td>{e.telefone}</td>
                    <td>{e.email}</td>
                    <td>({e.x},{e.y})</td>
                    <td style={{ cursor: "pointer" }} >
                      <span onClick={() => {
                        setClientEdit(e)
                        setOpenEdit(true)
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </span>

                      <span onClick={() => deleteClient(e.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path fill="#b30000" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </span>

                    </td>
                  </tr>
                )
              })
            ) : (<tr></tr>)
          }
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Modal
          open={open}
          onClose={() => handleOpen()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Box sx={{ backgroundColor: "#cacaca", maxWidth: "90%", borderRadius: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center", paddingBottom: 5, paddingTop: 5 }}>
              Lista de Clientes Mais Performática
            </Typography>
            <Box>
              <table className='table'>
                <thead className='thead-light'>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Email</th>
                    <th scope="col">(x,y)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    clienteRotas ? (
                      clienteRotas.map((e, i) => (
                        <tr key={i}>
                          <td>{e.nome}</td>
                          <td>{e.telefone}</td>
                          <td>{e.email}</td>
                          <td>({e.x},{e.y})</td>
                        </tr>
                      ))
                    ) : (<tr></tr>)
                  }
                </tbody>
              </table>
            </Box>
          </Box>
        </Modal>
      </div>


      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Modal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Box sx={{ backgroundColor: "#cacaca", borderRadius: 2, minWidth: "80%", padding: "10px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center", paddingBottom: 5, paddingTop: 5 }}>
              Editar cliente
            </Typography>
            <Box>
              <div className=''>
                <label>Nome:</label>
                <div className="input-group mb-3">
                  <input value={clientEdit.nome} disabled onChange={(e) => setClientEdit({ ...clientEdit, nome: e.target.value })} type="text" className="form-control" placeholder="Nome do Cliente" aria-label="nome" aria-describedby="basic-addon1" />
                </div>
              </div>

              <div className=''>
                <label>Telefone:</label>
                <div className="input-group mb-3">
                  <input value={clientEdit.telefone} onChange={(e) => setClientEdit({ ...clientEdit, telefone: e.target.value })} type="text" className="form-control" placeholder="Telefone do Cliente" aria-label="telefone" aria-describedby="basic-addon1" />
                </div>
              </div>
              <div className=''>
                <label>Email:</label>
                <div className="input-group mb-3">
                  <input value={clientEdit.email} onChange={(e) => setClientEdit({ ...clientEdit, email: e.target.value })} type="text" className="form-control" placeholder="Email do Cliente" aria-label="email" aria-describedby="basic-addon1" />
                </div>
              </div>
              <div className=''>
                <label>X:</label>
                <div className="input-group mb-3">
                  <input value={clientEdit.x} onChange={(e) => setClientEdit({ ...clientEdit, x: parseInt(e.target.value) })} type="number" className="form-control" placeholder="Coordenada X do Cliente" aria-label="x" aria-describedby="basic-addon1" />
                </div>
              </div>
              <div className=''>
                <label>Y:</label>
                <div className="input-group mb-3">
                  <input value={clientEdit.y} onChange={(e) => setClientEdit({ ...clientEdit, y: parseInt(e.target.value) })} type="number" className="form-control" placeholder="Coordenada Y do Cliente" aria-label="y" aria-describedby="basic-addon1" />
                </div>
              </div>
              <div style={
                {
                  textAlign: "center"
                }
              }>
                <button className='btn btn-primary' style={{ marginRight: "5px" }} onClick={() => editClient()}>
                  Editar cliente
                </button>
                <button className='btn btn-danger' onClick={() => setOpenEdit(false)} style={{ marginLeft: "5px" }}>
                  Cancelar
                </button>
              </div>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default index
