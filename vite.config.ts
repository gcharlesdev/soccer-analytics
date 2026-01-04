import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { env } from "process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/football": {
        target: "https://api.football-data.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/football/, ""),
        headers: {
          "X-Auth-Token": env.VITE_FOOTBALL_DATA_API_KEY ?? "",
        },
      },
    },
  },
});
