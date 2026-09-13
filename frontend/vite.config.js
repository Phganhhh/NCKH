import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// basicSsl: dev server chạy HTTPS để camera (getUserMedia) hoạt động
// trên điện thoại thật qua địa chỉ LAN.
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: "0.0.0.0",
    port: 5173
  }
});
