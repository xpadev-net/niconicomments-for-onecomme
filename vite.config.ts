import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve:{
    alias: {
      "@/": `${__dirname}/src/`,
    },
  },
  base:""
})
