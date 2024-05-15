import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://urbaniza-api.onrender.com'
})