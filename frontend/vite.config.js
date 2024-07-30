import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_API_URL ?? 'http://localhost:3000'}`;

  return {
    plugins: [nodePolyfills(), react()],  
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
