import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your Express backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

// Step 1: Set Up Proxy (Avoid CORS Issues)
// proxy API requests to your backend.
// This lets you call /api/tasks from React, and Vite will forward it to 
// http://localhost:5000/api/tasks.