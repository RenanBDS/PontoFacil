// Importa o Multer, usado para receber arquivos enviados por formulário multipart.
const multer = require('multer')
// Importa o módulo nativo path, usado para montar caminhos de arquivos e pastas.
const path = require('path')

// Cria a configuração de armazenamento em disco usada pelo Multer.
const storage = multer.diskStorage({
  // Define a função que informa ao Multer em qual pasta o arquivo será salvo.
  destination: (req, file, cb) => {
    // Chama o callback do Multer para informar o resultado desta etapa.
    cb(
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      null,
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      path.join(
        // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
        __dirname,
        // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
        '../public/uploads/employees'
      // Fecha a lista de argumentos desta chamada.
      )
    // Fecha a lista de argumentos desta chamada.
    )
  // Fecha a estrutura iniciada nas linhas anteriores.
  },

  // Define a função responsável por gerar o nome do arquivo salvo.
  filename: (req, file, cb) => {
    // Extrai a extensão do arquivo original enviado pelo usuário.
    const extension = path.extname(file.originalname)

    // Inicia a criação de um nome único para evitar que arquivos sobrescrevam uns aos outros.
    const uniqueName =
      // Monta o nome do arquivo usando data/hora atual, número aleatório e extensão original.
      `employee-${Date.now()}-${Math.round(
        // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
        Math.random() * 1e9
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      )}${extension}`

    // Informa ao Multer o nome final que será usado para salvar o arquivo.
    cb(null, uniqueName)
  // Fecha a estrutura iniciada nas linhas anteriores.
  },
// Fecha a estrutura iniciada nas linhas anteriores.
})

// Declara o filtro que decide quais tipos de arquivo podem ser enviados.
const fileFilter = (req, file, cb) => {
  // Inicia a lista de tipos MIME de imagem aceitos no upload.
  const allowedTypes = [
    // Permite arquivos do tipo image/jpeg.
    'image/jpeg',
    // Permite arquivos do tipo image/png.
    'image/png',
    // Permite arquivos do tipo image/webp.
    'image/webp',
  // Fecha a estrutura iniciada nas linhas anteriores.
  ]

  // Verifica se o tipo MIME do arquivo não está na lista permitida.
  if (!allowedTypes.includes(file.mimetype)) {
    // Cria um objeto de erro com uma mensagem que será enviada ao tratamento central.
    const error = new Error(
      // Esta linha participa da estrutura e da lógica da operação definida neste bloco.
      'Envie apenas arquivos de imagem.'
    // Fecha a lista de argumentos desta chamada.
    )

    // Define status HTTP 400 para indicar que os dados enviados são inválidos.
    error.status = 400

    // Recusa o arquivo no Multer e devolve o erro criado.
    return cb(error, false)
  // Fecha o bloco de código ou objeto atual.
  }

  // Autoriza o Multer a aceitar e processar o arquivo.
  cb(null, true)
// Fecha o bloco de código ou objeto atual.
}

// Cria o middleware Multer específico para fotos de funcionários.
const employeeMulter = multer({
  // Usa a configuração de armazenamento definida anteriormente.
  storage,
  // Usa o filtro de tipos de arquivo definido anteriormente.
  fileFilter,
  // Inicia as regras de limite para o upload.
  limits: {
    // Limita cada arquivo enviado a aproximadamente 4 MB.
    fileSize: 4 * 1024 * 1024,
  // Fecha a estrutura iniciada nas linhas anteriores.
  },
// Fecha a estrutura iniciada nas linhas anteriores.
})

// Exporta este valor para que outros arquivos possam importá-lo com require().
module.exports = employeeMulter
