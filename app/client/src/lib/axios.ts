import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8070/api/',
});

export { instance as axios };
