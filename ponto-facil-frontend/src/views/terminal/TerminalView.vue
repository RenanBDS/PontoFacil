<!-- Linha original 1: Inicia a seção visual do componente Vue. -->
<template>
  <main class="terminal-page">
    <section class="terminal-card">
      <h1>Ponto Fácil</h1>
      <h2>Terminal de Ponto</h2>
      <div class="camera-placeholder">Câmera</div>
      <p>Posicione-se diante da câmera.</p>
    </section>
  </main>
</template>

<!-- Inicia o bloco CSS do componente; scoped limita os estilos ao próprio componente quando presente. -->
<style scoped>
/*  Inicia o bloco de estilos aplicado ao seletor .terminal-page. */
.terminal-page {
  /*  Define a altura mínima com o valor 100vh. */
  min-height: 100vh;
  /*  Define o modelo de layout com o valor grid. */
  display: grid;
  /* Configura a propriedade CSS place-items com o valor center. */
  place-items: center;
  /* Define o espaçamento interno com o valor 24px. */
  padding: 24px;
  /*  Define o fundo com o valor var(--neutral-color). */
  background: var(--neutral-color);
}

/*  Inicia o bloco de estilos aplicado ao seletor .terminal-card. */
.terminal-card {
  /*  Define a largura com o valor min(100%, 760px). */
  width: min(100%, 760px);
  /*  Define o alinhamento do texto com o valor center. */
  text-align: center;
}

/*  Inicia o bloco de estilos aplicado ao seletor .camera-placeholder. */
.camera-placeholder {
  /*  Define a altura mínima com o valor 360px. */
  min-height: 360px;
  /*  Define o espaçamento externo com o valor 24px auto. */
  margin: 24px auto;
  /*  Define o modelo de layout com o valor grid. */
  display: grid;
  /*  Configura a propriedade CSS place-items com o valor center. */
  place-items: center;
  /*  Define a borda com o valor 2px dashed var(--tertiary-color). */
  border: 2px dashed var(--tertiary-color);
  /*  Arredonda os cantos com o valor 24px. */
  border-radius: 24px;
  /*  Define o fundo com o valor #fff. */
  background: #fff;
  /*  Define a cor do texto com o valor var(--text-muted). */
  color: var(--text-muted);
}
</style>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 1: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 2: <main class="terminal-page">
  -> Inicia a área principal de conteúdo da página.
Linha original 3: <section class="terminal-card">
  -> Inicia uma seção semântica que agrupa este conteúdo da página.
Linha original 4: <h1>Ponto Fácil</h1>
  -> Cria um título que organiza a hierarquia visual e semântica do conteúdo.
Linha original 5: <h2>Terminal de Ponto</h2>
  -> Cria um título que organiza a hierarquia visual e semântica do conteúdo.
Linha original 6: <div class="camera-placeholder">Câmera</div>
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 7: <p>Posicione-se diante da câmera.</p>
  -> Cria um parágrafo de texto na interface.
Linha original 8: </section>
  -> Encerra o elemento section iniciado anteriormente.
Linha original 9: </main>
  -> Encerra o elemento main iniciado anteriormente.
Linha original 10: </template>
  -> Encerra o template do componente Vue.
-->
