// Linha original 1: Importa recursos de ./api para serem usados neste arquivo.
import api from './api'

// Linha original 3: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function getApiStatus() {
  // Linha original 4: Envia uma requisição HTTP GET para consultar dados na API.
  return api.get('/')
// Linha original 5: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
