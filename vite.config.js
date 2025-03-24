import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/admin/",  // 👈 Ensure this is set if your app starts from /admin
  server: {
    port: 5174, // Ya jo bhi port use kar rahe ho
  },
});
