import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  root: 'src/frontend',
  publicDir: 'src/frontend/public',
  plugins: [reactRefresh()],
  logLevel: 'info',
  server: {
    middlewareMode: true
  }
})
