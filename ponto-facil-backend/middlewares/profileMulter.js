// Importa o Multer, usado para receber arquivos enviados por formulário multipart.
const multer = require('multer')
// Importa o módulo nativo path, usado para montar caminhos de arquivos e pastas.
const path = require('path')

// Cria a configuração de armazenamento em disco usada pelo Multer.
const storage = multer.diskStorage({
  // Define a função que informa ao Multer em qual pasta o arquivo será salvo.
  destination: (req, file, cb) => {
    // Chama o callback do Multer para informar o resultado desta etapa.
    cb(null, 'public/uploads/profiles/')
  // Fecha a estrutura iniciada nas linhas anteriores.
  },

  // Define a função responsável por gerar o nome do arquivo salvo.
  filename: (req, file, cb) => {
    // Inicia a criação de um sufixo único para o nome da foto de perfil.
    const uniqueSuffix =
      // Combina o horário atual com um número aleatório para reduzir o risco de nomes repetidos.
      Date.now() + '-' + Math.round(Math.random() * 1E9)

    // Chama o callback do Multer para informar o resultado desta etapa.
    cb(
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      null,
      // Monta o nome da foto com o id do usuário, sufixo único e extensão original.
      `profile-${req.user.id}-${uniqueSuffix}${path.extname(file.originalname)}`
    // Fecha a lista de argumentos desta chamada.
    )
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha a estrutura iniciada nas linhas anteriores.
})

// Declara o filtro que decide quais tipos de arquivo podem ser enviados.
const fileFilter = (req, file, cb) => {
  // Verifica se o arquivo enviado possui um tipo MIME de imagem.
  if (file.mimetype.startsWith('image/')) {
    // Autoriza o Multer a aceitar e processar o arquivo.
    cb(null, true)
  // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
  } else {
    // Recusa o arquivo e cria um erro quando ele não for uma imagem.
    cb(new Error('Apenas imagens são permitidas!'), false)
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha o bloco de código ou objeto atual.
}

// Cria o middleware Multer usado no upload de fotos de perfil.
const upload = multer({
  // Usa a configuração de armazenamento definida anteriormente.
  storage,
  // Usa o filtro de tipos de arquivo definido anteriormente.
  fileFilter,
  // Inicia as regras de limite para o upload.
  limits: {
    // Limita cada arquivo enviado a aproximadamente 4 MB.
    fileSize: 4 * 1024 * 1024
  // Fecha o bloco de código ou objeto atual.
  }
// Fecha a estrutura iniciada nas linhas anteriores.
})

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = upload
