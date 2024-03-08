import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Accept': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Authorization', 
    'Content-Type': 'application/json'
  }
});

export default API;