import {defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [
        ["@swc-jotai/debug-label", {}],
        ["@swc-jotai/react-refresh", {}]
      ]
    }),   
  ],
  root: 'src',
  base: '/',
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  preview: {
    host: "0.0.0.0"
  },
  publicDir: './public',
  
})
