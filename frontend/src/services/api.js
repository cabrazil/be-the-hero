import axios from 'axios';

const api = axios.create({
  baseURL: 'http://93.188.162.158:3333', 
})

export default api;