<!-- Linha original 1: Inicia o bloco JavaScript do componente Vue. -->
<script setup>
// Linha original 2: Importa recursos de vue para serem usados neste arquivo.
import { reactive, ref } from 'vue'
// Linha original 3: Importa recursos de vue-router para serem usados neste arquivo.
import { useRoute, useRouter } from 'vue-router'
// Linha original 4: Importa recursos de ../../stores/auth para serem usados neste arquivo.
import { useAuthStore } from '../../stores/auth'

// Linha original 6: Obtém o Vue Router e guarda em router para realizar navegações pelo código.
const router = useRouter()
// Linha original 7: Obtém a rota atual e guarda em route para consultar parâmetros e metadados.
const route = useRoute()
// Linha original 8: Acessa a store de autenticação e guarda em authStore para consultar ou alterar a sessão.
const authStore = useAuthStore()

// Linha original 10: Cria o objeto reativo form, permitindo acompanhar alterações de seus campos no Vue.
const form = reactive({
  // Linha original 11: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  login: '',
  // Linha original 12: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  password: '',
// Linha original 13: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 15: Cria a referência reativa isSubmitting; quando seu valor muda, o Vue pode atualizar a interface.
const isSubmitting = ref(false)
// Linha original 16: Cria a referência reativa apiErrorMessage; quando seu valor muda, o Vue pode atualizar a interface.
const apiErrorMessage = ref('')

// Linha original 18: Declara a função assíncrona handleSubmit, agrupando a lógica executada quando ela for chamada.
async function handleSubmit() {
  // Linha original 19: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  apiErrorMessage.value = ''
  // Linha original 20: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  isSubmitting.value = true

  // Linha original 22: Inicia um bloco protegido para executar uma operação que pode gerar erro.
  try {
    // Linha original 23: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
    await authStore.login({
      // Linha original 24: Remove espaços extras do início e do fim do texto.
      login: form.login.trim(),
      // Linha original 25: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      password: form.password,
    // Linha original 26: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    })

    // Linha original 28: Navega para a rota informada usando o Vue Router.
    router.push(route.query.redirect || { name: 'dashboard' })
  // Linha original 29: Captura o erro ocorrido no bloco try para tratá-lo sem interromper a aplicação.
  } catch (error) {
    // Linha original 30: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    apiErrorMessage.value =
      // Linha original 31: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      error.message || 'Não foi possível realizar o login.'
  // Linha original 32: Inicia o bloco executado ao final da operação, tenha ela dado certo ou erro.
  } finally {
    // Linha original 33: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    isSubmitting.value = false
  // Linha original 34: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 35: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
// Linha original 36: Encerra o bloco JavaScript deste componente.
</script>

<!-- Linha original 38: Inicia a seção visual do componente Vue. -->
<template>
  <main class="login-page">
    <section class="login-card">
      <div class="auth-header">
        <h1 class="h3 fw-bold mb-1">Ponto Fácil</h1>
        <p class="mb-0">Acesso administrativo ao controle de ponto</p>
      </div>

      <div class="p-4">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="login" class="form-label">E-mail ou usuário</label>
            <input
              id="login"
              v-model="form.login"
              type="text"
              class="form-control"
              autocomplete="username"
              required
            >
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-control"
              autocomplete="current-password"
              required
            >
          </div>

          <p v-if="apiErrorMessage" class="text-danger small">
            {{ apiErrorMessage }}
          </p>

          <div class="d-grid">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<!-- Linha original 91: Inicia o bloco CSS do componente; scoped limita os estilos ao próprio componente quando presente. -->
<style scoped>
/* Linha original 92: Inicia o bloco de estilos aplicado ao seletor .login-page. */
.login-page {
  /* Linha original 93: Define a altura mínima com o valor 100vh. */
  min-height: 100vh;
  /* Linha original 94: Define o modelo de layout com o valor grid. */
  display: grid;
  /* Linha original 95: Configura a propriedade CSS place-items com o valor center. */
  place-items: center;
  /* Linha original 96: Define o espaçamento interno com o valor 24px. */
  padding: 24px;
  /* Linha original 97: Define o fundo com o valor var(--neutral-color). */
  background: var(--neutral-color);
/* Linha original 98: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 100: Inicia o bloco de estilos aplicado ao seletor .login-card. */
.login-card {
  /* Linha original 101: Define a largura com o valor min(100%, 460px). */
  width: min(100%, 460px);
  /* Linha original 102: Define o fundo com o valor #fff. */
  background: #fff;
  /* Linha original 103: Define a borda com o valor 1px solid var(--tertiary-color). */
  border: 1px solid var(--tertiary-color);
  /* Linha original 104: Arredonda os cantos com o valor 16px. */
  border-radius: 16px;
  /* Linha original 105: Controla conteúdo que ultrapassa os limites com o valor hidden. */
  overflow: hidden;
  /* Linha original 106: Aplica sombra ao elemento com o valor 0 12px 35px rgba(15, 23, 42, 0.08). */
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
/* Linha original 107: Encerra o bloco de regras CSS iniciado anteriormente. */
}
  /* Linha original 108: Encerra o bloco de estilos deste componente. */
</style>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 38: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 39: <main class="login-page">
  -> Inicia a área principal de conteúdo da página.
Linha original 40: <section class="login-card">
  -> Inicia uma seção semântica que agrupa este conteúdo da página.
Linha original 41: <div class="auth-header">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 42: <h1 class="h3 fw-bold mb-1">Ponto Fácil</h1>
  -> Cria um título que organiza a hierarquia visual e semântica do conteúdo.
Linha original 43: <p class="mb-0">Acesso administrativo ao controle de ponto</p>
  -> Cria um parágrafo de texto na interface.
Linha original 44: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 46: <div class="p-4">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 47: <form @submit.prevent="handleSubmit">
  -> Escuta o envio do formulário, evita o recarregamento padrão e chama a função indicada.
Linha original 48: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 49: <label for="login" class="form-label">E-mail ou usuário</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 50: <input
  -> Cria um campo de entrada para receber ou exibir dados.
Linha original 51: id="login"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 52: v-model="form.login"
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 53: type="text"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 54: class="form-control"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 55: autocomplete="username"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 56: required
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 57: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 58: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 60: <div class="mb-3">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 61: <label for="password" class="form-label">Senha</label>
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 62: <input
  -> Cria um campo de entrada para receber ou exibir dados.
Linha original 63: id="password"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 64: v-model="form.password"
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 65: type="password"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 66: class="form-control"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 67: autocomplete="current-password"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 68: required
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 69: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 70: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 72: <p v-if="apiErrorMessage" class="text-danger small">
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 73: {{ apiErrorMessage }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 74: </p>
  -> Encerra o elemento p iniciado anteriormente.
Linha original 76: <div class="d-grid">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 77: <button
  -> Cria um botão interativo com o comportamento definido pelos atributos.
Linha original 78: type="submit"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 79: class="btn btn-primary btn-lg"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 80: :disabled="isSubmitting"
  -> Controla dinamicamente se o elemento ficará desabilitado.
Linha original 81: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 82: {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 83: </button>
  -> Encerra o elemento button iniciado anteriormente.
Linha original 84: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 85: </form>
  -> Encerra o elemento form iniciado anteriormente.
Linha original 86: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 87: </section>
  -> Encerra o elemento section iniciado anteriormente.
Linha original 88: </main>
  -> Encerra o elemento main iniciado anteriormente.
Linha original 89: </template>
  -> Encerra o template do componente Vue.
-->
