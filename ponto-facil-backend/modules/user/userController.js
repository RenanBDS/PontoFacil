// Importa './userService' e guarda a referência na constante userService.
const userService = require('./userService')
// Importa generateToken do módulo '../../config/jwt' para usar esses recursos neste arquivo.
const { generateToken } = require('../../config/jwt')
// Importa success do módulo '../../middlewares/apiResponse' para usar esses recursos neste arquivo.
const { success } = require('../../middlewares/apiResponse')

// Declara o controller register, responsável por cadastra um novo usuário do sistema.
exports.register = async (req, res) => {
  // Extrai do corpo da requisição os campos que serão usados nesta operação.
  const { username, email, password, fullName } = req.body

  // Chama o service para validar duplicidades, proteger a senha e criar o novo usuário.
  const newUser = await userService.registerUser(
    // Passa o nome de usuário para a operação atual.
    username,
    // Passa o e-mail para a operação atual.
    email,
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    password,
    // Passa o nome completo para a operação atual.
    fullName
  // Fecha a lista de argumentos desta chamada.
  )

  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(
    // Passa o objeto de resposta HTTP para a função chamada.
    res,
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    newUser,
    // Passa este texto como argumento para a função ou configuração atual.
    'Usuário criado com sucesso! Faça login para continuar.',
    // Passa este valor numérico como argumento da operação atual.
    201
  // Fecha a lista de argumentos desta chamada.
  )
// Fecha o bloco de código ou objeto atual.
}

// Declara o controller login, responsável por autentica um usuário e prepara o token JWT.
exports.login = async (req, res) => {
  // Extrai do corpo da requisição os campos que serão usados nesta operação.
  const { login, password } = req.body

  // Pede ao service para localizar o usuário e validar a senha informada.
  const user = await userService.loginUser(login, password)
  // Busca os dados seguros do perfil que podem ser devolvidos ao frontend.
  const userData = await userService.getUserProfile(user.id)

  // Cria um JWT contendo somente os dados necessários para identificar e autorizar o usuário.
  const token = generateToken({
    // Inclui o id do usuário no payload do token.
    id: userData.id,
    // Inclui o username no payload do token.
    username: userData.username,
    // Inclui o perfil de acesso do usuário no payload do token.
    role: userData.role,
  // Fecha a estrutura iniciada nas linhas anteriores.
  })

  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(
    // Passa o objeto de resposta HTTP para a função chamada.
    res,
    // Define a propriedade { token, user desta configuração ou objeto.
    { token, user: userData },
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    `Bem-vindo, ${userData.fullName || userData.username}!`
  // Fecha a lista de argumentos desta chamada.
  )
// Fecha o bloco de código ou objeto atual.
}

// Declara o controller de logout, que confirma ao frontend o encerramento da sessão local.
exports.logout = (req, res) => {
  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(res, null, 'Logout realizado com sucesso.')
// Fecha o bloco de código ou objeto atual.
}

// Declara o controller getMyProfile, responsável por busca o perfil do usuário autenticado.
exports.getMyProfile = async (req, res) => {
  // Busca os dados seguros do perfil que podem ser devolvidos ao frontend.
  const userData = await userService.getUserProfile(req.user.id)
  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(res, userData)
// Fecha o bloco de código ou objeto atual.
}

// Declara o controller updateProfile, responsável por atualiza o perfil do usuário autenticado.
exports.updateProfile = async (req, res) => {
  // Extrai do corpo da requisição os campos que serão usados nesta operação.
  const { fullName } = req.body
  // Obtém o id do usuário autenticado a partir do JWT validado pelo middleware.
  const userId = req.user.id
  // Obtém o nome da nova foto enviada ou usa null quando nenhuma nova foto foi escolhida.
  const newProfilePictureFilename = req.file ? req.file.filename : null

  // Cria a constante updatedUser com o valor calculado ou importado nesta linha.
  const updatedUser = await userService.updateUserProfile(
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    userId,
    // Inclui o campo fullName na lista de valores extraídos ou enviados para a função.
    fullName,
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    newProfilePictureFilename
  // Fecha a lista de argumentos desta chamada.
  )

  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(res, updatedUser, 'Perfil atualizado com sucesso!')
// Fecha o bloco de código ou objeto atual.
}
