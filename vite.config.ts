import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Debug: log to verify key is loaded
  console.log(
    "API Key loaded:",
    env.VITE_FOOTBALL_DATA_API_KEY ? "Yes (hidden)" : "NO - MISSING!"
  );

  return {
    plugins: [react()],
    test: {
      enviroment: "jsdom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
    },
    server: {
      proxy: {
        "/api/football": {
          target: "https://api.football-data.org",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/football/, ""),
          headers: {
            "X-Auth-Token": env.VITE_FOOTBALL_DATA_API_KEY,
          },
        },
      },
    },
  };
});
