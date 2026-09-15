// Linha original 1: Importa recursos de vue-router para serem usados neste arquivo.
import { createRouter, createWebHistory } from 'vue-router'
// Linha original 2: Importa recursos de ../stores/auth para serem usados neste arquivo.
import { useAuthStore } from '../stores/auth'

// Linha original 4: Declara a constante routes e atribui a ela o valor ou resultado desta expressão.
const routes = [
  // Linha original 5: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
  { path: '/', redirect: '/login' },

  // Linha original 7: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 8: Define o endereço usado para acessar esta rota no navegador.
    path: '/login',
    // Linha original 9: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'login',
    // Linha original 10: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/auth/LoginView.vue'),
    // Linha original 11: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { fullscreen: true },
  // Linha original 12: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
  // Linha original 13: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 14: Define o endereço usado para acessar esta rota no navegador.
    path: '/dashboard',
    // Linha original 15: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'dashboard',
    // Linha original 16: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/dashboard/DashboardView.vue'),
    // Linha original 17: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { requiresAuth: true },
  // Linha original 18: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
  // Linha original 19: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 20: Define o endereço usado para acessar esta rota no navegador.
    path: '/terminal',
    // Linha original 21: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'terminal',
    // Linha original 22: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/terminal/TerminalView.vue'),
    // Linha original 23: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { requiresAuth: true, fullscreen: true },
  // Linha original 24: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
  // Linha original 25: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 26: Define o endereço usado para acessar esta rota no navegador.
    path: '/employees',
    // Linha original 27: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'employees',
    // Linha original 28: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/employees/EmployeesView.vue'),
    // Linha original 29: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { requiresAuth: true },
  // Linha original 30: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
  // Linha original 31: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 32: Define o endereço usado para acessar esta rota no navegador.
    path: '/employees/new',
    // Linha original 33: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'employee-create',
    // Linha original 34: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/employees/EmployeeFormView.vue'),
    // Linha original 35: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { requiresAuth: true },
  // Linha original 36: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
  // Linha original 37: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 38: Define o endereço usado para acessar esta rota no navegador.
    path: '/employees/:id/edit',
    // Linha original 39: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'employee-edit',
    // Linha original 40: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/employees/EmployeeFormView.vue'),
    // Linha original 41: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { requiresAuth: true },
  // Linha original 42: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
  // Linha original 43: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 44: Define o endereço usado para acessar esta rota no navegador.
    path: '/time-records',
    // Linha original 45: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'time-records',
    // Linha original 46: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/records/TimeRecordsView.vue'),
    // Linha original 47: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { requiresAuth: true },
  // Linha original 48: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
  // Linha original 49: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 50: Define o endereço usado para acessar esta rota no navegador.
    path: '/validations',
    // Linha original 51: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'validations',
    // Linha original 52: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/validations/PendingValidationsView.vue'),
    // Linha original 53: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { requiresAuth: true },
  // Linha original 54: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },
  // Linha original 55: Abre um bloco, objeto, lista ou agrupamento iniciado pela estrutura ao redor.
  {
    // Linha original 56: Define o endereço usado para acessar esta rota no navegador.
    path: '/my-profile',
    // Linha original 57: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
    name: 'my-profile',
    // Linha original 58: Define qual componente Vue será carregado quando esta rota for acessada.
    component: () => import('../views/profile/MyProfileView.vue'),
    // Linha original 59: Define metadados da rota, como exigir autenticação ou usar layout em tela cheia.
    meta: { requiresAuth: true },
  // Linha original 60: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  },

  // Linha original 62: Define uma função arrow usada como callback ou expressão de processamento.
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
// Linha original 63: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
]

// Linha original 65: Declara a constante router e atribui a ela o valor ou resultado desta expressão.
const router = createRouter({
  // Linha original 66: Configura o modo de histórico usado pelo Vue Router para controlar as URLs.
  history: createWebHistory(),
  // Linha original 67: Entrega ao Vue Router a lista de rotas definida anteriormente.
  routes,
// Linha original 68: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 70: Define uma função arrow usada como callback ou expressão de processamento.
router.beforeEach((to) => {
  // Linha original 71: Acessa a store de autenticação e guarda em authStore para consultar ou alterar a sessão.
  const authStore = useAuthStore()

  // Linha original 73: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Linha original 74: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
    return {
      // Linha original 75: Define um nome interno para a rota, permitindo referenciá-la pelo Vue Router.
      name: 'login',
      // Linha original 76: Mantém a estrutura atual aberta e separa este item do próximo valor ou argumento.
      query: { redirect: to.fullPath },
    // Linha original 77: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
    }
  // Linha original 78: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }

  // Linha original 80: Inicia uma condição; o bloco seguinte executa somente se a expressão for verdadeira.
  if (to.name === 'login' && authStore.isAuthenticated) {
    // Linha original 81: Encerra a função retornando o valor ou objeto indicado para quem a chamou.
    return { name: 'dashboard' }
  // Linha original 82: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
  }
// Linha original 83: Fecha o bloco, objeto, lista ou chamada iniciado anteriormente.
})

// Linha original 85: Exporta este valor como padrão para que outro arquivo possa importá-lo.
export default router
