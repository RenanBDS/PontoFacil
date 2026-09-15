// Importa './employeeService' e guarda a referência na constante employeeService.
const employeeService = require('./employeeService')
// Importa success do módulo '../../middlewares/apiResponse' para usar esses recursos neste arquivo.
const { success } = require('../../middlewares/apiResponse')

// Declara o controller create, responsável por cadastra um novo funcionário.
exports.create = async (req, res) => {
  // Cria a constante { com o valor calculado ou importado nesta linha.
  const {
    // Inclui o campo fullName na lista de valores extraídos ou enviados para a função.
    fullName,
    // Inclui o campo cpf na lista de valores extraídos ou enviados para a função.
    cpf,
    // Inclui o campo department na lista de valores extraídos ou enviados para a função.
    department,
    // Inclui o campo managerId na lista de valores extraídos ou enviados para a função.
    managerId,
    // Inclui o campo isActive na lista de valores extraídos ou enviados para a função.
    isActive,
  // Finaliza a extração dos campos enviados no corpo da requisição.
  } = req.body

  // Verifica se o Multer recebeu uma foto e inicia a definição do nome do arquivo.
  const profilePicture = req.file
    // Usa o nome do arquivo salvo pelo Multer quando uma foto foi enviada.
    ? req.file.filename
    // Usa null quando nenhuma foto foi enviada nesta requisição.
    : null

  // Chama o service para aplicar as regras de cadastro e salvar o funcionário no banco.
  const employee = await employeeService.createEmployee(
    // Inclui o campo fullName na lista de valores extraídos ou enviados para a função.
    fullName,
    // Inclui o campo cpf na lista de valores extraídos ou enviados para a função.
    cpf,
    // Inclui o campo department na lista de valores extraídos ou enviados para a função.
    department,
    // Inclui o campo managerId na lista de valores extraídos ou enviados para a função.
    managerId,
    // Inclui o campo isActive na lista de valores extraídos ou enviados para a função.
    isActive,
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    profilePicture
  // Fecha a lista de argumentos desta chamada.
  )

  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(
    // Passa o objeto de resposta HTTP para a função chamada.
    res,
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    employee,
    // Passa este texto como argumento para a função ou configuração atual.
    'Funcionário cadastrado com sucesso!',
    // Passa este valor numérico como argumento da operação atual.
    201
  // Fecha a lista de argumentos desta chamada.
  )
// Fecha o bloco de código ou objeto atual.
}

// Declara o controller getAll, responsável por lista todos os funcionários.
exports.getAll = async (req, res) => {
  // Solicita ao service a lista de funcionários cadastrados.
  const employees = await employeeService.getEmployees()

  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(res, employees)
// Fecha o bloco de código ou objeto atual.
}

// Declara o controller getById, responsável por busca um funcionário específico pelo id.
exports.getById = async (req, res) => {
  // Solicita ao service o funcionário correspondente ao id recebido na rota.
  const employee = await employeeService.getEmployeeById(req.params.id)

  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(res, employee)
// Fecha o bloco de código ou objeto atual.
}

// Declara o controller update, responsável por atualiza os dados de um funcionário.
exports.update = async (req, res) => {
  // Cria a constante { com o valor calculado ou importado nesta linha.
  const {
    // Inclui o campo fullName na lista de valores extraídos ou enviados para a função.
    fullName,
    // Inclui o campo cpf na lista de valores extraídos ou enviados para a função.
    cpf,
    // Inclui o campo department na lista de valores extraídos ou enviados para a função.
    department,
    // Inclui o campo managerId na lista de valores extraídos ou enviados para a função.
    managerId,
    // Inclui o campo isActive na lista de valores extraídos ou enviados para a função.
    isActive,
  // Finaliza a extração dos campos enviados no corpo da requisição.
  } = req.body

  // Verifica se o Multer recebeu uma foto e inicia a definição do nome do arquivo.
  const profilePicture = req.file
    // Usa o nome do arquivo salvo pelo Multer quando uma foto foi enviada.
    ? req.file.filename
    // Usa null quando nenhuma foto foi enviada nesta requisição.
    : null

  // Chama o service para validar e atualizar o funcionário no banco.
  const employee = await employeeService.updateEmployee(
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    req.params.id,
    // Inclui o campo fullName na lista de valores extraídos ou enviados para a função.
    fullName,
    // Inclui o campo cpf na lista de valores extraídos ou enviados para a função.
    cpf,
    // Inclui o campo department na lista de valores extraídos ou enviados para a função.
    department,
    // Inclui o campo managerId na lista de valores extraídos ou enviados para a função.
    managerId,
    // Inclui o campo isActive na lista de valores extraídos ou enviados para a função.
    isActive,
    // Passa o nome da foto para a operação atual.
    profilePicture,
  // Fecha a lista de argumentos desta chamada.
  )

  // Envia uma resposta de sucesso usando o formato padronizado da API.
  return success(
    // Passa o objeto de resposta HTTP para a função chamada.
    res,
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    employee,
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    'Funcionário atualizado com sucesso!'
  // Fecha a lista de argumentos desta chamada.
  )
// Fecha o bloco de código ou objeto atual.
}
