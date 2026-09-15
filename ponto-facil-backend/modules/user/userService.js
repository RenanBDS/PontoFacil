// Importa o model User, que representa a tabela de usuários no banco.
const User = require('./userModel')
// Importa o bcryptjs, usado para criar hash de senhas e comparar senhas no login.
const bcrypt = require('bcryptjs')
// Importa Op do módulo 'sequelize' para usar esses recursos neste arquivo.
const { Op } = require('sequelize')
// Importa o módulo nativo fs, usado para verificar, excluir ou manipular arquivos.
const fs = require('fs')
// Importa o módulo nativo path, usado para montar caminhos de arquivos e pastas.
const path = require('path')

// Declara o service que cadastra um novo usuário administrativo.
async function registerUser(username, email, password, fullName) {
  // Consulta se já existe usuário cadastrado com o e-mail informado.
  const emailExists = await User.findOne({ where: { email } })
  // Consulta se já existe usuário cadastrado com o username informado.
  const usernameExists = await User.findOne({ where: { username } })

  // Impede o cadastro quando e-mail ou username já estiverem em uso.
  if (emailExists || usernameExists) {
    // Interrompe o cadastro informando que o e-mail ou usuário já existe.
    throw new Error('Este e-mail ou usuário já está cadastrado.')
  // Fecha o bloco de código ou objeto atual.
  }

  // Gera um salt com custo 10 para fortalecer o hash da senha.
  const salt = await bcrypt.genSalt(10)
  // Transforma a senha em um hash seguro antes de armazená-la no banco.
  const hashedPassword = await bcrypt.hash(password, salt)

  // Cria o novo registro de usuário na tabela users.
  const newUser = await User.create({
    // Passa o nome de usuário para a operação atual.
    username,
    // Passa o e-mail para a operação atual.
    email,
    // Salva somente o hash da senha, nunca a senha em texto puro.
    password: hashedPassword,
    // Inclui o campo fullName na lista de valores extraídos ou enviados para a função.
    fullName,
  // Fecha a estrutura iniciada nas linhas anteriores.
  })

  // Inicia o objeto que será devolvido por esta função.
  return {
    // Inclui o id do usuário recém-criado no objeto de resposta.
    id: newUser.id,
    // Inclui o username do novo usuário no objeto de resposta.
    username: newUser.username,
    // Inclui o e-mail do novo usuário no objeto de resposta.
    email: newUser.email,
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha o bloco de código ou objeto atual.
}

// Declara o service que valida as credenciais de login.
async function loginUser(login, password) {
  // Procura no banco um usuário correspondente às condições informadas.
  const user = await User.findOne({
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    where: {
      // Permite localizar o usuário tanto pelo e-mail quanto pelo username.
      [Op.or]: [{ email: login }, { username: login }],
    // Fecha a estrutura iniciada nas linhas anteriores.
    },
  // Fecha a estrutura iniciada nas linhas anteriores.
  })

  // Rejeita o login se o usuário não existir ou se a senha não corresponder ao hash salvo.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    // Interrompe a execução gerando um erro para ser tratado acima na cadeia.
    throw new Error('E-mail/Usuário ou senha incorretos.')
  // Fecha o bloco de código ou objeto atual.
  }

  // Verifica se a conta encontrada está marcada como bloqueada.
  if (user.isBlocked) {
    // Cria um objeto de erro com uma mensagem que será enviada ao tratamento central.
    const error = new Error('Este usuário está bloqueado.')
    // Define status 403 para indicar que o usuário existe, mas não tem permissão de acesso.
    error.status = 403
    // Interrompe a operação e encaminha o erro para o tratamento central da API.
    throw error
  // Fecha o bloco de código ou objeto atual.
  }

  // Devolve o usuário encontrado para quem chamou este service.
  return user
// Fecha o bloco de código ou objeto atual.
}

