// Importa o Express, usado para criar rotas e a aplicação HTTP.
const express = require('express')
// Importa o módulo nativo path, usado para montar caminhos de arquivos e pastas.
const path = require('path')
// Importa o Morgan, usado para registrar no terminal as requisições HTTP.
const logger = require('morgan')
// Importa o middleware CORS, usado para permitir chamadas do frontend.
const cors = require('cors')
// Carrega as variáveis do arquivo .env para process.env.
require('dotenv').config()

// Importa './routes/index' e guarda a referência na constante indexRouter.
const indexRouter = require('./routes/index')
// Importa './modules/user/userRoutes' e guarda a referência na constante userRoutes.
const userRoutes = require('./modules/user/userRoutes')
// Importa './modules/employee/employeeRoutes' e guarda a referência na constante employeeRoutes.
const employeeRoutes = require('./modules/employee/employeeRoutes')
// Importa './middlewares/errorHandler' e guarda a referência na constante errorHandler.
const errorHandler = require('./middlewares/errorHandler')

// Cria a aplicação principal do Express.
const app = express()

// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use(
  // Inicia a configuração do middleware CORS.
  cors({
    // Define qual origem do frontend pode acessar a API, usando o valor do .env ou localhost:5173.
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  // Fecha a estrutura iniciada nas linhas anteriores.
  })
// Fecha a lista de argumentos desta chamada.
)

// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use(logger('dev'))
// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use(express.json())
// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use(express.urlencoded({ extended: false }))

// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use('/api', indexRouter)
// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use('/api', userRoutes)
// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use('/api', employeeRoutes)

// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use((req, res) => {
  // Devolve este resultado e encerra a execução da função atual.
  return res.status(404).json({
    // Marca a resposta como uma operação que falhou.
    success: false,
    // Define a propriedade message desta configuração ou objeto.
    message: 'Rota não encontrada.',
    // Define a propriedade errors desta configuração ou objeto.
    errors: [],
  // Fecha a estrutura iniciada nas linhas anteriores.
  })
// Fecha a estrutura iniciada nas linhas anteriores.
})

// Registra um middleware ou conjunto de rotas na aplicação Express.
app.use(errorHandler)

// Importa a conexão configurada do Sequelize com o banco de dados.
const sequelize = require('./config/database')
// Esta linha participa da estrutura e da lógica da operação definida neste bloco.
sequelize
  // Sincroniza os models com o banco e tenta ajustar a estrutura das tabelas existentes.
  .sync({ alter: true })
  // Exibe uma mensagem no terminal quando a sincronização do banco termina com sucesso.
  .then(() => console.log('Banco de dados sincronizado!'))
  // Exibe no terminal o erro que ocorrer se a sincronização do banco falhar.
  .catch((err) => console.error('Erro ao sincronizar banco:', err))

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = app
