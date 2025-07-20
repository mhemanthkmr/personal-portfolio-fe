import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/personal-portfolio-fe/', // 👈 set base to repo name with slashes
  plugins: [react()],
});
