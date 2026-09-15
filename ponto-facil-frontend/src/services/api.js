// Linha original 1: Parte de um comentário de documentação já existente no projeto.
/*
 * Pelo que entendi, o interceptor deixa o tratamento das respostas e dos erros
 * centralizado neste arquivo.
 *
 * Quando a requisição funciona, ele retira a camada externa do Axios e entrega
 * diretamente o corpo da resposta da API.
 *
 * Quando a API responde com um status de erro, como 400, 404 ou 500, o Axios
 * encaminha o erro para error.response. Nesse caso, aproveitamos a mensagem,
 * os erros e o status enviados pela própria API.
 *
 * Quando a requisição é enviada, mas nenhuma resposta chega, o erro aparece em
 * error.request. Isso pode acontecer quando a API está desligada ou existe um
 * problema de conexão. Como não recebemos uma resposta HTTP, o status fica null.
 *
 * O último caso trata algum erro que aconteceu durante a preparação da
 * requisição, antes mesmo de ela ser enviada corretamente.
 *
 * Em todos os casos de erro, o interceptor devolve o mesmo padrão com message,
 * errors e status, facilitando o tratamento nas telas.
 */

// Linha original 23: Importa recursos de axios para serem usados neste arquivo.
import axios from 'axios'

// Linha original 25: Cria uma instância centralizada do Axios com as configurações padrão da API.
const api = axios.create({
  // Linha original 26: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  baseURL: import.meta.env.VITE_API_URL,
  // Linha original 27: Abre o bloco de código ou objeto relacionado à declaração desta linha.
  headers: {
    // Linha original 28: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    'Content-Type': 'application/json',
  // Linha original 29: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
// Linha original 30: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 32: Registra um interceptor executado antes de cada requisição para ajustar seus dados ou cabeçalhos.
api.interceptors.request.use((config) => {
  // Linha original 33: Lê do localStorage um dado persistido anteriormente no navegador.
  const token = localStorage.getItem('ponto_facil_token')

  // Linha original 35: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (token) {
    // Linha original 36: Adiciona o token JWT ao cabeçalho Authorization da requisição no formato Bearer.
    config.headers.Authorization = `Bearer ${token}`
  // Linha original 37: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 39: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
  return config
// Linha original 40: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 42: Registra um interceptor para padronizar respostas recebidas e tratamento de erros.
api.interceptors.response.use(
  // Linha original 43: Define uma função arrow usada como callback ou expressão de processamento.
  (response) => response.data,

  // Linha original 45: Define uma função arrow usada como callback ou expressão de processamento.
  (error) => {
    // Linha original 46: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
    if (error.response) {
      // Linha original 47: Comentário já existente que documenta a intenção do trecho de código.
      // A API respondeu, mas com um status de erro (4xx ou 5xx)
      // Linha original 48: Declara a constante apiError e atribui a ela o valor ou resultado desta expressão.
      const apiError = error.response.data

      // Linha original 50: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
      if (error.response.status === 401) {
        // Linha original 51: Remove do localStorage a informação indicada, limpando esse dado da sessão persistida.
        localStorage.removeItem('ponto_facil_token')
        // Linha original 52: Remove do localStorage a informação indicada, limpando esse dado da sessão persistida.
        localStorage.removeItem('ponto_facil_user')

        // Linha original 54: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
        if (window.location.pathname !== '/login') {
          // Linha original 55: Redireciona diretamente o navegador para o endereço indicado.
          window.location.href = '/login'
        // Linha original 56: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
        }
      // Linha original 57: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
      }
      
      // Linha original 59: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
      return Promise.reject({
        // Linha original 60: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        message: apiError.message || 'Ocorreu um erro na requisição.',
        // Linha original 61: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        errors: apiError.errors || [],
        // Linha original 62: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        status: error.response.status,
      // Linha original 63: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
      })
    // Linha original 64: Testa uma condição alternativa quando a condição anterior não foi atendida.
    } else if (error.request) {
      // Linha original 65: Comentário já existente que documenta a intenção do trecho de código.
      // A requisição foi enviada, mas nenhuma resposta chegou (API fora do ar, sem rede)
      // Linha original 66: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
      return Promise.reject({
        // Linha original 67: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        message: 'Não foi possível se conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.',
        // Linha original 68: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        errors: [],
        // Linha original 69: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        status: null,
      // Linha original 70: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
      })
    // Linha original 71: Inicia o caminho alternativo executado quando a condição anterior for falsa.
    } else {
      // Linha original 72: Comentário já existente que documenta a intenção do trecho de código.
      // Erro ao montar a própria requisição (configuração inválida, por exemplo)
      // Linha original 73: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
      return Promise.reject({
        // Linha original 74: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        message: 'Erro inesperado ao preparar a requisição.',
        // Linha original 75: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        errors: [],
        // Linha original 76: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        status: null,
      // Linha original 77: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
      })
    // Linha original 78: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    }
  // Linha original 79: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 80: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
)

// Linha original 82: Exporta este valor como padrão para que outro arquivo possa importá-lo.
export default api
