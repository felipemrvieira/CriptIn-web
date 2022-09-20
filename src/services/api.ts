import axios from 'axios';
import { parseCookies } from 'nookies';

const API_URL = 'https://zservices-backend.herokuapp.com/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async config => {
  const {'z-services-token': token} = parseCookies();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    // config.headers['access-token'] = `${token}`;
  }
  return config;
});

export default api;
