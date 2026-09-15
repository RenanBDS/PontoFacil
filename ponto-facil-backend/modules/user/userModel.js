// Importa DataTypes do módulo 'sequelize' para usar esses recursos neste arquivo.
const { DataTypes } = require('sequelize')
// Importa a conexão configurada do Sequelize com o banco de dados.
const sequelize = require('../../config/database')

// Cria o model User no Sequelize para representar os usuários do sistema.
const User = sequelize.define(
  // Define 'User' como nome interno do model no Sequelize.
  'User',
  // Abre um bloco de código ou objeto.
  {
    // Inicia a definição do campo id.
    id: {
      // Define este campo como número inteiro no banco.
      type: DataTypes.INTEGER,
      // Define este campo como chave primária da tabela.
      primaryKey: true,
      // Faz o banco incrementar esse valor automaticamente a cada novo registro.
      autoIncrement: true,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
    // Inicia a definição do nome de usuário usado para login.
    username: {
      // Define este campo como texto no banco.
      type: DataTypes.STRING,
      // Não permite que este campo seja nulo.
      allowNull: false,
      // Vincula o campo ao índice único de username para impedir duplicidades.
      unique: 'idx_unique_username',
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
    // Inicia a definição do e-mail do usuário.
    email: {
      // Define este campo como texto no banco.
      type: DataTypes.STRING,
      // Não permite que este campo seja nulo.
      allowNull: false,
      // Vincula o campo ao índice único de e-mail para impedir duplicidades.
      unique: 'idx_unique_email',
      // Adiciona uma validação de formato de e-mail no próprio model.
      validate: { isEmail: true },
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
    // Inicia a definição do campo que armazena o hash da senha.
    password: {
      // Define este campo como texto no banco.
      type: DataTypes.STRING,
      // Não permite que este campo seja nulo.
      allowNull: false,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
    // Inicia a definição do campo de nome completo.
    fullName: {
      // Define este campo como texto no banco.
      type: DataTypes.STRING,
      // Permite que este campo seja nulo.
      allowNull: true,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
    // Inicia a definição do nome do arquivo da foto.
    profilePicture: {
      // Define este campo como texto no banco.
      type: DataTypes.STRING,
      // Permite que este campo seja nulo.
      allowNull: true,
      // Usa a imagem padrão de perfil quando nenhuma foto personalizada é informada.
      defaultValue: 'default-profile.png',
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
    // Inicia a definição que informa se o usuário está bloqueado.
    isBlocked: {
      // Define este campo como valor booleano verdadeiro/falso.
      type: DataTypes.BOOLEAN,
      // Define falso como valor padrão deste campo.
      defaultValue: false,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
    // Inicia a definição do perfil de acesso do usuário.
    role: {
      // Restringe o campo aos perfis 'rh' ou 'manager'.
      type: DataTypes.ENUM('rh', 'manager'),
      // Não permite que este campo seja nulo.
      allowNull: false,
      // Define RH como perfil de acesso padrão de um novo usuário.
      defaultValue: 'rh',
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
  // Fecha a estrutura iniciada nas linhas anteriores.
  },
  // Abre um bloco de código ou objeto.
  {
    // Ativa automaticamente os campos de criação e atualização dos registros.
    timestamps: true,
    // Define que este model usa a tabela 'users'.
    tableName: 'users',
    // Inicia a lista de índices criados na tabela para garantir unicidade e melhorar consultas.
    indexes: [
      // Cria um índice único para impedir usernames repetidos.
      { unique: true, fields: ['username'], name: 'idx_unique_username' },
      // Cria um índice único para impedir e-mails repetidos.
      { unique: true, fields: ['email'], name: 'idx_unique_email' },
    // Fecha a estrutura iniciada nas linhas anteriores.
    ],
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha a lista de argumentos desta chamada.
)

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = User
