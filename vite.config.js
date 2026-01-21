import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const config = ({ mode }) => {
  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
        },
      }),
    ],
    base: "",
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    build: {
      outDir: "build",
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("firebase")) {
                return "firebase";
              }
              if (id.includes("react-dom") || id.includes("react-dom/client")) {
                return "react-dom";
              }
              if (id.includes("react")) {
                return "react-core";
              }
              if (id.includes("redux") || id.includes("react-redux")) {
                return "redux";
              }
              if (id.includes("@fortawesome")) {
                return "icons";
              }
              return "vendor";
            }
          },
        },
      },
    },
  });
};

export default config;
