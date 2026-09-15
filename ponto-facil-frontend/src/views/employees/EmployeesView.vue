<!-- Linha original 1: Inicia o bloco JavaScript do componente Vue. -->
<script setup>
// Linha original 2: Importa recursos de vue para serem usados neste arquivo.
import { computed, onMounted, ref } from 'vue'
// Linha original 3: Importa recursos de ../../services/employeeService para serem usados neste arquivo.
import { getEmployees } from '../../services/employeeService'

// Linha original 5: Cria a referência reativa employees; quando seu valor muda, o Vue pode atualizar a interface.
const employees = ref([])
// Linha original 6: Cria a referência reativa search; quando seu valor muda, o Vue pode atualizar a interface.
const search = ref('')
// Linha original 7: Cria a referência reativa isLoading; quando seu valor muda, o Vue pode atualizar a interface.
const isLoading = ref(false)
// Linha original 8: Cria a referência reativa errorMessage; quando seu valor muda, o Vue pode atualizar a interface.
const errorMessage = ref('')

// Linha original 10: Cria a propriedade calculada filteredEmployees, recalculada quando os dados usados por ela mudam.
const filteredEmployees = computed(() => {
  // Linha original 11: Converte o texto para minúsculas para facilitar comparações sem diferença de caixa.
  const term = search.value.trim().toLowerCase()

  // Linha original 13: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!term) {
    // Linha original 14: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
    return employees.value
  // Linha original 15: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 17: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
  return employees.value.filter((employee) => {
    // Linha original 18: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
    return (
      // Linha original 19: Converte o texto para minúsculas para facilitar comparações sem diferença de caixa.
      employee.fullName.toLowerCase().includes(term) ||
      // Linha original 20: Verifica se o texto contém o termo pesquisado.
      employee.cpf.includes(term) ||
      // Linha original 21: Converte o texto para minúsculas para facilitar comparações sem diferença de caixa.
      (employee.department || '').toLowerCase().includes(term)
    // Linha original 22: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    )
  // Linha original 23: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  })
// Linha original 24: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 26: Declara a função formatCpf, agrupando a lógica executada quando ela for chamada.
function formatCpf(cpf) {
  // Linha original 27: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (!cpf || cpf.length !== 11) {
    // Linha original 28: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
    return cpf
  // Linha original 29: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 31: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
  return cpf.replace(
    // Linha original 32: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    // Linha original 33: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
    '$1.$2.$3-$4'
  // Linha original 34: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  )
// Linha original 35: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 37: Declara a função assíncrona loadEmployees, agrupando a lógica executada quando ela for chamada.
async function loadEmployees() {
  // Linha original 38: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  isLoading.value = true
  // Linha original 39: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
  errorMessage.value = ''

  // Linha original 41: Inicia um bloco protegido para executar uma operação que pode gerar erro.
  try {
    // Linha original 42: Aguarda a operação assíncrona terminar antes de continuar a execução da função.
    const response = await getEmployees()
    // Linha original 43: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    employees.value = response.data
  // Linha original 44: Captura o erro ocorrido no bloco try para tratá-lo sem interromper a aplicação.
  } catch (error) {
    // Linha original 45: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    errorMessage.value =
      // Linha original 46: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
      error.message || 'Não foi possível carregar os funcionários.'
  // Linha original 47: Inicia o bloco executado ao final da operação, tenha ela dado certo ou erro.
  } finally {
    // Linha original 48: Atualiza o valor de uma referência reativa do Vue, refletindo a mudança onde ela for usada.
    isLoading.value = false
  // Linha original 49: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 50: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
}

// Linha original 52: Registra uma função para executar quando o componente Vue terminar de ser montado na página.
onMounted(() => {
  // Linha original 53: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
  loadEmployees()
// Linha original 54: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})
// Linha original 55: Encerra o bloco JavaScript deste componente.
</script>

<!-- Linha original 57: Inicia a seção visual do componente Vue. -->
<template>
  <section>
    <div class="page-heading mb-4">
      <div>
        <h1>Funcionários</h1>
        <p class="text-muted mb-0">
          Cadastre, consulte e edite os funcionários do Ponto Fácil.
        </p>
      </div>

      <router-link
        class="btn btn-primary"
        to="/employees/new"
      >
        Novo Funcionário
      </router-link>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="mb-4">
          <label
            for="search"
            class="form-label"
          >
            Buscar funcionário
          </label>

          <input
            id="search"
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Nome, CPF ou setor"
          >
        </div>

        <div
          v-if="isLoading"
          class="text-center py-4"
        >
          Carregando funcionários...
        </div>

        <div
          v-else-if="errorMessage"
          class="alert alert-danger"
        >
          {{ errorMessage }}
        </div>

        <div
          v-else-if="filteredEmployees.length === 0"
          class="text-center text-muted py-4"
        >
          Nenhum funcionário encontrado.
        </div>

        <div
          v-else
          class="table-responsive"
        >
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Setor</th>
                <th>Status</th>
                <th class="text-end">Ações</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="employee in filteredEmployees"
                :key="employee.id"
              >
                <td>
                  {{ employee.fullName }}
                </td>

                <td>
                  {{ formatCpf(employee.cpf) }}
                </td>

                <td>
                  {{ employee.department || '-' }}
                </td>

                <td>
                  <span
                    v-if="employee.isActive"
                    class="badge text-bg-success"
                  >
                    Ativo
                  </span>

                  <span
                    v-else
                    class="badge text-bg-secondary"
                  >
                    Inativo
                  </span>
                </td>

                <td class="text-end">
                  <router-link
                    class="btn btn-sm btn-outline-primary"
                    :to="`/employees/${employee.id}/edit`"
                  >
                    Editar
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<!--
GUIA LINHA A LINHA DO TEMPLATE
O template foi mantido sem comentários entre seus atributos para não alterar a sintaxe das tags Vue.
Linha original 57: <template>
  -> Inicia o template, seção que define a estrutura visual renderizada pelo componente Vue.
Linha original 58: <section>
  -> Inicia uma seção semântica que agrupa este conteúdo da página.
Linha original 59: <div class="page-heading mb-4">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 60: <div>
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 61: <h1>Funcionários</h1>
  -> Cria um título que organiza a hierarquia visual e semântica do conteúdo.
Linha original 62: <p class="text-muted mb-0">
  -> Cria um parágrafo de texto na interface.
Linha original 63: Cadastre, consulte e edite os funcionários do Ponto Fácil.
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 64: </p>
  -> Encerra o elemento p iniciado anteriormente.
Linha original 65: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 67: <router-link
  -> Cria um link de navegação controlado pelo Vue Router sem recarregar a página inteira.
Linha original 68: class="btn btn-primary"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 69: to="/employees/new"
  -> Define o destino de navegação do RouterLink.
Linha original 70: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 71: Novo Funcionário
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 72: </router-link>
  -> Encerra o elemento router-link iniciado anteriormente.
Linha original 73: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 75: <div class="card border-0 shadow-sm">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 76: <div class="card-body">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 77: <div class="mb-4">
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 78: <label
  -> Cria o rótulo associado a um campo, melhorando clareza e acessibilidade.
Linha original 79: for="search"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 80: class="form-label"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 81: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 82: Buscar funcionário
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 83: </label>
  -> Encerra o elemento label iniciado anteriormente.
Linha original 85: <input
  -> Cria um campo de entrada para receber ou exibir dados.
Linha original 86: id="search"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 87: v-model="search"
  -> Liga o campo a uma variável reativa, mantendo valor do input e estado do Vue sincronizados.
Linha original 88: type="text"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 89: class="form-control"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 90: placeholder="Nome, CPF ou setor"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 91: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 92: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 94: <div
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 95: v-if="isLoading"
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 96: class="text-center py-4"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 97: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 98: Carregando funcionários...
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 99: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 101: <div
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 102: v-else-if="errorMessage"
  -> Renderiza este elemento quando a condição anterior for falsa e esta for verdadeira.
Linha original 103: class="alert alert-danger"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 104: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 105: {{ errorMessage }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 106: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 108: <div
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 109: v-else-if="filteredEmployees.length === 0"
  -> Renderiza este elemento quando a condição anterior for falsa e esta for verdadeira.
Linha original 110: class="text-center text-muted py-4"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 111: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 112: Nenhum funcionário encontrado.
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 113: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 115: <div
  -> Cria um contêiner usado para agrupar e organizar elementos da interface.
Linha original 116: v-else
  -> Renderiza este elemento como alternativa quando a condição anterior não é atendida.
Linha original 117: class="table-responsive"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 118: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 119: <table class="table align-middle">
  -> Inicia uma tabela para apresentar dados em linhas e colunas.
Linha original 120: <thead>
  -> Inicia o cabeçalho da tabela, onde ficam os títulos das colunas.
Linha original 121: <tr>
  -> Inicia uma linha da tabela.
Linha original 122: <th>Nome</th>
  -> Cria uma célula de cabeçalho da tabela.
Linha original 123: <th>CPF</th>
  -> Cria uma célula de cabeçalho da tabela.
Linha original 124: <th>Setor</th>
  -> Cria uma célula de cabeçalho da tabela.
Linha original 125: <th>Status</th>
  -> Cria uma célula de cabeçalho da tabela.
Linha original 126: <th class="text-end">Ações</th>
  -> Cria uma célula de cabeçalho da tabela.
Linha original 127: </tr>
  -> Encerra o elemento tr iniciado anteriormente.
Linha original 128: </thead>
  -> Encerra o elemento thead iniciado anteriormente.
Linha original 130: <tbody>
  -> Inicia o corpo da tabela, onde ficam os registros listados.
Linha original 131: <tr
  -> Inicia uma linha da tabela.
Linha original 132: v-for="employee in filteredEmployees"
  -> Repete este elemento para cada item da coleção indicada pelo v-for.
Linha original 133: :key="employee.id"
  -> Fornece uma chave única para o Vue acompanhar corretamente cada item de uma lista.
Linha original 134: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 135: <td>
  -> Cria uma célula de dados da tabela.
Linha original 136: {{ employee.fullName }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 137: </td>
  -> Encerra o elemento td iniciado anteriormente.
Linha original 139: <td>
  -> Cria uma célula de dados da tabela.
Linha original 140: {{ formatCpf(employee.cpf) }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 141: </td>
  -> Encerra o elemento td iniciado anteriormente.
Linha original 143: <td>
  -> Cria uma célula de dados da tabela.
Linha original 144: {{ employee.department || '-' }}
  -> Exibe um valor ou expressão reativa na interface por meio da interpolação do Vue.
Linha original 145: </td>
  -> Encerra o elemento td iniciado anteriormente.
Linha original 147: <td>
  -> Cria uma célula de dados da tabela.
Linha original 148: <span
  -> Cria um elemento em linha usado para exibir ou estilizar um pequeno conteúdo.
Linha original 149: v-if="employee.isActive"
  -> Renderiza este elemento somente quando a condição do v-if for verdadeira.
Linha original 150: class="badge text-bg-success"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 151: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 152: Ativo
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 153: </span>
  -> Encerra o elemento span iniciado anteriormente.
Linha original 155: <span
  -> Cria um elemento em linha usado para exibir ou estilizar um pequeno conteúdo.
Linha original 156: v-else
  -> Renderiza este elemento como alternativa quando a condição anterior não é atendida.
Linha original 157: class="badge text-bg-secondary"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 158: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 159: Inativo
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 160: </span>
  -> Encerra o elemento span iniciado anteriormente.
Linha original 161: </td>
  -> Encerra o elemento td iniciado anteriormente.
Linha original 163: <td class="text-end">
  -> Cria uma célula de dados da tabela.
Linha original 164: <router-link
  -> Cria um link de navegação controlado pelo Vue Router sem recarregar a página inteira.
Linha original 165: class="btn btn-sm btn-outline-primary"
  -> Define um atributo ou diretiva do elemento cuja tag foi iniciada nas linhas anteriores.
Linha original 166: :to="`/employees/${employee.id}/edit`"
  -> Define o destino de navegação do RouterLink.
Linha original 167: >
  -> Finaliza a tag de abertura iniciada nas linhas anteriores.
Linha original 168: Editar
  -> Define texto ou parte da estrutura visual do template deste componente Vue.
Linha original 169: </router-link>
  -> Encerra o elemento router-link iniciado anteriormente.
Linha original 170: </td>
  -> Encerra o elemento td iniciado anteriormente.
Linha original 171: </tr>
  -> Encerra o elemento tr iniciado anteriormente.
Linha original 172: </tbody>
  -> Encerra o elemento tbody iniciado anteriormente.
Linha original 173: </table>
  -> Encerra o elemento table iniciado anteriormente.
Linha original 174: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 175: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 176: </div>
  -> Encerra o elemento div iniciado anteriormente.
Linha original 177: </section>
  -> Encerra o elemento section iniciado anteriormente.
Linha original 178: </template>
  -> Encerra o template do componente Vue.
-->
