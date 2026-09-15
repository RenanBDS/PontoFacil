// Importa Sequelize do módulo 'sequelize' para usar esses recursos neste arquivo.
const { Sequelize } = require('sequelize');
// Carrega as variáveis do arquivo .env para process.env.
require('dotenv').config();

// Cria uma nova conexão do Sequelize com as configurações informadas nas linhas seguintes.
const sequelize = new Sequelize(
    // Informa ao Sequelize o nome do banco de dados definido no .env.
    process.env.DB_NAME,
    // Informa o usuário do banco de dados definido no .env.
    process.env.DB_USER,
    // Informa a senha do banco de dados definida no .env.
    process.env.DB_PASSWORD,
    // Abre um bloco de código ou objeto.
    {
        // Define o endereço do servidor MySQL usando o valor do .env.
        host: process.env.DB_HOST,
        // Define a porta do MySQL usando o valor do .env.
        port: process.env.DB_PORT,
        // Informa que o banco utilizado pelo Sequelize é MySQL.
        dialect: 'mysql',
        // Desativa a exibição das consultas SQL do Sequelize no terminal.
        logging: false,
        // Inicia as opções padrão aplicadas aos models criados pelo Sequelize.
        define: {
            // Ativa automaticamente os campos de criação e atualização dos registros.
            timestamps: true,
            // Usa nomes com sublinhado no banco, como full_name e created_at.
            underscored: true
        // Fecha o bloco de código ou objeto atual.
        }
    // Fecha o bloco de código ou objeto atual.
    }
// Fecha a estrutura iniciada nas linhas anteriores.
);

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = sequelize;
