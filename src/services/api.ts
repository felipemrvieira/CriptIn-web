import axios from 'axios';
import { parseCookies } from 'nookies';

const API_URL = 'https://salty-reaches-78005.herokuapp.com/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async config => {
  const {'cryptin-token': token} = parseCookies();

  if (token && config.headers) {
    config.headers.Authorization = `${token}`;
    // config.headers['access-token'] = `${token}`;
  }
  return config;
});

export default api;
