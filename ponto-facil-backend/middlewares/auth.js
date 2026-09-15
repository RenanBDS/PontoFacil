// Importa verifyToken do módulo '../config/jwt' para usar esses recursos neste arquivo.
const { verifyToken } = require('../config/jwt');
// Importa error: errorResponse do módulo './apiResponse' para usar esses recursos neste arquivo.
const { error: errorResponse } = require('./apiResponse');

// Declara o middleware que protege rotas e permite acesso somente com JWT válido.
const isAuthenticated = (req, res, next) => {
    // Lê o cabeçalho Authorization enviado pelo frontend.
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho existe e se está no formato Bearer token.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Envia uma resposta de erro padronizada e encerra esta requisição.
        return errorResponse(
            // Passa o objeto de resposta HTTP para a função chamada.
            res,
            // Passa este texto como argumento para a função ou configuração atual.
            'Você precisa estar autenticado para acessar este recurso.',
            // Passa este valor numérico como argumento da operação atual.
            401
        // Fecha a estrutura iniciada nas linhas anteriores.
        );
    // Fecha o bloco de código ou objeto atual.
    }

    // Separa o texto 'Bearer' e guarda apenas o token JWT.
    const token = authHeader.split(' ')[1];

    // Inicia um bloco protegido para tratar possíveis erros da operação.
    try {
        // Valida o JWT e guarda os dados decodificados do token.
        const decoded = verifyToken(token);

        // Disponibiliza o payload do token em req.user para as próximas etapas da requisição.
        req.user = decoded; // payload do token: { id, username, isAdmin }

        // Libera a requisição para continuar para o próximo middleware ou controller.
        return next();
    // Captura o erro caso a validação do token falhe.
    } catch (err) {
        // Envia uma resposta de erro padronizada e encerra esta requisição.
        return errorResponse(
            // Passa o objeto de resposta HTTP para a função chamada.
            res,
            // Passa este texto como argumento para a função ou configuração atual.
            'Token inválido ou expirado. Faça login novamente.',
            // Passa este valor numérico como argumento da operação atual.
            401
        // Fecha a estrutura iniciada nas linhas anteriores.
        );
    // Fecha o bloco de código ou objeto atual.
    }
// Fecha a estrutura iniciada nas linhas anteriores.
};

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = { isAuthenticated };
