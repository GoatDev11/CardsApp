import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  envDir: resolve(__dirname, 'src'), // Especifica el directorio donde se encuentran tus archivos .env
});
