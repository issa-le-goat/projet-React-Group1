import axios from 'axios'

// Instance Axios unique : centralise l'URL de base de l'API dummyjson.
// Permet d'ajouter facilement des intercepteurs (ex: token) si besoin plus tard.
const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

export default api
