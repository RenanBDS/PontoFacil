// Importa o Express, usado para criar rotas e a aplicação HTTP.
const express = require('express')
// Cria um roteador do Express para agrupar as rotas deste módulo.
const router = express.Router()

// Importa './employeeController' e guarda a referência na constante employeeController.
const employeeController = require('./employeeController')

// Cria a constante { com o valor calculado ou importado nesta linha.
const {
  // Aplica o middleware createEmployeeValidator antes de chamar o controller.
  createEmployeeValidator,
  // Aplica o middleware updateEmployeeValidator antes de chamar o controller.
  updateEmployeeValidator,
  // Aplica o middleware employeeIdValidator antes de chamar o controller.
  employeeIdValidator,
// Esta linha participa da estrutura e da lógica da operação definida neste bloco.
} = require('./employeeValidator')

// Importa isAuthenticated do módulo '../../middlewares/auth' para usar esses recursos neste arquivo.
const { isAuthenticated } = require('../../middlewares/auth')
// Importa '../../middlewares/asyncHandler' e guarda a referência na constante asyncHandler.
const asyncHandler = require('../../middlewares/asyncHandler')
// Importa '../../middlewares/employeeMulter' e guarda a referência na constante employeeMulter.
const employeeMulter = require('../../middlewares/employeeMulter')

// Inicia o registro de uma rota HTTP POST.
router.post(
  // Define /employees como caminho desta rota.
  '/employees',
  // Executa o middleware de autenticação antes de permitir o acesso à operação.
  isAuthenticated,
  // Recebe no máximo uma foto no campo profilePicture e disponibiliza o arquivo em req.file.
  employeeMulter.single('profilePicture'),
  // Aplica o middleware createEmployeeValidator antes de chamar o controller.
  createEmployeeValidator,
  // Executa o controller dentro do asyncHandler para encaminhar erros assíncronos corretamente.
  asyncHandler(employeeController.create)
// Fecha a lista de argumentos desta chamada.
)

// Inicia o registro de uma rota HTTP GET.
router.get(
  // Define /employees como caminho desta rota.
  '/employees',
  // Executa o middleware de autenticação antes de permitir o acesso à operação.
  isAuthenticated,
  // Executa o controller dentro do asyncHandler para encaminhar erros assíncronos corretamente.
  asyncHandler(employeeController.getAll)
// Fecha a lista de argumentos desta chamada.
)

// Inicia o registro de uma rota HTTP GET.
router.get(
  // Define uma rota de funcionário que recebe o id como parâmetro na URL.
  '/employees/:id',
  // Executa o middleware de autenticação antes de permitir o acesso à operação.
  isAuthenticated,
  // Aplica o middleware employeeIdValidator antes de chamar o controller.
  employeeIdValidator,
  // Executa o controller dentro do asyncHandler para encaminhar erros assíncronos corretamente.
  asyncHandler(employeeController.getById)
// Fecha a lista de argumentos desta chamada.
)

// Inicia o registro de uma rota HTTP PUT.
router.put(
  // Define uma rota de funcionário que recebe o id como parâmetro na URL.
  '/employees/:id',
  // Executa o middleware de autenticação antes de permitir o acesso à operação.
  isAuthenticated,
  // Recebe no máximo uma foto no campo profilePicture e disponibiliza o arquivo em req.file.
  employeeMulter.single('profilePicture'),
  // Aplica o middleware employeeIdValidator antes de chamar o controller.
  employeeIdValidator,
  // Aplica o middleware updateEmployeeValidator antes de chamar o controller.
  updateEmployeeValidator,
  // Executa o controller dentro do asyncHandler para encaminhar erros assíncronos corretamente.
  asyncHandler(employeeController.update)
// Fecha a lista de argumentos desta chamada.
)

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = router
