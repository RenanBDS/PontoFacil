<!-- Linha original 1: Inicia a seção visual do componente Vue. -->
<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/terminal">Terminal</router-link>
      <router-link to="/employees">Funcionários</router-link>
      <router-link to="/time-records">Registros de Ponto</router-link>
      <router-link to="/validations">Pendências</router-link>
      <router-link to="/my-profile">Meu Perfil</router-link>
    </nav>
  </aside>
</template>

<!-- Linha original 14: Inicia o bloco CSS do componente; scoped limita os estilos ao próprio componente quando presente. -->
<style scoped>
/* Linha original 15: Inicia o bloco de estilos aplicado ao seletor .sidebar. */
.sidebar {
  /* Linha original 16: Define a largura com o valor 230px. */
  width: 230px;
  /* Linha original 17: Define a largura mínima com o valor 230px. */
  min-width: 230px;
  /* Linha original 18: Define o espaçamento interno com o valor 24px 16px. */
  padding: 24px 16px;
  /* Linha original 19: Define o fundo com o valor #fff. */
  background: #fff;
  /* Linha original 20: Configura a propriedade CSS border-right com o valor 1px solid var(--tertiary-color). */
  border-right: 1px solid var(--tertiary-color);
/* Linha original 21: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 23: Inicia o bloco de estilos aplicado ao seletor .sidebar-nav. */
.sidebar-nav {
  /* Linha original 24: Define o modelo de layout com o valor flex. */
  display: flex;
  /* Linha original 25: Define a direção dos itens flexíveis com o valor column. */
  flex-direction: column;
  /* Linha original 26: Define o espaço entre itens com o valor 8px. */
  gap: 8px;
/* Linha original 27: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 29: Inicia o bloco de estilos aplicado ao seletor .sidebar a. */
.sidebar a {
  /* Linha original 30: Define o espaçamento interno com o valor 11px 12px. */
  padding: 11px 12px;
  /* Linha original 31: Define a cor do texto com o valor var(--text-secondary). */
  color: var(--text-secondary);
  /* Linha original 32: Arredonda os cantos com o valor 10px. */
  border-radius: 10px;
  /* Linha original 33: Configura a propriedade CSS text-decoration com o valor none. */
  text-decoration: none;
/* Linha original 34: Encerra o bloco de regras CSS iniciado anteriormente. */
}

/* Linha original 36: Continua a lista de seletores que receberão o mesmo bloco de estilos. */
.sidebar a:hover,
/* Linha original 37: Inicia o bloco de estilos aplicado ao seletor .sidebar a.router-link-active. */
.sidebar a.router-link-active {
  /* Linha original 38: Define a cor do texto com o valor var(--primary-color). */
  color: var(--primary-color);
  /* Linha original 39: Define o fundo com o valor var(--primary-soft). */
  background: var(--primary-soft);
  /* Linha original 40: Define a espessura da fonte com o valor 600. */
  font-weight: 600;
/* Linha original 41: Encerra o bloco de regras CSS iniciado anteriormente. */
}
  /* Linha original 42: Encerra o bloco de estilos deste componente. */
</style>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 1: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 2: <aside class="sidebar">
  -> Cria o elemento aside com os atributos definidos nesta marcação.
Linha original 3: <nav class="sidebar-nav">
  -> Inicia uma área de navegação da interface.
Linha original 4: <router-link to="/dashboard">Dashboard</router-link>
  -> Define o destino de navegação do RouterLink.
Linha original 5: <router-link to="/terminal">Terminal</router-link>
  -> Define o destino de navegação do RouterLink.
Linha original 6: <router-link to="/employees">Funcionários</router-link>
  -> Define o destino de navegação do RouterLink.
Linha original 7: <router-link to="/time-records">Registros de Ponto</router-link>
  -> Define o destino de navegação do RouterLink.
Linha original 8: <router-link to="/validations">Pendências</router-link>
  -> Define o destino de navegação do RouterLink.
Linha original 9: <router-link to="/my-profile">Meu Perfil</router-link>
  -> Define o destino de navegação do RouterLink.
Linha original 10: </nav>
  -> Encerra o elemento nav iniciado anteriormente.
Linha original 11: </aside>
  -> Encerra o elemento aside iniciado anteriormente.
Linha original 12: </template>
  -> Encerra o template do componente Vue.
-->
