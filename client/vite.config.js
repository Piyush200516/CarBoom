import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
        proxy: {
            // Forward all /api/v1 requests to the Express backend in development.
            // This avoids CORS issues and ensures the correct route prefix is used.
            "/api/v1": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
