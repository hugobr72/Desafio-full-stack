const connectionString = require("../configs/Db")
const { Client } = require('pg');

const getAllClientes = async (query) => {
  try {
    const connection = new Client(connectionString)
    await connection.connect();
    const response = await connection.query(query);
    await connection.end();
    return response.rows
  } catch (error) {
    await connection.end();
    return error.message
  }
}

const insertClientes = async (query) => {
  try {
    const connection = new Client(connectionString)
    await connection.connect();

    const response = await connection.query(query);
    await connection.end();
    return { msg: "Cliente cadastrado com sucesso", success: "true" }
  } catch (error) {
    await connection.end();
    console.log(error)
    return { msg: "Ocorreu um erro, cliente não foi cadastrado!", success: "false", error: error.message }
  }

}
const updateClientes = async (query) => {
  const connection = new Client(connectionString)
  try {
    await connection.connect();
    const response = await connection.query(query);
    await connection.end();
    return { msg: "Cliente atualizado com sucesso", success: "true" }
  } catch (error) {
    await connection.end();
    return { msg: "Ocorreu um erro, cliente não foi atualizado!", success: "false", error: error.message }
  }

}
const deleteClientes = async (query) => {
  try {
    const connection = new Client(connectionString)
    await connection.connect();

    const response = await connection.query(query);
    await connection.end();
    return { msg: "Cliente deletado com sucesso", success: "true" }
  } catch (error) {
    await connection.end();
    return { msg: "Ocorreu um erro, cliente não foi deletado!", success: "false", error: error.message }
  }

}

module.exports = {
  getAllClientes,
  insertClientes,
  updateClientes,
  deleteClientes
}