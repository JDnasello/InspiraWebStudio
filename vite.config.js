import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';


export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Abre automáticamente el reporte en el navegador
    }),
    compression(),
  ],
  build: {
    target: 'esnext',  // Especifica el nivel de compatibilidad ECMAScript
    minify: 'terser',  // Usa Terser para minificar el código en lugar de esbuild
    terserOptions: {
      compress: {
        drop_console: true,  // Elimina los console.log en producción
      },
      output: {
        comments: false,  // Elimina los comentarios
      },
    },
    sourcemap: false,  // Desactiva los mapas de fuente para producción
    cssCodeSplit: true,  // Divide el CSS en archivos separados por cada entrada
  },
  resolve: {
    alias: {
      '@': '/src',  // Alias para facilitar las importaciones
    },
  },
  server: {
    host: '0.0.0.0',  // Permite el acceso desde todas las interfaces de red
    port: 5173,  // Puerto de desarrollo
    open: true,  // Abre automáticamente el navegador
    hmr: true,  // Habilita Hot Module Replacement
  },
  chunkSizeWarningLimit: 500,  // Divide chunks grandes
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom']  // Divide React en un chunk separado
      }
    }
  },
  assetsInclude: ['**/*.webp'],  // Asegura que los archivos .webp sean tratados como activos
});

