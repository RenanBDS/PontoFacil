// Importa a biblioteca jsonwebtoken, usada para criar e validar tokens JWT.
const jwt = require('jsonwebtoken');
// Carrega as variáveis do arquivo .env para process.env.
require('dotenv').config();

// Lê do .env a chave secreta usada para assinar e verificar os tokens JWT.
const JWT_SECRET = process.env.JWT_SECRET;
// Lê o tempo de validade do token e usa 7 dias como padrão.
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Verifica se a chave JWT não foi configurada no arquivo .env.
if (!JWT_SECRET) {
    // Mostra um aviso de segurança caso o projeto esteja usando a chave padrão de desenvolvimento.
    console.warn('[AVISO] JWT_SECRET não definido no .env. Usando um valor padrão inseguro apenas para desenvolvimento.');
// Fecha o bloco de código ou objeto atual.
}

// Declara a função que cria um token JWT a partir dos dados recebidos no payload.
function generateToken(payload) {
    // Assina e devolve um novo JWT usando a chave secreta e o tempo de expiração configurado.
    return jwt.sign(payload, JWT_SECRET || 'dev_secret_inseguro', { expiresIn: JWT_EXPIRES_IN });
// Fecha o bloco de código ou objeto atual.
}

// Declara a função que valida um token JWT recebido pela API.
function verifyToken(token) {
    // Verifica assinatura e validade do token e devolve o payload decodificado.
    return jwt.verify(token, JWT_SECRET || 'dev_secret_inseguro');
// Fecha o bloco de código ou objeto atual.
}

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = { generateToken, verifyToken };
