import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const tailscaleHost = process.env.TAILSCALE_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
    // When served through `tailscale serve` (npm run dev:remote), the browser
    // reaches the site over HTTPS, so the HMR socket must point at the tailnet
    // host instead of the default ws://localhost.
    ...(tailscaleHost && {
      hmr: {
        protocol: "wss",
        host: tailscaleHost,
        clientPort: Number(process.env.TAILSCALE_HTTPS_PORT ?? 443),
      },
    }),
  }
});
