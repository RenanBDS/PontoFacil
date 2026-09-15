// Linha original 1: Importa recursos de ./api para serem usados neste arquivo.
import api from './api'

// Linha original 3: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function getEmployees() {
  // Linha original 4: Envia uma requisição HTTP GET para consultar dados na API.
  return api.get('/employees')
// Linha original 5: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 7: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function getEmployeeById(id) {
  // Linha original 8: Envia uma requisição HTTP GET para consultar dados na API.
  return api.get(`/employees/${id}`)
// Linha original 9: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 11: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function createEmployee(formData) {
  // Linha original 12: Envia uma requisição HTTP POST para criar ou enviar dados para a API.
  return api.post('/employees', formData, {
    // Linha original 13: Abre o bloco de código ou objeto relacionado à declaração desta linha.
    headers: {
      // Linha original 14: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      'Content-Type': undefined,
    // Linha original 15: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    },
  // Linha original 16: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  })
// Linha original 17: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 19: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function updateEmployee(id, formData) {
  // Linha original 20: Envia uma requisição HTTP PUT para atualizar dados existentes na API.
  return api.put(`/employees/${id}`, formData, {
    // Linha original 21: Abre o bloco de código ou objeto relacionado à declaração desta linha.
    headers: {
      // Linha original 22: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      'Content-Type': undefined,
    // Linha original 23: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    },
  // Linha original 24: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  })
// Linha original 25: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
