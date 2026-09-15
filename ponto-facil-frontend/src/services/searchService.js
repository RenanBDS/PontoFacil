// Linha original 1: Importa recursos de ./api para serem usados neste arquivo.
import api from './api'

// Linha original 3: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function search(query) {
  // Linha original 4: Envia uma requisição HTTP GET para consultar dados na API.
  return api.get('/search', {
    // Linha original 5: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    params: { q: query },
  // Linha original 6: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  })
// Linha original 7: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
