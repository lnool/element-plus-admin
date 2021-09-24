import { App } from 'vue'
import registerProperties from './register-properties'

export function globalPlugin(app: App): void {
  app.use(registerProperties)
}
