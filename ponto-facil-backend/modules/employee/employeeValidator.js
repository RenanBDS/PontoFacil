// Importa body, param, validationResult do módulo 'express-validator' para usar esses recursos neste arquivo.
const { body, param, validationResult } = require('express-validator')

// Declara a função que verifica o resultado das validações antes de chegar ao controller.
const validate = (req, res, next) => {
  // Coleta todos os erros produzidos pelas regras do express-validator nesta requisição.
  const errors = validationResult(req)

  // Verifica se nenhuma regra de validação encontrou erro.
  if (errors.isEmpty()) {
    // Libera a requisição para continuar para o próximo middleware ou controller.
    return next()
  // Fecha o bloco de código ou objeto atual.
  }

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

// Exporta a sequência de regras usadas no cadastro de funcionários.
exports.createEmployeeValidator = [
  // Inicia a cadeia de validações do campo fullName.
  body('fullName')
    // Exige que o valor não esteja vazio.
    .notEmpty()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O nome completo é obrigatório.')
    // Remove espaços desnecessários no início e no final do texto.
    .trim(),

  // Inicia a cadeia de validações do campo cpf.
  body('cpf')
    // Valida o valor usando a expressão regular definida nesta linha.
    .matches(/^\d{11}$/)
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O CPF deve conter exatamente 11 números.'),

  // Inicia a cadeia de validações do campo department.
  body('department')
    // Torna este campo opcional; as regras seguintes só são aplicadas quando houver valor.
    .optional({ nullable: true })
    // Remove espaços desnecessários no início e no final do texto.
    .trim(),

  // Inicia a cadeia de validações do campo managerId.
  body('managerId')
    // Torna este campo opcional; as regras seguintes só são aplicadas quando houver valor.
    .optional({ nullable: true, checkFalsy: true })
    // Valida se o valor é um número inteiro dentro do limite informado.
    .isInt({ min: 1 })
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O gestor informado é inválido.')
    // Converte o valor validado para número inteiro.
    .toInt(),

  // Inicia a cadeia de validações do campo isActive.
  body('isActive')
    // Torna este campo opcional; as regras seguintes só são aplicadas quando houver valor.
    .optional()
    // Valida se o valor pode ser interpretado como booleano.
    .isBoolean()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O status do funcionário é inválido.')
    // Converte o valor validado para verdadeiro ou falso.
    .toBoolean(),

  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  validate,
// Fecha a estrutura iniciada nas linhas anteriores.
]

// Exporta a sequência de regras usadas na edição de funcionários.
exports.updateEmployeeValidator = [
  // Inicia a cadeia de validações do campo fullName.
  body('fullName')
    // Exige que o valor não esteja vazio.
    .notEmpty()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O nome completo é obrigatório.')
    // Remove espaços desnecessários no início e no final do texto.
    .trim(),

  // Inicia a cadeia de validações do campo cpf.
  body('cpf')
    // Valida o valor usando a expressão regular definida nesta linha.
    .matches(/^\d{11}$/)
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O CPF deve conter exatamente 11 números.'),

  // Inicia a cadeia de validações do campo department.
  body('department')
    // Torna este campo opcional; as regras seguintes só são aplicadas quando houver valor.
    .optional({ nullable: true })
    // Remove espaços desnecessários no início e no final do texto.
    .trim(),

  // Inicia a cadeia de validações do campo managerId.
  body('managerId')
    // Torna este campo opcional; as regras seguintes só são aplicadas quando houver valor.
    .optional({ nullable: true, checkFalsy: true })
    // Valida se o valor é um número inteiro dentro do limite informado.
    .isInt({ min: 1 })
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O gestor informado é inválido.')
    // Converte o valor validado para número inteiro.
    .toInt(),

  // Inicia a cadeia de validações do campo isActive.
  body('isActive')
    // Torna este campo opcional; as regras seguintes só são aplicadas quando houver valor.
    .optional()
    // Valida se o valor pode ser interpretado como booleano.
    .isBoolean()
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O status do funcionário é inválido.')
    // Converte o valor validado para verdadeiro ou falso.
    .toBoolean(),

  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  validate,
// Fecha a estrutura iniciada nas linhas anteriores.
]

// Exporta a validação do parâmetro id das rotas de funcionário.
exports.employeeIdValidator = [
  // Inicia a validação do parâmetro id recebido pela URL.
  param('id')
    // Valida se o valor é um número inteiro dentro do limite informado.
    .isInt({ min: 1 })
    // Define a mensagem que será usada se a validação anterior falhar.
    .withMessage('O funcionário informado é inválido.')
    // Converte o valor validado para número inteiro.
    .toInt(),

  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  validate,
// Fecha a estrutura iniciada nas linhas anteriores.
]
