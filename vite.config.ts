import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [react(), visualizer({ open: true, gzipSize: true })],
  esbuild: {
    treeShaking: true,
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      treeshake: true,
      output: {
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const names = assetInfo.names;
          const primary = names && names[0] ? names[0] : "";
          if (primary.endsWith(".css")) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("ag-grid")) return "vendor-ag-grid";
            if (id.includes("tanstack")) return "vendor-tanstack";
            if (id.includes("refine")) return "vendor-refine";
            if (id.includes("hookform")) return "vendor-hookform";
            return "vendor";
          }
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
