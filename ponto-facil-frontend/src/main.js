// Linha original 1: Importa recursos de um módulo externo para serem usados neste arquivo.
import './assets/main.css'
// Linha original 2: Importa recursos de vue para serem usados neste arquivo.
import { createApp } from 'vue'
// Linha original 3: Importa recursos de pinia para serem usados neste arquivo.
import { createPinia } from 'pinia'
// Linha original 4: Importa recursos de ./App.vue para serem usados neste arquivo.
import App from './App.vue'
// Linha original 5: Importa recursos de ./router para serem usados neste arquivo.
import router from './router'

// Linha original 7: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
createApp(App)
  // Linha original 8: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
  .use(createPinia())
  // Linha original 9: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
  .use(router)
  // Linha original 10: Executa ou compõe esta parte da lógica JavaScript conforme o contexto das linhas ao redor.
  .mount('#app')
