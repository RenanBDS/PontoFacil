<!-- Linha original 1: Inicia o bloco JavaScript do componente Vue. -->
<script setup>
// Linha original 2: Importa recursos de vue para serem usados neste arquivo.
import { reactive, ref, onMounted } from 'vue'
// Linha original 3: Importa recursos de ../../services/userService para serem usados neste arquivo.
import { getMyProfile, updateProfile } from '../../services/userService'
// Linha original 4: Importa recursos de ../../utils/media para serem usados neste arquivo.
import { getProfilePictureUrl } from '../../utils/media'
// Linha original 5: Importa recursos de ../../stores/auth para serem usados neste arquivo.
import { useAuthStore } from '../../stores/auth'

// Linha original 7: Acessa a store de autenticação e guarda em authStore para consultar ou alterar a sessão.
const authStore = useAuthStore()

// Linha original 9: Cria a referência reativa username; quando seu valor muda, o Vue pode atualizar a interface.
const username = ref('')
// Linha original 10: Cria a referência reativa email; quando seu valor muda, o Vue pode atualizar a interface.
const email = ref('')
// Linha original 11: Cria a referência reativa role; quando seu valor muda, o Vue pode atualizar a interface.
const role = ref('')
// Linha original 12: Cria o objeto reativo form, permitindo acompanhar alterações de seus campos no Vue.
const form = reactive({ fullName: '' })
// Linha original 13: Cria a referência reativa currentPictureFilename; quando seu valor muda, o Vue pode atualizar a interface.
const currentPictureFilename = ref('')
// Linha original 14: Cria a referência reativa previewUrl; quando seu valor muda, o Vue pode atualizar a interface.
const previewUrl = ref('')
// Linha original 15: Cria a referência reativa selectedFile; quando seu valor muda, o Vue pode atualizar a interface.
const selectedFile = ref(null)
// Linha original 16: Cria a referência reativa isLoading; quando seu valor muda, o Vue pode atualizar a interface.
const isLoading = ref(true)
// Linha original 17: Cria a referência reativa isSubmitting; quando seu valor muda, o Vue pode atualizar a interface.
const isSubmitting = ref(false)
// Linha original 18: Cria a referência reativa apiErrorMessage; quando seu valor muda, o Vue pode atualizar a interface.
const apiErrorMessage = ref('')
// Linha original 19: Cria a referência reativa successMessage; quando seu valor muda, o Vue pode atualizar a interface.
const successMessage = ref('')


