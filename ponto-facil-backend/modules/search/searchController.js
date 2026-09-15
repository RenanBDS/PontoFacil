// Importa './searchService' e guarda a referência na constante searchService.
const searchService = require('./searchService');
// Importa success do módulo '../../middlewares/apiResponse' para usar esses recursos neste arquivo.
const { success } = require('../../middlewares/apiResponse');

// GET /api/search?q=...
// Declara o controller de busca global presente no módulo legado de busca.
exports.search = (req, res) => {
    // Lê o parâmetro q da URL e usa texto vazio quando ele não foi informado.
    const query = req.query.q || '';
    // Cria a estrutura inicial vazia dos resultados de busca.
    let searchResults = { politicians: [], users: [] };

    // Só executa a busca quando existe um termo informado.
    if (query) {
        // Pede ao service os resultados correspondentes ao termo pesquisado.
        searchResults = searchService.globalSearch(query);
    // Fecha o bloco de código ou objeto atual.
    }
    
    // Envia uma resposta de sucesso usando o formato padronizado da API.
    return success(res, { query, ...searchResults });
// Fecha a estrutura iniciada nas linhas anteriores.
};
