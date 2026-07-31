import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const tailscaleHost = process.env.TAILSCALE_HOST;

/**
 * iOS Safari ignores the `download` attribute and previews PDFs instead.
 * Production sets this header via vercel.json; this mirrors it in dev so the
 * behaviour can be verified on a real phone.
 */
const resumeDownloads: Record<string, string> = {
  "/resume.pdf": "Ageu-Menezes-Resume.pdf",
  "/resume-pt.pdf": "Ageu-Menezes-Curriculo.pdf",
};

const resumeDownloadHeader = {
  name: "resume-download-header",
  configureServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
    server.middlewares.use((req, res, next) => {
      const fileName = resumeDownloads[req.url?.split("?")[0] ?? ""];
      if (fileName) {
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
      }
      next();
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  plugins: [react(), resumeDownloadHeader],
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
