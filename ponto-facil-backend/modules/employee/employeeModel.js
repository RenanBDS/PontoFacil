// Importa DataTypes do módulo 'sequelize' para usar esses recursos neste arquivo.
const { DataTypes } = require('sequelize')
// Importa a conexão configurada do Sequelize com o banco de dados.
const sequelize = require('../../config/database')

// Cria o model Employee no Sequelize para representar os funcionários.
const Employee = sequelize.define(
  // Define 'Employee' como nome interno do model no Sequelize.
  'Employee',
  // Abre um bloco de código ou objeto.
  {
    // Inicia a definição do campo id.
    id: {
      // Define este campo como número inteiro no banco.
      type: DataTypes.INTEGER,
      // Faz o banco incrementar esse valor automaticamente a cada novo registro.
      autoIncrement: true,
      // Define este campo como chave primária da tabela.
      primaryKey: true,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },

    // Inicia a definição do campo de nome completo.
    fullName: {
      // Define este campo como texto no banco.
      type: DataTypes.STRING,
      // Não permite que este campo seja nulo.
      allowNull: false,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },

    // Inicia a definição do CPF do funcionário.
    cpf: {
      // Define este campo como texto limitado a 11 caracteres.
      type: DataTypes.STRING(11),
      // Não permite que este campo seja nulo.
      allowNull: false,
      // Exige que o valor deste campo seja único na tabela.
      unique: true,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },

    // Inicia a definição do nome do arquivo da foto.
    profilePicture: {
      // Define este campo como texto no banco.
      type: DataTypes.STRING,
      // Não permite que este campo seja nulo.
      allowNull: false,
      // Usa a imagem padrão do funcionário quando nenhuma foto personalizada é informada.
      defaultValue: 'default-employee.jpg',
    // Fecha a estrutura iniciada nas linhas anteriores.
    },

    // Inicia a definição do setor/departamento do funcionário.
    department: {
      // Define este campo como texto no banco.
      type: DataTypes.STRING,
      // Permite que este campo seja nulo.
      allowNull: true,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },

    // Inicia a definição do identificador do gestor responsável.
    managerId: {
      // Define este campo como número inteiro no banco.
      type: DataTypes.INTEGER,
      // Permite que este campo seja nulo.
      allowNull: true,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },

    // Inicia a definição que informa se o funcionário está ativo.
    isActive: {
      // Define este campo como valor booleano verdadeiro/falso.
      type: DataTypes.BOOLEAN,
      // Não permite que este campo seja nulo.
      allowNull: false,
      // Define verdadeiro como valor padrão deste campo.
      defaultValue: true,
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
  // Fecha a estrutura iniciada nas linhas anteriores.
  },
  // Abre um bloco de código ou objeto.
  {
    // Define que este model usa a tabela 'employees'.
    tableName: 'employees',
    // Usa nomes com sublinhado no banco, como full_name e created_at.
    underscored: true,
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha a lista de argumentos desta chamada.
)

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = Employee
