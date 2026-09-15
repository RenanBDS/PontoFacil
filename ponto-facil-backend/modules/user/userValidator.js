// Importa body, validationResult do módulo 'express-validator' para usar esses recursos neste arquivo.
const { body, validationResult } = require('express-validator')
// Importa VALIDATION do módulo '../../config/constants' para usar esses recursos neste arquivo.
const { VALIDATION } = require('../../config/constants')

// Declara a função que verifica o resultado das validações antes de chegar ao controller.
const validate = (req, res, next) => {
  // Coleta todos os erros produzidos pelas regras do express-validator nesta requisição.
  const errors = validationResult(req)
  // Verifica se nenhuma regra de validação encontrou erro.
  if (errors.isEmpty()) return next()

  // Obtém a mensagem do primeiro erro para usar como mensagem principal da resposta.
  const firstError = errors.array()[0].msg
  // Cria um objeto de erro com uma mensagem que será enviada ao tratamento central.
  const error = new Error(firstError)
  // Define status HTTP 400 para indicar que os dados enviados são inválidos.
  error.status = 400
  // Anexa ao erro a lista completa de falhas de validação.
  error.errors = errors.array()
  // Interrompe a operação e encaminha o erro para o tratamento central da API.
  throw error
// Fecha o bloco de código ou objeto atual.
}

// Exporta as regras que validam o cadastro de usuários.
exports.registerValidator = [
  // Inicia a cadeia de validações do campo username.
  body('username')
    // Valida se o tamanho do texto está dentro dos limites configurados.
    .isLength({ min: VALIDATION.USERNAME_MIN, max: VALIDATION.USERNAME_MAX })
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage(
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      `O nome de usuário deve ter entre ${VALIDATION.USERNAME_MIN} e ${VALIDATION.USERNAME_MAX} caracteres.`
    // Fecha a lista de argumentos desta chamada.
    )
    // Remove espaços desnecessários no início e no final do texto.
    .trim(),
  // Inicia a cadeia de validações do campo email.
  body('email')
    // Valida se o texto informado possui formato de e-mail.
    .isEmail()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('Por favor, insira um e-mail válido.')
    // Normaliza o e-mail para uma forma consistente antes de continuar.
    .normalizeEmail(),
  // Inicia a cadeia de validações do campo password.
  body('password')
    // Valida se o tamanho do texto está dentro dos limites configurados.
    .isLength({ min: VALIDATION.PASSWORD_MIN })
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage(`A senha deve ter pelo menos ${VALIDATION.PASSWORD_MIN} caracteres.`),
  // Inicia a cadeia de validações do campo confirmPassword.
  body('confirmPassword')
    // Inicia uma validação personalizada que compara a confirmação de senha com a senha original.
    .custom((value, { req }) => {
      // Verifica se a confirmação de senha é diferente da senha informada.
      if (value !== req.body.password) {
        // Gera um erro de validação quando as duas senhas não são iguais.
        throw new Error('As senhas não coincidem.')
      // Fecha o bloco de código ou objeto atual.
      }
      // Confirma que a validação personalizada foi aprovada.
      return true
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    }),
  // Inicia a cadeia de validações do campo fullName.
  body('fullName')
    // Exige que o valor não esteja vazio.
    .notEmpty()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O nome completo é obrigatório.')
    // Remove espaços desnecessários no início e no final do texto.
    .trim(),
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  validate,
// Fecha a estrutura iniciada nas linhas anteriores.
]

// Exporta as regras que validam os campos enviados no login.
exports.loginValidator = [
  // Inicia a cadeia de validações do campo login.
  body('login')
    // Exige que o valor não esteja vazio.
    .notEmpty()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O e-mail ou usuário é obrigatório.')
    // Remove espaços desnecessários no início e no final do texto.
    .trim(),
  // Inicia a cadeia de validações do campo password.
  body('password')
    // Exige que o valor não esteja vazio.
    .notEmpty()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('A senha é obrigatória.'),
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  validate,
// Fecha a estrutura iniciada nas linhas anteriores.
]

// Exporta as regras que validam a atualização do perfil do usuário.
exports.profileUpdateValidator = [
  // Inicia a cadeia de validações do campo fullName.
  body('fullName')
    // Exige que o valor não esteja vazio.
    .notEmpty()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O nome completo não pode ser vazio.')
    // Remove espaços desnecessários no início e no final do texto.
    .trim(),
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  validate,
// Fecha a estrutura iniciada nas linhas anteriores.
]
