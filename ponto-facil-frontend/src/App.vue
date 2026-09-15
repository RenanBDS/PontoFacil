<!-- Linha original 1: Inicia o bloco JavaScript do componente Vue. -->
<script setup>
// Linha original 2: Importa recursos de vue para serem usados neste arquivo.
import { computed } from 'vue'
// Linha original 3: Importa recursos de vue-router para serem usados neste arquivo.
import { useRoute } from 'vue-router'
// Linha original 4: Importa recursos de ./components/layout/TheNavbar.vue para serem usados neste arquivo.
import TheNavbar from './components/layout/TheNavbar.vue'
// Linha original 5: Importa recursos de ./components/layout/TheSidebar.vue para serem usados neste arquivo.
import TheSidebar from './components/layout/TheSidebar.vue'
// Linha original 6: Importa recursos de ./components/layout/TheFooter.vue para serem usados neste arquivo.
import TheFooter from './components/layout/TheFooter.vue'

// Linha original 8: Obtém a rota atual e guarda em route para consultar parâmetros e metadados.
const route = useRoute()
// Linha original 9: Cria a propriedade calculada isFullscreen, recalculada quando os dados usados por ela mudam.
const isFullscreen = computed(() => Boolean(route.meta.fullscreen))
// Linha original 10: Encerra o bloco JavaScript deste componente.
</script>

<!-- Linha original 12: Inicia a seção visual do componente Vue. -->
<template>
  <router-view v-if="isFullscreen" />

  <div v-else class="app-layout">
    <TheNavbar />
    <div class="app-body">
      <TheSidebar />
      <main class="app-content">
        <router-view />
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<!-- Linha original 27: Inicia o bloco CSS do componente; scoped limita os estilos ao próprio componente quando presente. -->
<style scoped>
/* Linha original 28: Inicia o bloco de estilos aplicado ao seletor .app-layout. */
.app-layout {
  /* Linha original 29: Define a altura mínima com o valor 100vh. */
  min-height: 100vh;
  /* Linha original 30: Define o modelo de layout com o valor flex. */
  display: flex;
  /* Linha original 31: Define a direção dos itens flexíveis com o valor column. */
  flex-direction: column;
/* Linha original 32: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 34: Inicia o bloco de estilos aplicado ao seletor .app-body. */
.app-body {
  /* Linha original 35: Define o modelo de layout com o valor flex. */
  display: flex;
  /* Linha original 36: Controla a ocupação do espaço em um contêiner flexível com o valor 1. */
  flex: 1;
  /* Linha original 37: Alinha os itens no eixo transversal com o valor stretch. */
  align-items: stretch;
/* Linha original 38: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 40: Inicia o bloco de estilos aplicado ao seletor .app-content. */
.app-content {
  /* Linha original 41: Controla a ocupação do espaço em um contêiner flexível com o valor 1. */
  flex: 1;
  /* Linha original 42: Define a largura mínima com o valor 0. */
  min-width: 0;
  /* Linha original 43: Define o espaçamento interno com o valor 32px. */
  padding: 32px;
  /* Linha original 44: Define o fundo com o valor var(--neutral-color). */
  background: var(--neutral-color);
/* Linha original 45: Encerra o bloco de regras CSS iniciado anteriormente. */
}
  /* Linha original 46: Encerra o bloco de estilos deste componente. */
</style>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 12: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 13: <router-view v-if="isFullscreen" />
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 15: <div v-else class="app-layout">
  -> Renderiza este elemento como alternativa quando a condição anterior não é atendida.
Linha original 16: <TheNavbar />
  -> Cria o elemento TheNavbar com os atributos definidos nesta marcação.
Linha original 17: <div class="app-body">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 18: <TheSidebar />
  -> Cria o elemento TheSidebar com os atributos definidos nesta marcação.
Linha original 19: <main class="app-content">
  -> Inicia a área principal de conteúdo da página.
Linha original 20: <router-view />
  -> Marca o ponto em que o componente correspondente à rota atual será renderizado.
Linha original 21: </main>
  -> Encerra o elemento main iniciado anteriormente.
Linha original 22: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 23: <TheFooter />
  -> Cria o elemento TheFooter com os atributos definidos nesta marcação.
Linha original 24: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 25: </template>
  -> Encerra o template do componente Vue.
-->
