// src/api/api.js
import axios from 'axios'

export const api = axios.create({
    //Se você rodar no celular (Expo Go), troque localhost pelo IP da sua máquina na rede local, por exemplo: baseURL: 'http://192.168.0.105:3000'
  baseURL: 'http://localhost:3000', // backend NestJS
  timeout: 5000,
})
