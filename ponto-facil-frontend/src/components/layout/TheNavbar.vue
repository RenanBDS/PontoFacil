<!-- Linha original 1: Inicia o bloco JavaScript do componente Vue. -->
<script setup>
// Linha original 2: Importa recursos de vue-router para serem usados neste arquivo.
import { useRouter } from 'vue-router'
// Linha original 3: Importa recursos de ../../stores/auth para serem usados neste arquivo.
import { useAuthStore } from '../../stores/auth'

// Linha original 5: Obtém o Vue Router e guarda em router para realizar navegações pelo código.
const router = useRouter()
// Linha original 6: Acessa a store de autenticação e guarda em authStore para consultar ou alterar a sessão.
const authStore = useAuthStore()

// Linha original 8: Declara a função assíncrona handleLogout, agrupando a lógica executada quando ela for chamada.
async function handleLogout() {
  // Linha original 9: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
  await authStore.logout()
  // Linha original 10: Navega para a rota informada usando o Vue Router.
  router.push({ name: 'login' })
// Linha original 11: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}
// Linha original 12: Encerra o bloco JavaScript deste componente.
</script>

<!-- Linha original 14: Inicia a seção visual do componente Vue. -->
<template>
  <header class="app-navbar">
    <router-link class="brand" to="/dashboard">Ponto Fácil</router-link>

    <div class="navbar-actions">
      <router-link to="/my-profile">Meu Perfil</router-link>
      <span class="user-greeting">{{ authStore.user?.fullName || authStore.user?.username }}</span>
      <button type="button" class="logout-button" @click="handleLogout">Sair</button>
    </div>
  </header>
</template>

<!-- Linha original 26: Inicia o bloco CSS do componente; scoped limita os estilos ao próprio componente quando presente. -->
<style scoped>
/* Linha original 27: Inicia o bloco de estilos aplicado ao seletor .app-navbar. */
.app-navbar {
  /* Linha original 28: Define a altura mínima com o valor 64px. */
  min-height: 64px;
  /* Linha original 29: Define o espaçamento interno com o valor 12px 28px. */
  padding: 12px 28px;
  /* Linha original 30: Define o fundo com o valor #fff. */
  background: #fff;
  /* Linha original 31: Configura a propriedade CSS border-bottom com o valor 1px solid var(--tertiary-color). */
  border-bottom: 1px solid var(--tertiary-color);
  /* Linha original 32: Define o modelo de layout com o valor flex. */
  display: flex;
  /* Linha original 33: Alinha os itens no eixo transversal com o valor center. */
  align-items: center;
  /* Linha original 34: Distribui os itens no eixo principal com o valor space-between. */
  justify-content: space-between;
  /* Linha original 35: Define o espaço entre itens com o valor 20px. */
  gap: 20px;
/* Linha original 36: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 38: Inicia o bloco de estilos aplicado ao seletor .brand. */
.brand {
  /* Linha original 39: Define a cor do texto com o valor var(--primary-color). */
  color: var(--primary-color);
  /* Linha original 40: Define o tamanho da fonte com o valor 1.25rem. */
  font-size: 1.25rem;
  /* Linha original 41: Define a espessura da fonte com o valor 700. */
  font-weight: 700;
  /* Linha original 42: Configura a propriedade CSS text-decoration com o valor none. */
  text-decoration: none;
/* Linha original 43: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 45: Inicia o bloco de estilos aplicado ao seletor .navbar-actions. */
.navbar-actions {
  /* Linha original 46: Define o modelo de layout com o valor flex. */
  display: flex;
  /* Linha original 47: Alinha os itens no eixo transversal com o valor center. */
  align-items: center;
  /* Linha original 48: Define o espaço entre itens com o valor 16px. */
  gap: 16px;
/* Linha original 49: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 51: Inicia o bloco de estilos aplicado ao seletor .navbar-actions a. */
.navbar-actions a {
  /* Linha original 52: Configura a propriedade CSS text-decoration com o valor none. */
  text-decoration: none;
/* Linha original 53: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 55: Inicia o bloco de estilos aplicado ao seletor .user-greeting. */
.user-greeting {
  /* Linha original 56: Define a cor do texto com o valor var(--text-secondary). */
  color: var(--text-secondary);
/* Linha original 57: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 59: Inicia o bloco de estilos aplicado ao seletor .logout-button. */
.logout-button {
  /* Linha original 60: Define o espaçamento interno com o valor 7px 16px. */
  padding: 7px 16px;
  /* Linha original 61: Define a cor do texto com o valor #fff. */
  color: #fff;
  /* Linha original 62: Define o fundo com o valor var(--primary-color). */
  background: var(--primary-color);
  /* Linha original 63: Define a borda com o valor 0. */
  border: 0;
  /* Linha original 64: Arredonda os cantos com o valor 10px. */
  border-radius: 10px;
/* Linha original 65: Encerra o bloco de regras CSS iniciado anteriormente. */
}
  /* Linha original 66: Encerra o bloco de estilos deste componente. */
</style>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 14: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 15: <header class="app-navbar">
  -> Cria o elemento header com os atributos definidos nesta marcação.
Linha original 16: <router-link class="brand" to="/dashboard">Ponto Fácil</router-link>
  -> Define o destino de navegação do RouterLink.
Linha original 18: <div class="navbar-actions">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 19: <router-link to="/my-profile">Meu Perfil</router-link>
  -> Define o destino de navegação do RouterLink.
Linha original 20: <span class="user-greeting">{{ authStore.user?.fullName || authStore.user?.username }}</span>
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 21: <button type="button" class="logout-button" @click="handleLogout">Sair</button>
  -> Executa a função indicada quando o usuário clicar neste elemento.
Linha original 22: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 23: </header>
  -> Encerra o elemento header iniciado anteriormente.
Linha original 24: </template>
  -> Encerra o template do componente Vue.
-->
