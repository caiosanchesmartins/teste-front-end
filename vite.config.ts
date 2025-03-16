import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "slick-carousel/slick": path.resolve(__dirname, "node_modules/slick-carousel/slick"),
    },
  },
});