// Declara o service que busca apenas os dados seguros do perfil do usuário.
async function getUserProfile(userId) {
  // Busca o usuário pelo id e limita os campos que serão retornados.
  const user = await User.findByPk(userId, {
    // Inicia a lista de campos permitidos na resposta do perfil.
    attributes: [
      // Inclui o campo id no perfil devolvido pela API.
      'id',
      // Inclui o campo username no perfil devolvido pela API.
      'username',
      // Inclui o campo email no perfil devolvido pela API.
      'email',
      // Inclui o campo fullName no perfil devolvido pela API.
      'fullName',
      // Inclui o campo profilePicture no perfil devolvido pela API.
      'profilePicture',
      // Inclui o campo role no perfil devolvido pela API.
      'role',
    // Fecha a estrutura iniciada nas linhas anteriores.
    ],
  // Fecha a estrutura iniciada nas linhas anteriores.
  })

  // Verifica esta condição antes de executar o bloco seguinte.
  if (!user) {
    // Cria um objeto de erro com uma mensagem que será enviada ao tratamento central.
    const error = new Error('Usuário não encontrado.')
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    error.status = 404
    // Interrompe a operação e encaminha o erro para o tratamento central da API.
    throw error
  // Fecha o bloco de código ou objeto atual.
  }

  // Devolve o usuário encontrado para quem chamou este service.
  return user
// Fecha o bloco de código ou objeto atual.
}

// Declara o service responsável por atualizar nome e foto do perfil do usuário.
async function updateUserProfile(userId, fullName, newProfilePictureFilename) {
  // Cria o objeto com os dados que serão atualizados inicialmente no usuário.
  const updateData = { fullName }
  // Prepara uma variável para guardar a foto antiga caso ela precise ser apagada.
  let oldProfilePicture = null

  // Verifica esta condição antes de executar o bloco seguinte.
  if (newProfilePictureFilename) {
    // Busca o usuário atual para descobrir qual foto estava cadastrada antes da troca.
    const oldUser = await User.findByPk(userId)

    // Verifica esta condição antes de executar o bloco seguinte.
    if (
      // Confirma que o usuário foi encontrado antes de acessar seus dados.
      oldUser &&
      // Confirma que existe uma foto registrada para o usuário.
      oldUser.profilePicture &&
      // Garante que a imagem padrão nunca seja marcada para exclusão.
      oldUser.profilePicture !== 'default-profile.png'
    // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
    ) {
      // Guarda o nome da foto antiga personalizada para removê-la após a atualização.
      oldProfilePicture = oldUser.profilePicture
    // Fecha o bloco de código ou objeto atual.
    }

    // Adiciona o nome da nova foto ao conjunto de campos que serão atualizados.
    updateData.profilePicture = newProfilePictureFilename
  // Fecha o bloco de código ou objeto atual.
  }

  // Atualiza no banco os dados do usuário correspondente ao id informado.
  await User.update(updateData, { where: { id: userId } })

  // Executa a remoção do arquivo antigo somente quando existe uma foto personalizada anterior.
  if (oldProfilePicture) {
    // Monta o caminho completo da foto de perfil antiga no disco.
    const oldProfilePicturePath = path.join(
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      __dirname,
      // Aponta para a pasta onde as fotos de perfil dos usuários são armazenadas.
      '../../public/uploads/profiles',
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      oldProfilePicture
    // Fecha a lista de argumentos desta chamada.
    )

    // Tenta apagar a foto de perfil antiga de forma assíncrona.
    fs.unlink(oldProfilePicturePath, (error) => {
      // Verifica se ocorreu algum erro ao apagar o arquivo antigo.
      if (error) {
        // Registra no terminal a falha ao apagar a foto antiga sem interromper a atualização.
        console.error('Erro ao apagar foto de perfil antiga:', error)
      // Fecha o bloco de código ou objeto atual.
      }
    // Fecha a estrutura iniciada nas linhas anteriores.
    })
  // Fecha o bloco de código ou objeto atual.
  }

  // Busca e devolve o perfil atualizado após concluir a alteração.
  return getUserProfile(userId)
// Fecha o bloco de código ou objeto atual.
}

// Inicia o objeto que será exportado para uso em outros arquivos do projeto.
module.exports = {
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  registerUser,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  loginUser,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  getUserProfile,
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  updateUserProfile,
// Fecha o bloco de código ou objeto atual.
}
