// Linha original 1: Importa recursos de ./api para serem usados neste arquivo.
import api from './api'

// Linha original 3: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function register(payload) {
  // Linha original 4: Envia uma requisição HTTP POST para criar ou enviar dados para a API.
  return api.post('/register', payload)
// Linha original 5: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 7: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function login(payload) {
  // Linha original 8: Envia uma requisição HTTP POST para criar ou enviar dados para a API.
  return api.post('/login', payload)
// Linha original 9: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 11: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function logout() {
  // Linha original 12: Envia uma requisição HTTP POST para criar ou enviar dados para a API.
  return api.post('/logout')
// Linha original 13: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
