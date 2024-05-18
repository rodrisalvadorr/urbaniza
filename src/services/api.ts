import axios from 'axios';
import { AppError } from '../utils/AppError';

const api = axios.create({
  baseURL: 'https://urbaniza-api.onrender.com'
})

api.interceptors.request.use((request) => {
  return request;
}, (error) => {
  return Promise.reject(error);
})

api.interceptors.response.use(response => response, error => {
  if (error.response.data.issues?.email) {
    return Promise.reject(new AppError(error.response.data.issues.email._errors[0]))
  }
  if (error.response.data.issues?.password) {
    return Promise.reject(new AppError(error.response.data.issues.password._errors[0]))
  } else {
    return Promise.reject(new AppError(error.response.data.message))
  }
  
})

export { api }