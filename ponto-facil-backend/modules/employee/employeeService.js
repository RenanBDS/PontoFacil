// Importa o módulo nativo fs, usado para verificar, excluir ou manipular arquivos.
const fs = require('fs')
// Importa o módulo nativo path, usado para montar caminhos de arquivos e pastas.
const path = require('path')
// Importa Op do módulo 'sequelize' para usar esses recursos neste arquivo.
const { Op } = require('sequelize')

// Importa o model Employee, que representa a tabela de funcionários no banco.
const Employee = require('./employeeModel')

// Monta o caminho da pasta onde ficam armazenadas as fotos dos funcionários.
const uploadsDirectory = path.join(
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  __dirname,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  '../../public/uploads/employees'
// Fecha a lista de argumentos desta chamada.
)

// Declara uma função auxiliar para apagar uma foto de funcionário que não é mais utilizada.
function deleteEmployeePicture(filename) {
  // Verifica esta condição antes de executar o bloco seguinte.
  if (
    // Verifica se não existe nome de arquivo informado.
    !filename ||
    // Verifica se a foto é a imagem padrão, que nunca deve ser apagada.
    filename === 'default-employee.jpg'
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  ) {
    // Encerra esta função sem executar as etapas seguintes.
    return
  // Fecha o bloco de código ou objeto atual.
  }

  // Monta o caminho completo do arquivo que poderá ser removido do disco.
  const filePath = path.join(
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    uploadsDirectory,
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    filename
  // Fecha a lista de argumentos desta chamada.
  )

  // Confirma que o arquivo realmente existe antes de tentar apagá-lo.
  if (fs.existsSync(filePath)) {
    // Apaga o arquivo do disco de forma síncrona.
    fs.unlinkSync(filePath)
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha o bloco de código ou objeto atual.
}

// Declara o service responsável por cadastrar um funcionário.
async function createEmployee(
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
// Esta linha participa da estrutura e da lógica da operação definida neste bloco.
) {
  // Consulta o banco para verificar se já existe outro funcionário com o CPF informado.
  const cpfExists = await Employee.findOne({
    // Filtra a consulta pelo CPF recebido.
    where: { cpf },
  // Fecha a estrutura iniciada nas linhas anteriores.
  })

  // Executa este bloco quando o CPF já está cadastrado.
  if (cpfExists) {
    // Verifica se uma nova foto foi enviada nesta operação.
    if (profilePicture) {
      // Remove a foto recém-enviada quando a operação não poderá ser concluída.
      deleteEmployeePicture(profilePicture)
    // Fecha o bloco de código ou objeto atual.
    }

    // Cria um objeto de erro com uma mensagem que será enviada ao tratamento central.
    const error = new Error(
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      'Este CPF já está cadastrado.'
    // Fecha a lista de argumentos desta chamada.
    )
    // Define status 409 para indicar conflito por dado já cadastrado.
    error.status = 409
    // Interrompe a operação e encaminha o erro para o tratamento central da API.
    throw error
  // Fecha o bloco de código ou objeto atual.
  }

  // Inicia um bloco protegido para tratar possíveis erros da operação.
  try {
    // Cria um novo registro de funcionário na tabela employees.
    const employee = await Employee.create({
      // Inclui o campo fullName na lista de valores extraídos ou enviados para a função.
      fullName,
      // Inclui o campo cpf na lista de valores extraídos ou enviados para a função.
      cpf,
      // Salva o setor informado ou null quando ele estiver vazio.
      department: department || null,
      // Salva o id do gestor informado ou null quando ainda não houver gestor definido.
      managerId: managerId || null,
      // Inicia a escolha do valor que será salvo no campo de funcionário ativo.
      isActive:
        // Verifica se o status ativo/inativo foi informado explicitamente.
        isActive !== undefined
          // Usa o valor enviado quando o status foi informado.
          ? isActive
          // Usa true como padrão no cadastro quando nenhum status foi informado.
          : true,
      // Inicia a escolha do nome de foto que será salvo no registro.
      profilePicture:
        // Usa a foto enviada ou a imagem padrão quando nenhuma foto foi escolhida.
        profilePicture || 'default-employee.jpg',
    // Fecha a estrutura iniciada nas linhas anteriores.
    })

    // Devolve o registro do funcionário resultante da operação.
    return employee
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  } catch (error) {
    // Verifica se uma nova foto foi enviada nesta operação.
    if (profilePicture) {
      // Remove a foto recém-enviada quando a operação não poderá ser concluída.
      deleteEmployeePicture(profilePicture)
    // Fecha o bloco de código ou objeto atual.
    }

    // Interrompe a operação e encaminha o erro para o tratamento central da API.
    throw error
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha o bloco de código ou objeto atual.
}

// Declara o service responsável por listar os funcionários.
async function getEmployees() {
  // Busca todos os funcionários cadastrados no banco.
  const employees = await Employee.findAll({
    // Ordena a lista alfabeticamente pelo nome completo.
    order: [['fullName', 'ASC']],
  // Fecha a estrutura iniciada nas linhas anteriores.
  })

  // Devolve este resultado e encerra a execução da função atual.
  return employees
// Fecha o bloco de código ou objeto atual.
}

// Declara o service responsável por buscar um funcionário pelo id.
async function getEmployeeById(id) {
  // Busca no banco o funcionário cuja chave primária corresponde ao id informado.
  const employee = await Employee.findByPk(id)

  // Verifica se nenhum funcionário foi encontrado com o id informado.
  if (!employee) {
    // Cria um objeto de erro com uma mensagem que será enviada ao tratamento central.
    const error = new Error(
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      'Funcionário não encontrado.'
    // Fecha a lista de argumentos desta chamada.
    )
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    error.status = 404
    // Interrompe a operação e encaminha o erro para o tratamento central da API.
    throw error
  // Fecha o bloco de código ou objeto atual.
  }

  // Devolve o registro do funcionário resultante da operação.
  return employee
// Fecha o bloco de código ou objeto atual.
}

// Declara o service responsável por atualizar um funcionário existente.
async function updateEmployee(
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  id,
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
// Esta linha participa da estrutura e da lógica da operação definida neste bloco.
) {
  // Cria a constante employee com o valor calculado ou importado nesta linha.
  const employee = await getEmployeeById(id)

  // Consulta o banco para verificar se já existe outro funcionário com o CPF informado.
  const cpfExists = await Employee.findOne({
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    where: {
      // Inclui o campo cpf na lista de valores extraídos ou enviados para a função.
      cpf,
      // Inicia a definição do campo id.
      id: {
        // Define a propriedade [Op.ne] desta configuração ou objeto.
        [Op.ne]: id,
      // Fecha a estrutura iniciada nas linhas anteriores.
      },
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
  // Fecha a estrutura iniciada nas linhas anteriores.
  })

  // Executa este bloco quando o CPF já está cadastrado.
  if (cpfExists) {
    // Verifica se uma nova foto foi enviada nesta operação.
    if (profilePicture) {
      // Remove a foto recém-enviada quando a operação não poderá ser concluída.
      deleteEmployeePicture(profilePicture)
    // Fecha o bloco de código ou objeto atual.
    }

    // Cria um objeto de erro com uma mensagem que será enviada ao tratamento central.
    const error = new Error(
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      'Este CPF já está cadastrado.'
    // Fecha a lista de argumentos desta chamada.
    )
    // Define status 409 para indicar conflito por dado já cadastrado.
    error.status = 409
    // Interrompe a operação e encaminha o erro para o tratamento central da API.
    throw error
  // Fecha o bloco de código ou objeto atual.
  }

  // Guarda o nome da foto atual para poder removê-la depois de uma troca bem-sucedida.
  const oldPicture = employee.profilePicture

  // Inicia um bloco protegido para tratar possíveis erros da operação.
  try {
    // Atualiza no banco os campos do funcionário já localizado.
    await employee.update({
      // Inclui o campo fullName na lista de valores extraídos ou enviados para a função.
      fullName,
      // Inclui o campo cpf na lista de valores extraídos ou enviados para a função.
      cpf,
      // Salva o setor informado ou null quando ele estiver vazio.
      department: department || null,
      // Salva o id do gestor informado ou null quando ainda não houver gestor definido.
      managerId: managerId || null,
      // Inicia a escolha do valor que será salvo no campo de funcionário ativo.
      isActive:
        // Verifica se o status ativo/inativo foi informado explicitamente.
        isActive !== undefined
          // Usa o valor enviado quando o status foi informado.
          ? isActive
          // Mantém o status atual do funcionário quando nenhum novo valor foi informado.
          : employee.isActive,
      // Inicia a escolha do nome de foto que será salvo no registro.
      profilePicture:
        // Usa a nova foto quando enviada; caso contrário, mantém a foto atual.
        profilePicture || employee.profilePicture,
    // Fecha a estrutura iniciada nas linhas anteriores.
    })

    // Verifica esta condição antes de executar o bloco seguinte.
    if (
      // Confirma que foi enviada uma nova foto antes de tentar apagar a antiga.
      profilePicture &&
      // Garante que a foto antiga e a nova não sejam o mesmo arquivo.
      oldPicture !== profilePicture
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    ) {
      // Apaga do disco a foto antiga depois que a nova foi salva com sucesso.
      deleteEmployeePicture(oldPicture)
    // Fecha o bloco de código ou objeto atual.
    }

    // Devolve o registro do funcionário resultante da operação.
    return employee
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  } catch (error) {
    // Verifica se uma nova foto foi enviada nesta operação.
    if (profilePicture) {
      // Remove a foto recém-enviada quando a operação não poderá ser concluída.
      deleteEmployeePicture(profilePicture)
    // Fecha o bloco de código ou objeto atual.
    }

    // Interrompe a operação e encaminha o erro para o tratamento central da API.
    throw error
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha o bloco de código ou objeto atual.
}

// Inicia o objeto que será exportado para uso em outros arquivos do projeto.
module.exports = {
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  createEmployee,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  getEmployees,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  getEmployeeById,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  updateEmployee,
// Fecha o bloco de código ou objeto atual.
}
