import { NavLink } from 'react-router-dom'
const index = () => {


  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#dadada", padding: 8 }}>
      <h3 >
        Desafio FullStack
      </h3>

      <div style={{ height: "100%" }}>
        <ul style={{display: "flex", justifyContent: "center", alignItems: "center", listStyle: "none", height: "100%", marginTop: "10px", marginBottom: "10px"}} >
          <li>
            <NavLink
              to="/cadastrar"
              style={{ color: "#222", height: "100%", padding: 10, textDecoration: "none", fontWeight: "600" }}
            >
              Cadastrar Novo Cliente
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              style={{ color: "#222", height: "100%", padding: 10, textDecoration: "none", fontWeight: "600" }}
            >
              Lista de Clientes
            </NavLink>
          </li>
        </ul>

      </div>
    </div>
  )
}


export default index;