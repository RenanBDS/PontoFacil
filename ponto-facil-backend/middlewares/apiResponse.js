/**
 * Padrão único de resposta da API, usado em todos os controllers.
 *
 * Sucesso:
 *  { "success": true, "data": ..., "message": "..." }
 *
 * Erro:
 *  { "success": false, "message": "...", "errors": [...] }
 *
 * Uso nos controllers:
 *   const { success, error } = require('../../middlewares/apiResponse');
 *   return success(res, video, 'Vídeo enviado com sucesso!', 201);
 *   return error(res, 'Vídeo não encontrado.', 404);
 */


// Declara a função usada para padronizar respostas de sucesso da API.
function success(res, data = null, message = null, statusCode = 200) {
    // Define o status HTTP da resposta e envia o conteúdo em JSON.
    return res.status(statusCode).json({
        // Marca a resposta como uma operação bem-sucedida.
        success: true,
        // Inclui na resposta a mensagem recebida pela função.
        message,
        // Inclui na resposta os dados retornados pela operação.
        data
    // Fecha a estrutura iniciada nas linhas anteriores.
    });
// Fecha o bloco de código ou objeto atual.
}

// Declara a função usada para padronizar respostas de erro da API.
function error(res, message = 'Ocorreu um erro inesperado.', statusCode = 500, errors = []) {
    // Define o status HTTP da resposta e envia o conteúdo em JSON.
    return res.status(statusCode).json({
        // Marca a resposta como uma operação que falhou.
        success: false,
        // Inclui na resposta a mensagem recebida pela função.
        message,
        // Inclui na resposta a lista de detalhes de erros.
        errors
    // Fecha a estrutura iniciada nas linhas anteriores.
    });
// Fecha o bloco de código ou objeto atual.
}

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = { success, error };
