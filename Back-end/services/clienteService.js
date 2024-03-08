const connection = require("../configs/Db")
const Cliente = require('../models/modelCliente')
const { getAllClientes, updateClientes, insertClientes, deleteClientes } = require('../middlewares/midClientes')

const getService = async () => {

  try {
    const queryAll = 'SELECT * FROM clientes'
    let resService = await getAllClientes(queryAll)
    return resService
  } catch (error) {
    console.log(error)
    return { error: "Erro do servidor" }
  }
}

const getFilterService = async (nome) => {

  try {
    const queryAll = `SELECT * FROM clientes where nome like '%${nome}%'`
    let resService = await getAllClientes(queryAll)
    return resService
  } catch (error) {
    console.log(error)
    return { error: "Erro do servidor" }
  }
}

const postService = async (body) => {
  try {

    const cliente = Cliente;
    cliente.nome = body.nome
    cliente.telefone = body.telefone
    cliente.email = body.email
    cliente.y = body.y
    cliente.x = body.x
    if (!cliente.nome || !cliente.email || !cliente.telefone) {
      return { error: "Parâmetros incorretos ou sem parâmetros" }
    }
    const queryInsert = `INSERT INTO clientes (nome, email, telefone, x, y) VALUES ('${cliente.nome}', '${cliente.email}','${cliente.telefone}', ${cliente.x}, ${cliente.y} )`;
    const resultPost = await insertClientes(queryInsert);
    return resultPost;

  } catch (error) {
    console.log(error)
    return { error: "Erro do servidor" }
  }
}


const putService = async (body) => {
  try {
    if (!body.email || !body.telefone) {
      return { error: "Email ou telefone não informado" }
    }
    let queryUpdate;

    if (body.email && body.telefone && body.x && body.y) {
      queryUpdate = `UPDATE clientes
      SET email = '${body.email}', telefone = '${body.telefone}', x = ${body.x},
      y = ${body.y}
      WHERE id = ${body.id};`
    }
    else if (body.email && body.telefone && body.x) {
      queryUpdate = `UPDATE clientes
      SET email = '${body.email}', telefone = '${body.telefone}', x = ${body.x} 
      WHERE id = ${body.id};`
    }
    else if (body.email && body.telefone) {
      queryUpdate = `UPDATE clientes
      SET email = '${body.email}', telefone = '${body.telefone}'
      WHERE id = ${body.id};`
    } else if (body.email) {
      queryUpdate = `UPDATE clientes
      SET  email = '${body.email}'
      WHERE id = ${body.id};`
    } else {
      queryUpdate = `UPDATE clientes
      SET telefone = '${body.telefone}' WHERE id = ${body.id};`
    }
    console.log(queryUpdate)
    const resultPut = await updateClientes(queryUpdate)
    return resultPut
  } catch (error) {
    console.log(error)
    return { error: "Erro do servidor" }
  }

}


const deleteService = async (id) => {
  const queryDelete = `DELETE FROM clientes WHERE id = ${id};`
  let resultDelete;
  try {
    resultDelete = await deleteClientes(queryDelete)
  } catch (error) {
    console.log(error)
    resultDelete = { error: "Erro ao deletar Cliente" }
  }
  return resultDelete
}


const routeService = async () => {
  const queryAll = 'SELECT * FROM clientes'
  const clientes = await getAllClientes(queryAll);
  const clientesResponse = calcularRota(clientes);
  return clientesResponse;
}

function calcularDistanciaMatriz(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function calcularRota(clientes) {
  const dc = []

  clientes.map(e => {
    dc.push(
      {
        id: e.id,
        nome: e.nome,
        email: e.email,
        telefone: e.telefone,
        x: e.x,
        y: e.y,
        distancia: calcularDistanciaMatriz(0, 0, e.x, e.y)
      }
    )
  })


  let clientesResponse = [];
  let dcAux = dc.sort((a, b) => a.distancia - b.distancia);

  clientesResponse.push(
    {
      id: dcAux[0].id,
      nome: dcAux[0].nome,
      email: dcAux[0].email,
      telefone: dcAux[0].telefone,
      x: dcAux[0].x,
      y: dcAux[0].y
    }
  )

  dcAux.shift()
  dc.sort((a, b) => a.distancia - b.distancia).map((e, i) => {
    let clienteMenor;
    let indexMenor = 0;
    let distanciaMenor = null;

    dcAux.forEach((element, index) => {
      let calculoDist = calcularDistanciaMatriz(e.x, e.y, element.x, element.y);
      if (distanciaMenor == null || distanciaMenor > calculoDist) {
        indexMenor = index;
        distanciaMenor = calculoDist;
        clienteMenor = element;
      }

      if (index == dcAux.length - 1) {
        const indexAntigo = dc[i + 1]
        dc.splice(i + 1, 1);
        dc.splice(i + 1, 0, indexAntigo);
        clientesResponse.push(
          {
            id: e.id,
            nome: e.nome,
            email: e.email,
            telefone: e.telefone,
            x: e.x,
            y: e.y
          }
        )
      }
    });
  })
  return clientesResponse;
}

module.exports = { getService, postService, putService, deleteService, getFilterService, routeService }