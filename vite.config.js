import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

export default defineConfig({
    plugins: [svelte({
            preprocess: sveltePreprocess()
        }
    )],
    build: {
        outDir: '../webapp/WEB-RES', // ← твоя целевая директория
        // assetsDir: 'assets',     // подпапка для ресурсов
        emptyOutDir: true        // очищать перед сборкой
    },
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
})