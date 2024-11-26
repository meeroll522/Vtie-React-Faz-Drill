import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // This proxies requests starting with '/api' to the Node.js backend
            '/api': {
                target: 'http://localhost:5000',  // Your backend server
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),  // Remove '/api' prefix when forwarding
            },
        },
    },
});
