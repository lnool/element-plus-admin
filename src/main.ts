import { createApp } from 'vue'
import router, { setupRoutes } from './router'
import store from './store'
import { globalPlugin } from './plugin'

import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  // 加载路由
  setupRoutes()

  app.use(store).use(router).use(globalPlugin).mount('#app')
}

void bootstrap()
