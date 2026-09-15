<!-- Linha original 1: Inicia o bloco JavaScript do componente Vue. -->
<script setup>
// Linha original 2: Importa recursos de vue para serem usados neste arquivo.
import { computed, onMounted, ref } from 'vue'
// Linha original 3: Importa recursos de vue-router para serem usados neste arquivo.
import { useRoute, useRouter } from 'vue-router'

// Linha original 5: Importa recursos de um módulo externo para serem usados neste arquivo.
import {
  // Linha original 6: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  createEmployee,
  // Linha original 7: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  getEmployeeById,
  // Linha original 8: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  updateEmployee,
// Linha original 9: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
} from '../../services/employeeService'

// Linha original 11: Obtém a rota atual e guarda em route para consultar parâmetros e metadados.
const route = useRoute()
// Linha original 12: Obtém o Vue Router e guarda em router para realizar navegações pelo código.
const router = useRouter()

// Linha original 14: Declara a constante form e atribui a ela o valor ou resultado desta expressão.
const form = ref({
  // Linha original 15: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  fullName: '',
  // Linha original 16: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  cpf: '',
  // Linha original 17: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  department: '',
  // Linha original 18: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  isActive: true,
// Linha original 19: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 21: Cria a referência reativa errors; quando seu valor muda, o Vue pode atualizar a interface.
const errors = ref({})
// Linha original 22: Cria a referência reativa apiErrorMessage; quando seu valor muda, o Vue pode atualizar a interface.
const apiErrorMessage = ref('')
// Linha original 23: Cria a referência reativa isLoading; quando seu valor muda, o Vue pode atualizar a interface.
const isLoading = ref(false)
// Linha original 24: Cria a referência reativa isSubmitting; quando seu valor muda, o Vue pode atualizar a interface.
const isSubmitting = ref(false)
// Linha original 25: Cria a referência reativa selectedPicture; quando seu valor muda, o Vue pode atualizar a interface.
const selectedPicture = ref(null)
// Linha original 26: Cria a referência reativa picturePreview; quando seu valor muda, o Vue pode atualizar a interface.
const picturePreview = ref('')

// Linha original 28: Cria a propriedade calculada isEditing, recalculada quando os dados usados por ela mudam.
const isEditing = computed(() => {
  // Linha original 29: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
  return Boolean(route.params.id)
// Linha original 30: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 32: Cria a propriedade calculada pageTitle, recalculada quando os dados usados por ela mudam.
const pageTitle = computed(() => {
  // Linha original 33: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
  return isEditing.value
    // Linha original 34: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
    ? 'Editar Funcionário'
    // Linha original 35: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
    : 'Novo Funcionário'
// Linha original 36: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 38: Declara a função validateForm, agrupando a lógica executada quando ela for chamada.
function validateForm() {
  // Linha original 39: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  errors.value = {}

  // Linha original 41: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!form.value.fullName.trim()) {
    // Linha original 42: Atribui um novo valor à variável ou propriedade indicada nesta linha.
    errors.value.fullName = 'Informe o nome completo.'
  // Linha original 43: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 45: Substitui partes do texto conforme a expressão informada, usada aqui para limpeza ou formatação.
  const cpfNumbers = form.value.cpf.replace(/\D/g, '')

  // Linha original 47: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!/^\d{11}$/.test(cpfNumbers)) {
    // Linha original 48: Atribui um novo valor à variável ou propriedade indicada nesta linha.
    errors.value.cpf = 'O CPF deve conter 11 números.'
  // Linha original 49: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 51: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
  return Object.keys(errors.value).length === 0
// Linha original 52: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 54: Declara a função assíncrona loadEmployee, agrupando a lógica executada quando ela for chamada.
async function loadEmployee() {
  // Linha original 55: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!isEditing.value) {
    // Linha original 56: Interrompe a função neste ponto e devolve o controle para quem a chamou.
    return
  // Linha original 57: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 59: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  isLoading.value = true
  // Linha original 60: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  apiErrorMessage.value = ''

  // Linha original 62: Inicia um bloco protegido para executar uma operação que pode gerar erro.
  try {
    // Linha original 63: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
    const response = await getEmployeeById(route.params.id)

    // Linha original 65: Declara a constante employee e atribui a ela o valor ou resultado desta expressão.
    const employee = response.data
    // Linha original 66: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
    const uploadsUrl =
      // Linha original 67: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      import.meta.env.VITE_UPLOADS_URL || 'http://localhost:3000'

    // Linha original 69: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    picturePreview.value =
      // Linha original 70: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      `${uploadsUrl}/uploads/employees/${employee.profilePicture || 'default-employee.jpg'}`

    // Linha original 72: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    form.value = {
      // Linha original 73: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      fullName: employee.fullName,
      // Linha original 74: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      cpf: employee.cpf,
      // Linha original 75: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      department: employee.department || '',
      // Linha original 76: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      isActive: employee.isActive,
    // Linha original 77: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    }
  // Linha original 78: Captura o erro ocorrido no bloco try para tratá-lo sem interromper a aplicação.
  } catch (error) {
    // Linha original 79: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    apiErrorMessage.value =
      // Linha original 80: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      error.message || 'Não foi possível carregar o funcionário.'
  // Linha original 81: Inicia o bloco executado ao final da operação, tenha ela dado certo ou erro.
  } finally {
    // Linha original 82: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    isLoading.value = false
  // Linha original 83: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 84: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 86: Declara a função assíncrona handleSubmit, agrupando a lógica executada quando ela for chamada.
async function handleSubmit() {
  // Linha original 87: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  apiErrorMessage.value = ''

  // Linha original 89: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!validateForm()) {
    // Linha original 90: Interrompe a função neste ponto e devolve o controle para quem a chamou.
    return
  // Linha original 91: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 93: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  isSubmitting.value = true

  // Linha original 95: Inicia um bloco protegido para executar uma operação que pode gerar erro.
  try {
    // Linha original 96: Cria um FormData para enviar campos e, quando necessário, arquivos em multipart/form-data.
    const formData = new FormData()

    // Linha original 98: Adiciona um campo e seu valor ao FormData que será enviado para o backend.
    formData.append(
      // Linha original 99: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      'fullName',
      // Linha original 100: Remove espaços extras do início e do fim do texto.
      form.value.fullName.trim()
    // Linha original 101: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    )

    // Linha original 103: Adiciona um campo e seu valor ao FormData que será enviado para o backend.
    formData.append(
      // Linha original 104: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      'cpf',
      // Linha original 105: Substitui partes do texto conforme a expressão informada, usada aqui para limpeza ou formatação.
      form.value.cpf.replace(/\D/g, '')
    // Linha original 106: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    )

    // Linha original 108: Adiciona um campo e seu valor ao FormData que será enviado para o backend.
    formData.append(
      // Linha original 109: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      'department',
      // Linha original 110: Remove espaços extras do início e do fim do texto.
      form.value.department.trim()
    // Linha original 111: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    )

    // Linha original 113: Adiciona um campo e seu valor ao FormData que será enviado para o backend.
    formData.append(
      // Linha original 114: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      'isActive',
      // Linha original 115: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      form.value.isActive
    // Linha original 116: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    )

    // Linha original 118: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
    if (selectedPicture.value) {
      // Linha original 119: Adiciona um campo e seu valor ao FormData que será enviado para o backend.
      formData.append(
        // Linha original 120: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        'profilePicture',
        // Linha original 121: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
        selectedPicture.value
      // Linha original 122: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
      )
    // Linha original 123: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    }

    // Linha original 125: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
    if (isEditing.value) {
      // Linha original 126: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
      await updateEmployee(
        // Linha original 127: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
        route.params.id,
        // Linha original 128: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
        formData
      // Linha original 129: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
      )
    // Linha original 130: Inicia o caminho alternativo executado quando a condição anterior for falsa.
    } else {
      // Linha original 131: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
      await createEmployee(formData)
    // Linha original 132: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    }

    // Linha original 134: Navega para a rota informada usando o Vue Router.
    router.push('/employees')
  // Linha original 135: Captura o erro ocorrido no bloco try para tratá-lo sem interromper a aplicação.
  } catch (error) {
    // Linha original 136: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    apiErrorMessage.value =
      // Linha original 137: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      error.message || 'Não foi possível salvar o funcionário.'
  // Linha original 138: Inicia o bloco executado ao final da operação, tenha ela dado certo ou erro.
  } finally {
    // Linha original 139: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    isSubmitting.value = false
  // Linha original 140: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 141: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 143: Declara a função cancel, agrupando a lógica executada quando ela for chamada.
function cancel() {
  // Linha original 144: Navega para a rota informada usando o Vue Router.
  router.push('/employees')
// Linha original 145: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 147: Registra uma função para executar quando o componente Vue terminar de ser montado na página.
onMounted(() => {
  // Linha original 148: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
  loadEmployee()
// Linha original 149: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 151: Declara a função handlePictureChange, agrupando a lógica executada quando ela for chamada.
function handlePictureChange(event) {
  // Linha original 152: Declara a constante file e atribui a ela o valor ou resultado desta expressão.
  const file = event.target.files[0]

  // Linha original 154: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!file) {
    // Linha original 155: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    selectedPicture.value = null
    // Linha original 156: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    picturePreview.value = ''
    // Linha original 157: Interrompe a função neste ponto e devolve o controle para quem a chamou.
    return
  // Linha original 158: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 160: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  selectedPicture.value = file

  // Linha original 162: Cria um FileReader para ler a imagem escolhida localmente e gerar uma prévia.
  const reader = new FileReader()

  // Linha original 164: Define a função executada quando a leitura do arquivo pelo FileReader terminar.
  reader.onload = (event) => {
    // Linha original 165: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    picturePreview.value = event.target.result
  // Linha original 166: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 168: Lê o arquivo selecionado como Data URL para poder exibi-lo imediatamente como prévia.
  reader.readAsDataURL(file)
// Linha original 169: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
// Linha original 170: Encerra o bloco JavaScript deste componente.
</script>

<!-- Linha original 172: Inicia a seção visual do componente Vue. -->
<template>
  <section>
    <div class="mb-4">
      <h1>{{ pageTitle }}</h1>

      <p class="text-muted mb-0">
        Preencha os dados do funcionário.
      </p>
    </div>

    <div v-if="isLoading" class="text-center py-5">
      Carregando funcionário...
    </div>

    <div v-else class="card border-0 shadow-sm">
      <div class="card-body">
        <div v-if="apiErrorMessage" class="alert alert-danger">
          {{ apiErrorMessage }}
        </div>

        <form novalidate @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="profilePicture" class="form-label">
              {{ isEditing ? 'Foto atual do funcionário' : 'Foto do funcionário' }}
            </label>

            <div v-if="picturePreview" class="mb-3">
              <img :src="picturePreview" alt="Prévia da foto do funcionário" class="employee-picture-preview">
            </div>

            <input id="profilePicture" type="file" class="form-control" accept="image/jpeg,image/png,image/webp"
              @change="handlePictureChange">

            <div class="form-text">
              {{
                isEditing
                  ? 'Selecione uma nova imagem somente se quiser alterar a foto atual.'
                  : 'Formatos aceitos: JPG, PNG ou WEBP.'
              }}
            </div>
          </div>

          <div class="mb-3">
            <label for="fullName" class="form-label">
              Nome completo
            </label>

            <input id="fullName" v-model="form.fullName" type="text" class="form-control"
              :class="{ 'is-invalid': errors.fullName }" placeholder="Nome do funcionário">

            <div v-if="errors.fullName" class="invalid-feedback">
              {{ errors.fullName }}
            </div>
          </div>

          <div class="mb-3">
            <label for="cpf" class="form-label">
              CPF
            </label>

            <input id="cpf" v-model="form.cpf" type="text" class="form-control" :class="{ 'is-invalid': errors.cpf }"
              placeholder="Somente números" maxlength="14">

            <div v-if="errors.cpf" class="invalid-feedback">
              {{ errors.cpf }}
            </div>
          </div>

          <div class="mb-3">
            <label for="department" class="form-label">
              Setor
            </label>

            <input id="department" v-model="form.department" type="text" class="form-control"
              placeholder="Ex.: Tecnologia" :class="{ 'is-invalid': errors.department }">
          </div>

          <div class="form-check mb-4">
            <input id="isActive" v-model="form.isActive" class="form-check-input" type="checkbox">

            <label class="form-check-label" for="isActive">
              Funcionário ativo
            </label>
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{
                isSubmitting
                  ? 'Salvando...'
                  : 'Salvar'
              }}
            </button>

            <button type="button" class="btn btn-outline-secondary" :disabled="isSubmitting" @click="cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<!-- Linha original 276: Inicia o bloco CSS do componente; scoped limita os estilos ao próprio componente quando presente. -->
<style scoped>
/* Linha original 277: Inicia o bloco de estilos aplicado ao seletor .employee-picture-preview. */
.employee-picture-preview {
  /* Linha original 278: Define a largura com o valor 140px. */
  width: 140px;
  /* Linha original 279: Define a altura com o valor 140px. */
  height: 140px;
  /* Linha original 280: Controla como a imagem se ajusta ao espaço com o valor cover. */
  object-fit: cover;
  /* Linha original 281: Arredonda os cantos com o valor 12px. */
  border-radius: 12px;
/* Linha original 282: Encerra o bloco de regras CSS iniciado anteriormente. */
}
  /* Linha original 283: Encerra o bloco de estilos deste componente. */
</style>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 172: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 173: <section>
  -> Inicia uma seção semântica que agrupa este conteúdo da página.
Linha original 174: <div class="mb-4">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 175: <h1>{{ pageTitle }}</h1>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 177: <p class="text-muted mb-0">
  -> Cria um parágrafo de texto na interface.
Linha original 178: Preencha os dados do funcionário.
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 179: </p>
  -> Encerra o elemento p iniciado anteriormente.
Linha original 180: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 182: <div v-if="isLoading" class="text-center py-5">
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 183: Carregando funcionário...
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 184: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 186: <div v-else class="card border-0 shadow-sm">
  -> Renderiza este elemento como alternativa quando a condição anterior não é atendida.
Linha original 187: <div class="card-body">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 188: <div v-if="apiErrorMessage" class="alert alert-danger">
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 189: {{ apiErrorMessage }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 190: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 192: <form novalidate @submit.prevent="handleSubmit">
  -> Escuta o envio do formulário, evita o recarregamento padrão e chama a função indicada.
Linha original 193: <div class="mb-4">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 194: <label for="profilePicture" class="form-label">
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 195: {{ isEditing ? 'Foto atual do funcionário' : 'Foto do funcionário' }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 196: </label>
  -> Encerra o elemento label iniciado anteriormente.
Linha original 198: <div v-if="picturePreview" class="mb-3">
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 199: <img :src="picturePreview" alt="Prévia da foto do funcionário" class="employee-picture-preview">
  -> Define dinamicamente a origem da imagem usando uma variável ou expressão Vue.
Linha original 200: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 202: <input id="profilePicture" type="file" class="form-control" accept="image/jpeg,image/png,image/webp"
  -> Cria um campo de entrada para receber ou exibir dados.
Linha original 203: @change="handlePictureChange">
  -> Executa a função indicada quando o valor deste campo for alterado.
Linha original 205: <div class="form-text">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 206: {{
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 207: isEditing
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 208: ? 'Selecione uma nova imagem somente se quiser alterar a foto atual.'
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 209: : 'Formatos aceitos: JPG, PNG ou WEBP.'
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 210: }}
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 211: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 212: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 214: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 215: <label for="fullName" class="form-label">
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 216: Nome completo
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 217: </label>
  -> Encerra o elemento label iniciado anteriormente.
Linha original 219: <input id="fullName" v-model="form.fullName" type="text" class="form-control"
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 220: :class="{ 'is-invalid': errors.fullName }" placeholder="Nome do funcionário">
  -> Aplica classes CSS dinamicamente de acordo com uma expressão do Vue.
Linha original 222: <div v-if="errors.fullName" class="invalid-feedback">
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 223: {{ errors.fullName }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 224: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 225: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 227: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 228: <label for="cpf" class="form-label">
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 229: CPF
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 230: </label>
  -> Encerra o elemento label iniciado anteriormente.
Linha original 232: <input id="cpf" v-model="form.cpf" type="text" class="form-control" :class="{ 'is-invalid': errors.…
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 233: placeholder="Somente números" maxlength="14">
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 235: <div v-if="errors.cpf" class="invalid-feedback">
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 236: {{ errors.cpf }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 237: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 238: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 240: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 241: <label for="department" class="form-label">
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 242: Setor
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 243: </label>
  -> Encerra o elemento label iniciado anteriormente.
Linha original 245: <input id="department" v-model="form.department" type="text" class="form-control"
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 246: placeholder="Ex.: Tecnologia" :class="{ 'is-invalid': errors.department }">
  -> Aplica classes CSS dinamicamente de acordo com uma expressão do Vue.
Linha original 247: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 249: <div class="form-check mb-4">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 250: <input id="isActive" v-model="form.isActive" class="form-check-input" type="checkbox">
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 252: <label class="form-check-label" for="isActive">
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 253: Funcionário ativo
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 254: </label>
  -> Encerra o elemento label iniciado anteriormente.
Linha original 255: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 257: <div class="d-flex gap-2">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 258: <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
  -> Controla dinamicamente se o elemento ficará desabilitado.
Linha original 259: {{
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 260: isSubmitting
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 261: ? 'Salvando...'
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 262: : 'Salvar'
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 263: }}
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 264: </button>
  -> Encerra o elemento button iniciado anteriormente.
Linha original 266: <button type="button" class="btn btn-outline-secondary" :disabled="isSubmitting" @click="cancel">
  -> Executa a função indicada quando o usuário clicar neste elemento.
Linha original 267: Cancelar
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 268: </button>
  -> Encerra o elemento button iniciado anteriormente.
Linha original 269: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 270: </form>
  -> Encerra o elemento form iniciado anteriormente.
Linha original 271: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 272: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 273: </section>
  -> Encerra o elemento section iniciado anteriormente.
Linha original 274: </template>
  -> Encerra o template do componente Vue.
-->
