import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ babelHelpers: 'bundled',
       extensions: ['.js', '.jsx', '.ts', '.tsx'],
       include: ['src/**/*'],
       presets: ['@babel/preset-env', '@babel/preset-react'], 
       plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
       })
  ]
});
