import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

//I am using fs.readFileSync('path') to load my .key & .crt files from my .config/valet/Certificates directory
const fs = require('fs')

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
    server: {
        https: {
            key: '',
            cert: ''
        },
        host: '127.0.0.1',
        hmr: {
            host: 'three.test',
        }
    }
});
