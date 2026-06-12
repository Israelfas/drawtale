import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api/anthropic": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/anthropic/, ""),
        headers: {
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
      },
    },
  },
});