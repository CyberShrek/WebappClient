import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

export default defineConfig({
    plugins: [svelte({
            preprocess: sveltePreprocess()
        }
    )],
    root: 'src/debug',
    appType: 'mpa',
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                rewrite: (path) => path.replace(/^\/api/, '/debug/api'),
                changeOrigin: true
            },
            '/servicebank': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    }
})