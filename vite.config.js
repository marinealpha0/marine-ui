import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/Hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@constants': path.resolve(__dirname, './src/constant'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@store': path.resolve(__dirname, './src/store'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@guards': path.resolve(__dirname, './src/guards'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
