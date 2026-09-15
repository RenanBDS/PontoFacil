// Importa o Express, usado para criar rotas e a aplicação HTTP.
const express = require('express');
// Cria um roteador do Express para agrupar as rotas deste módulo.
const router = express.Router();
// Importa './searchController' e guarda a referência na constante searchController.
const searchController = require('./searchController');

// Busca global. Rota pública.
// Inicia o registro de uma rota HTTP GET.
router.get('/search', searchController.search);

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = router;
