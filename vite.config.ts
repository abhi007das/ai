import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This alias is crucial for recharts compatibility with Vite/React 19
      'react-is': path.resolve(__dirname, 'node_modules/react-is/index.js'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Including 'recharts' and 'react-is' helps Vite pre-bundle them correctly.
    include: ['recharts', 'react-is'],
  },
});
