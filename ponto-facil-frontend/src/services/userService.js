// Linha original 1: Importa recursos de ./api para serem usados neste arquivo.
import api from './api'

// Linha original 3: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function getMyProfile() {
  // Linha original 4: Envia uma requisição HTTP GET para consultar dados na API.
  return api.get('/profile/me')
// Linha original 5: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 7: Declara e exporta uma função que poderá ser chamada por outros arquivos.
export function updateProfile(formData) {
  // Linha original 8: Envia uma requisição HTTP PUT para atualizar dados existentes na API.
  return api.put('/profile/me', formData, {
    // Linha original 9: Abre o bloco de código ou objeto relacionado à declaração desta linha.
    headers: {
      // Linha original 10: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      'Content-Type': undefined
    // Linha original 11: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    }
  // Linha original 12: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  })
// Linha original 13: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
