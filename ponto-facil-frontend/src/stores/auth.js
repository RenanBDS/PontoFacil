// Linha original 1: Importa recursos de pinia para serem usados neste arquivo.
import { defineStore } from 'pinia'
// Linha original 2: Importa recursos de vue para serem usados neste arquivo.
import { ref, computed } from 'vue'
// Linha original 3: Importa recursos de ../services/authService para serem usados neste arquivo.
import { login as loginRequest, logout as logoutRequest } from '../services/authService'

// Linha original 5: Declara a constante TOKEN_KEY e atribui a ela o valor ou resultado desta expressão.
const TOKEN_KEY = 'ponto_facil_token'
// Linha original 6: Declara a constante USER_KEY e atribui a ela o valor ou resultado desta expressão.
const USER_KEY = 'ponto_facil_user'

// Linha original 8: Declara e exporta uma constante que poderá ser reutilizada em outros módulos.
export const useAuthStore = defineStore('auth', () => {
  // Linha original 9: Cria a referência reativa token; quando seu valor muda, o Vue pode atualizar a interface.
  const token = ref(localStorage.getItem(TOKEN_KEY) || null)
  // Linha original 10: Cria a referência reativa user; quando seu valor muda, o Vue pode atualizar a interface.
  const user = ref(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))

  // Linha original 12: Cria a propriedade calculada isAuthenticated, recalculada quando os dados usados por ela mudam.
  const isAuthenticated = computed(() => !!token.value)

  // Linha original 14: Declara a função assíncrona login, agrupando a lógica executada quando ela for chamada.
  async function login(credentials) {
    // Linha original 15: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
    const response = await loginRequest(credentials)

    // Linha original 17: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    token.value = response.data.token
    // Linha original 18: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    user.value = response.data.user

    // Linha original 20: Salva o dado indicado no localStorage para manter a informação entre recarregamentos.
    localStorage.setItem(TOKEN_KEY, token.value)
    // Linha original 21: Salva o dado indicado no localStorage para manter a informação entre recarregamentos.
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))

    // Linha original 23: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
    return response
  // Linha original 24: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 26: Declara a função assíncrona logout, agrupando a lógica executada quando ela for chamada.
  async function logout() {
    // Linha original 27: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    token.value = null
    // Linha original 28: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    user.value = null
    // Linha original 29: Remove do localStorage a informação indicada, limpando esse dado da sessão persistida.
    localStorage.removeItem(TOKEN_KEY)
    // Linha original 30: Remove do localStorage a informação indicada, limpando esse dado da sessão persistida.
    localStorage.removeItem(USER_KEY)

    // Linha original 32: Inicia um bloco protegido para executar uma operação que pode gerar erro.
    try {
      // Linha original 33: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
      await logoutRequest()
    // Linha original 34: Captura o erro ocorrido no bloco try para tratá-lo sem interromper a aplicação.
    } catch (error) {
      // Linha original 35: Escreve uma informação no Console do navegador para ajudar em diagnóstico ou acompanhamento.
      console.error('Erro ao notificar logout à API:', error.message)
    // Linha original 36: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    }
  // Linha original 37: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 39: Declara a função assíncrona updateUser, agrupando a lógica executada quando ela for chamada.
  async function updateUser(updatedUser) {
    // Linha original 40: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    user.value = updatedUser

    // Linha original 42: Salva o dado indicado no localStorage para manter a informação entre recarregamentos.
    localStorage.setItem(
      // Linha original 43: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      'ponto_facil_user',
      // Linha original 44: Converte um objeto JavaScript para texto JSON antes de armazená-lo.
      JSON.stringify(updatedUser)
    // Linha original 45: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    )
  // Linha original 46: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 48: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
  return {
    // Linha original 49: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    token,
    // Linha original 50: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    user,
    // Linha original 51: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    isAuthenticated,
    // Linha original 52: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    login,
    // Linha original 53: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    logout,
    // Linha original 54: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    updateUser,
  // Linha original 55: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 56: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})
