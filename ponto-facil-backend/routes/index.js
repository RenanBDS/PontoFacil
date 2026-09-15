// Importa o Express, usado para criar rotas e a aplicação HTTP.
const express = require('express')
// Cria um roteador do Express para agrupar as rotas deste módulo.
const router = express.Router()
// Importa success do módulo '../middlewares/apiResponse' para usar esses recursos neste arquivo.
const { success } = require('../middlewares/apiResponse')

// Inicia o registro de uma rota HTTP GET.
router.get('/', (req, res) => {
  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(
    // Passa o objeto de resposta HTTP para a função chamada.
    res,
    // Abre um bloco de código ou objeto.
    {
      // Informa o nome da API na resposta de status.
      name: 'Ponto Fácil API',
      // Informa a versão atual da API.
      version: '1.0.0',
      // Informa ao frontend que a API está online.
      status: 'online',
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    'Bem-vindo à API do Ponto Fácil.'
  // Fecha a lista de argumentos desta chamada.
  )
// Fecha a estrutura iniciada nas linhas anteriores.
})

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = router