// Linha original 22: Registra uma função para executar quando o componente Vue terminar de ser montado na página.
onMounted(async () => {
  // Linha original 23: Inicia um bloco protegido para executar uma operação que pode gerar erro.
  try {
    // Linha original 24: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
    const response = await getMyProfile()
    // Linha original 25: Declara a constante user e atribui a ela o valor ou resultado desta expressão.
    const user = response.data

    // Linha original 27: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    username.value = user.username
    // Linha original 28: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    email.value = user.email
    // Linha original 29: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    role.value = user.role || ''
    // Linha original 30: Atribui um novo valor à variável ou propriedade indicada nesta linha.
    form.fullName = user.fullName || ''
    // Linha original 31: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    currentPictureFilename.value = user.profilePicture
    // Linha original 32: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    previewUrl.value = getProfilePictureUrl(user.profilePicture)
  // Linha original 33: Captura o erro ocorrido no bloco try para tratá-lo sem interromper a aplicação.
  } catch (error) {
    // Linha original 34: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    apiErrorMessage.value = error.message
  // Linha original 35: Inicia o bloco executado ao final da operação, tenha ela dado certo ou erro.
  } finally {
    // Linha original 36: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    isLoading.value = false
  // Linha original 37: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 38: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 40: Declara a função handleFileChange, agrupando a lógica executada quando ela for chamada.
function handleFileChange(event) {
  // Linha original 41: Declara a constante file e atribui a ela o valor ou resultado desta expressão.
  const file = event.target.files[0]
  // Linha original 42: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!file) return

  // Linha original 44: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  selectedFile.value = file
  // Linha original 45: Cria um FileReader para ler a imagem escolhida localmente e gerar uma prévia.
  const reader = new FileReader()
  // Linha original 46: Define a função executada quando a leitura do arquivo pelo FileReader terminar.
  reader.onload = (e) => {
    // Linha original 47: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    previewUrl.value = e.target.result
  // Linha original 48: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
  // Linha original 49: Lê o arquivo selecionado como Data URL para poder exibi-lo imediatamente como prévia.
  reader.readAsDataURL(file)
// Linha original 50: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 52: Declara a função assíncrona handleSubmit, agrupando a lógica executada quando ela for chamada.
async function handleSubmit() {
  // Linha original 53: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  apiErrorMessage.value = ''
  // Linha original 54: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  successMessage.value = ''

  // Linha original 56: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!form.fullName.trim()) {
    // Linha original 57: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    apiErrorMessage.value = 'O nome completo é obrigatório.'
    // Linha original 58: Interrompe a função neste ponto e devolve o controle para quem a chamou.
    return
  // Linha original 59: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 61: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  isSubmitting.value = true

  // Linha original 63: Cria um FormData para enviar campos e, quando necessário, arquivos em multipart/form-data.
  const formData = new FormData()
  // Linha original 64: Adiciona um campo e seu valor ao FormData que será enviado para o backend.
  formData.append('fullName', form.fullName.trim())
  // Linha original 65: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (selectedFile.value) {
    // Linha original 66: Adiciona um campo e seu valor ao FormData que será enviado para o backend.
    formData.append('profilePicture', selectedFile.value)
  // Linha original 67: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 69: Inicia um bloco protegido para executar uma operação que pode gerar erro.
  try {
    // Linha original 70: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
    const response = await updateProfile(formData)

    // Linha original 72: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    currentPictureFilename.value = response.data.profilePicture

    // Linha original 74: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    previewUrl.value = getProfilePictureUrl(
      // Linha original 75: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      response.data.profilePicture
    // Linha original 76: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    )

    // Linha original 78: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
    await authStore.updateUser(response.data)

    // Linha original 80: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    selectedFile.value = null
    // Linha original 81: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    successMessage.value = 'Perfil atualizado com sucesso!'
  // Linha original 82: Captura o erro ocorrido no bloco try para tratá-lo sem interromper a aplicação.
  } catch (error) {
    // Linha original 83: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    apiErrorMessage.value = error.message
  // Linha original 84: Inicia o bloco executado ao final da operação, tenha ela dado certo ou erro.
  } finally {
    // Linha original 85: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    isSubmitting.value = false
  // Linha original 86: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 87: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
// Linha original 88: Encerra o bloco JavaScript deste componente.
</script>

<!-- Linha original 90: Inicia a seção visual do componente Vue. -->
<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="p-4 auth-card">
          <h1 class="h3 fw-bold mb-4 text-center">Meu Perfil</h1>

          <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

          <form v-else @submit.prevent="handleSubmit">
            <div class="text-center mb-4">
              <img :src="previewUrl" alt="Foto de perfil" class="rounded-circle" width="120" height="120"
                style="object-fit: cover;">
              <div class="mt-3">
                <label for="profilePicture" class="btn btn-outline-primary btn-sm">
                  Alterar Foto
                </label>
                <input id="profilePicture" type="file" accept="image/*" class="d-none" @change="handleFileChange">
              </div>
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">Usuário</label>
              <input id="username" class="form-control" :value="username" disabled>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">E-mail</label>
              <input id="email" class="form-control" :value="email" disabled>
            </div>

            <div class="mb-3">
              <label for="role" class="form-label">
                Perfil de acesso
              </label>

              <input id="role" class="form-control" :value="role === 'rh' ? 'RH' : role === 'manager' ? 'Gestor' : role"
                disabled>
            </div>

            <div class="mb-3">
              <label for="fullName" class="form-label">Nome Completo</label>
              <input id="fullName" v-model="form.fullName" class="form-control">
            </div>

            <p v-if="apiErrorMessage" class="text-danger small">{{ apiErrorMessage }}</p>
            <p v-if="successMessage" class="text-success small">{{ successMessage }}</p>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
                {{ isSubmitting ? 'Salvando...' : 'Salvar Alterações' }}
              </button>
              <router-link to="/dashboard" class="btn btn-outline-secondary btn-lg">
                Cancelar
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 90: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 91: <div class="container py-4">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 92: <div class="row justify-content-center">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 93: <div class="col-md-8 col-lg-6">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 94: <div class="p-4 auth-card">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 95: <h1 class="h3 fw-bold mb-4 text-center">Meu Perfil</h1>
  -> Cria um título que organiza a hierarquia visual e semântica do conteúdo.
Linha original 97: <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 99: <form v-else @submit.prevent="handleSubmit">
  -> Renderiza este elemento como alternativa quando a condição anterior não é atendida.
Linha original 100: <div class="text-center mb-4">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 101: <img :src="previewUrl" alt="Foto de perfil" class="rounded-circle" width="120" height="120"
  -> Define dinamicamente a origem da imagem usando uma variável ou expressão Vue.
Linha original 102: style="object-fit: cover;">
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 103: <div class="mt-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 104: <label for="profilePicture" class="btn btn-outline-primary btn-sm">
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 105: Alterar Foto
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 106: </label>
  -> Encerra o elemento label iniciado anteriormente.
Linha original 107: <input id="profilePicture" type="file" accept="image/*" class="d-none" @change="handleFileChange">
  -> Executa a função indicada quando o valor deste campo for alterado.
Linha original 108: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 109: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 111: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 112: <label for="username" class="form-label">Usuário</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 113: <input id="username" class="form-control" :value="username" disabled>
  -> Define dinamicamente o valor mostrado por este elemento.
Linha original 114: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 116: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 117: <label for="email" class="form-label">E-mail</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 118: <input id="email" class="form-control" :value="email" disabled>
  -> Define dinamicamente o valor mostrado por este elemento.
Linha original 119: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 121: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 122: <label for="role" class="form-label">
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 123: Perfil de acesso
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 124: </label>
  -> Encerra o elemento label iniciado anteriormente.
Linha original 126: <input id="role" class="form-control" :value="role === 'rh' ? 'RH' : role === 'manager' ? 'Gestor' …
  -> Define dinamicamente o valor mostrado por este elemento.
Linha original 127: disabled>
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 128: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 130: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 131: <label for="fullName" class="form-label">Nome Completo</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 132: <input id="fullName" v-model="form.fullName" class="form-control">
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 133: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 135: <p v-if="apiErrorMessage" class="text-danger small">{{ apiErrorMessage }}</p>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 136: <p v-if="successMessage" class="text-success small">{{ successMessage }}</p>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 138: <div class="d-grid gap-2">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 139: <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
  -> Controla dinamicamente se o elemento ficará desabilitado.
Linha original 140: {{ isSubmitting ? 'Salvando...' : 'Salvar Alterações' }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 141: </button>
  -> Encerra o elemento button iniciado anteriormente.
Linha original 142: <router-link to="/dashboard" class="btn btn-outline-secondary btn-lg">
  -> Define o destino de navegação do RouterLink.
Linha original 143: Cancelar
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 144: </router-link>
  -> Encerra o elemento router-link iniciado anteriormente.
Linha original 145: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 146: </form>
  -> Encerra o elemento form iniciado anteriormente.
Linha original 147: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 148: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 149: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 150: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 151: </template>
  -> Encerra o template do componente Vue.
-->
