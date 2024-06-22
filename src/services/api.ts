import axios, { AxiosInstance, AxiosError } from 'axios';
import { AppError } from '../utils/AppError';
import { storageAuthTokenSave } from '../storage/storageAuthToken'

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: 'https://urbaniza-api.onrender.com'
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, requestError => {
    if (requestError?.response?.status === 401) {
      const originalRequestConfig = requestError.config;

      if(isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            onSuccess: (token: string) => {
              originalRequestConfig.headers = { 'Authorization': `Bearer ${token}`};
              resolve(api(originalRequestConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            }
          })
        })
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await api.patch('/token/refresh')
          await storageAuthTokenSave(data.token)

          if(originalRequestConfig.data) {
            originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
          }

          originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}`};
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

          failedQueue.forEach(request => {
            request.onSuccess(data.token);
          })

          resolve(api(originalRequestConfig));
        } catch (error: any) {
          failedQueue.forEach(request => {
            request.onFailure(error)
          })

          signOut();
          reject(error);
        } finally {
          isRefreshing = false;
          failedQueue = [];
        }
      })
    }
  
    if (requestError.response.data.issues?.email) {
      return Promise.reject(new AppError(requestError.response.data.issues.email._errors[0]))
    }
    
    if (requestError.response.data.issues?.password) {
      return Promise.reject(new AppError(requestError.response.data.issues.password._errors[0]))
    }

    return Promise.reject(new AppError(requestError.response.data.message))
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

api.interceptors.request.use((request) => {
  return request;
}, (error) => {
  return Promise.reject(error);
})



export { api }