// Importa error do módulo './apiResponse' para usar esses recursos neste arquivo.
const { error } = require('./apiResponse');

// Exporta o middleware central de tratamento de erros do Express.
module.exports = (err, req, res, next) => {
    // Exibe o erro completo no terminal para facilitar o diagnóstico durante o desenvolvimento.
    console.error(err);

    // Usa o status definido no erro ou 500 quando nenhum status específico foi informado.
    const statusCode = err.status || 500;
    // Usa os detalhes de validação existentes no erro ou uma lista vazia.
    const errors = err.errors || [];
    
    // Envia o erro ao cliente usando o formato padronizado da API.
    return error(res, err.message || 'Ocorreu um erro inesperado.', statusCode, errors);
// Fecha a estrutura iniciada nas linhas anteriores.
};
