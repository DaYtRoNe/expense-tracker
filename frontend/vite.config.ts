import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  // server: {
  //   host: '0.0.0.0', // Allows external connections
  //   port: 5173, // Default port
  //   strictPort: true, // Don't try other ports if 5173 is busy
  // }
})
