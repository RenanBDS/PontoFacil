<!-- Linha original 1: Inicia o bloco JavaScript do componente Vue. -->
<script setup>
// Linha original 2: Importa recursos de vue para serem usados neste arquivo.
import { reactive, ref } from 'vue'
// Linha original 3: Importa recursos de vue-router para serem usados neste arquivo.
import { useRouter } from 'vue-router'
// Linha original 4: Importa recursos de ../../services/authService para serem usados neste arquivo.
import { register } from '../../services/authService'

// Linha original 6: Obtém o Vue Router e guarda em router para realizar navegações pelo código.
const router = useRouter()

// Linha original 8: Cria o objeto reativo form, permitindo acompanhar alterações de seus campos no Vue.
const form = reactive({
  // Linha original 9: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  username: '',
  // Linha original 10: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  email: '',
  // Linha original 11: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  password: '',
  // Linha original 12: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  confirmPassword: '',
  // Linha original 13: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  fullName: '',
// Linha original 14: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 16: Cria o objeto reativo errors, permitindo acompanhar alterações de seus campos no Vue.
const errors = reactive({
  // Linha original 17: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  username: '',
  // Linha original 18: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  email: '',
  // Linha original 19: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  password: '',
  // Linha original 20: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  confirmPassword: '',
  // Linha original 21: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  fullName: '',
// Linha original 22: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 24: Cria a referência reativa isSubmitting; quando seu valor muda, o Vue pode atualizar a interface.
const isSubmitting = ref(false)
// Linha original 25: Cria a referência reativa apiErrorMessage; quando seu valor muda, o Vue pode atualizar a interface.
const apiErrorMessage = ref('')

// Linha original 27: Declara a função validate, agrupando a lógica executada quando ela for chamada.
function validate() {
  // Linha original 28: Obtém as chaves do objeto, permitindo verificar se existem erros ou propriedades registradas.
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  // Linha original 30: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!form.fullName.trim()) {
    // Linha original 31: Atribui um novo valor à variável ou propriedade indicada nesta linha.
    errors.fullName = 'O nome completo é obrigatório.'
  // Linha original 32: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 34: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (form.username.trim().length < 3 || form.username.trim().length > 20) {
    // Linha original 35: Atribui um novo valor à variável ou propriedade indicada nesta linha.
    errors.username = 'O nome de usuário deve ter entre 3 e 20 caracteres.'
  // Linha original 36: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 38: Declara a constante emailPattern e atribui a ela o valor ou resultado desta expressão.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // Linha original 39: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!emailPattern.test(form.email)) {
    // Linha original 40: Atribui um novo valor à variável ou propriedade indicada nesta linha.
    errors.email = 'Informe um e-mail válido.'
  // Linha original 41: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 43: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (form.password.length < 6) {
    // Linha original 44: Atribui um novo valor à variável ou propriedade indicada nesta linha.
    errors.password = 'A senha deve ter pelo menos 6 caracteres.'
  // Linha original 45: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 47: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (form.confirmPassword !== form.password) {
    // Linha original 48: Atribui um novo valor à variável ou propriedade indicada nesta linha.
    errors.confirmPassword = 'As senhas não coincidem.'
  // Linha original 49: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 51: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
  return Object.values(errors).every((message) => message === '')
// Linha original 52: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 54: Declara a função assíncrona handleSubmit, agrupando a lógica executada quando ela for chamada.
async function handleSubmit() {
  // Linha original 55: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  apiErrorMessage.value = ''

  // Linha original 57: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!validate()) {
    // Linha original 58: Interrompe a função neste ponto e devolve o controle para quem a chamou.
    return
  // Linha original 59: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 61: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  isSubmitting.value = true

  // Linha original 63: Inicia um bloco protegido para executar uma operação que pode gerar erro.
  try {
    // Linha original 64: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
    const response = await register({
      // Linha original 65: Remove espaços extras do início e do fim do texto.
      username: form.username.trim(),
      // Linha original 66: Remove espaços extras do início e do fim do texto.
      email: form.email.trim(),
      // Linha original 67: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      password: form.password,
      // Linha original 68: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      confirmPassword: form.confirmPassword,
      // Linha original 69: Remove espaços extras do início e do fim do texto.
      fullName: form.fullName.trim(),
    // Linha original 70: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    })
    
    // Linha original 72: Escreve uma informação no Console do navegador para ajudar em diagnóstico ou acompanhamento.
    console.log('Conta criada:', response.data)
    // Linha original 73: Navega para a rota informada usando o Vue Router.
    router.push({ name: 'login' })
  // Linha original 74: Captura o erro ocorrido no bloco try para tratá-lo sem interromper a aplicação.
  } catch (error) {
    // Linha original 75: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    apiErrorMessage.value = error.message
  // Linha original 76: Inicia o bloco executado ao final da operação, tenha ela dado certo ou erro.
  } finally {
    // Linha original 77: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    isSubmitting.value = false
  // Linha original 78: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 79: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 81: Encerra o bloco JavaScript deste componente.
</script>

<!-- Linha original 83: Inicia a seção visual do componente Vue. -->
<template>
  <div class="auth-page">
    <h1>Criar Conta</h1>

    <form @submit.prevent="handleSubmit" novalidate>
      <div class="field">
        <label for="fullName">Nome completo</label>
        <input id="fullName" type="text" v-model="form.fullName" />
        <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
      </div>

      <div class="field">
        <label for="username">Usuário</label>
        <input id="username" type="text" v-model="form.username" />
        <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
      </div>

      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" type="email" v-model="form.email" />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="field">
        <label for="password">Senha</label>
        <input id="password" type="password" v-model="form.password" />
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
      </div>

      <div class="field">
        <label for="confirmPassword">Confirmar senha</label>
        <input id="confirmPassword" type="password" v-model="form.confirmPassword" />
        <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
      </div>

      <p v-if="apiErrorMessage" class="api-error">{{ apiErrorMessage }}</p>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Criando conta...' : 'Criar Minha Conta' }}
      </button>
    </form>
  </div>
</template>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 83: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 84: <div class="auth-page">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 85: <h1>Criar Conta</h1>
  -> Cria um título que organiza a hierarquia visual e semântica do conteúdo.
Linha original 87: <form @submit.prevent="handleSubmit" novalidate>
  -> Escuta o envio do formulário, evita o recarregamento padrão e chama a função indicada.
Linha original 88: <div class="field">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 89: <label for="fullName">Nome completo</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 90: <input id="fullName" type="text" v-model="form.fullName" />
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 91: <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 92: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 94: <div class="field">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 95: <label for="username">Usuário</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 96: <input id="username" type="text" v-model="form.username" />
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 97: <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 98: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 100: <div class="field">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 101: <label for="email">E-mail</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 102: <input id="email" type="email" v-model="form.email" />
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 103: <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 104: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 106: <div class="field">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 107: <label for="password">Senha</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 108: <input id="password" type="password" v-model="form.password" />
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 109: <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 110: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 112: <div class="field">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 113: <label for="confirmPassword">Confirmar senha</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 114: <input id="confirmPassword" type="password" v-model="form.confirmPassword" />
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 115: <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 116: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 118: <p v-if="apiErrorMessage" class="api-error">{{ apiErrorMessage }}</p>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 120: <button type="submit" :disabled="isSubmitting">
  -> Controla dinamicamente se o elemento ficará desabilitado.
Linha original 121: {{ isSubmitting ? 'Criando conta...' : 'Criar Minha Conta' }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 122: </button>
  -> Encerra o elemento button iniciado anteriormente.
Linha original 123: </form>
  -> Encerra o elemento form iniciado anteriormente.
Linha original 124: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 125: </template>
  -> Encerra o template do componente Vue.
-->
