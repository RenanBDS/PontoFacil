// Importa o Express, usado para criar rotas e a aplicação HTTP.
const express = require('express')
// Cria um roteador do Express para agrupar as rotas deste módulo.
const router = express.Router()
// Importa './userController' e guarda a referência na constante userController.
const userController = require('./userController')
// Cria a constante { com o valor calculado ou importado nesta linha.
const {
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  registerValidator,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  loginValidator,
  // Valida os campos de edição do perfil antes de executar o controller.
  profileUpdateValidator,
// Esta linha participa da estrutura e da lógica da operação definida neste bloco.
} = require('./userValidator')
// Importa isAuthenticated do módulo '../../middlewares/auth' para usar esses recursos neste arquivo.
const { isAuthenticated } = require('../../middlewares/auth')
// Importa '../../middlewares/profileMulter' e guarda a referência na constante profileMulter.
const profileMulter = require('../../middlewares/profileMulter')
// Importa '../../middlewares/asyncHandler' e guarda a referência na constante asyncHandler.
const asyncHandler = require('../../middlewares/asyncHandler')

// Mantida inicialmente para facilitar a criação de usuários durante o desenvolvimento.
// Não haverá cadastro público no frontend final.
// Inicia o registro de uma rota HTTP POST.
router.post('/register', registerValidator, asyncHandler(userController.register))

// Inicia o registro de uma rota HTTP POST.
router.post('/login', loginValidator, asyncHandler(userController.login))
// Inicia o registro de uma rota HTTP POST.
router.post('/logout', userController.logout)

// Inicia o registro de uma rota HTTP GET.
router.get('/profile/me', isAuthenticated, asyncHandler(userController.getMyProfile))
// Inicia o registro de uma rota HTTP PUT.
router.put(
  // Define a rota do perfil do usuário atualmente autenticado.
  '/profile/me',
  // Executa o middleware de autenticação antes de permitir o acesso à operação.
  isAuthenticated,
  // Recebe uma única foto de perfil e a processa com o Multer antes da validação.
  profileMulter.single('profilePicture'),
  // Valida os campos de edição do perfil antes de executar o controller.
  profileUpdateValidator,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  asyncHandler(userController.updateProfile)
// Fecha a lista de argumentos desta chamada.
)

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = router
