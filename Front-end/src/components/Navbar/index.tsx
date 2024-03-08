import { NavLink } from 'react-router-dom'

const index = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#dadada", padding: 8 }}>
      <h3>
        Desafio Full Stack
      </h3>

      <div style={{ height: "100%" }}>
        <NavLink
          to="/cadastrar"
          style={{  color: "#222", height: "100%", padding: 10, textDecoration: "none", fontWeight: "600" }}
        >
          Cadastrar Novo Cliente
        </NavLink>
      </div>
    </div>
  )
}


export default index;