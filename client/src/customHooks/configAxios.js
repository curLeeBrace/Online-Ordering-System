import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL? `${process.env.REACT_APP_BACKEND_BASE_URL}/api` : 'http://localhost:3001/api';


export const api = axios.create({
      baseURL: BASE_URL,


})


  