#!/usr/bin/env node
/**
 * Runs the Vite dev server behind `tailscale serve`, so the site can be opened
 * over HTTPS from any device on the tailnet (phone included) from anywhere.
 *
 * Port 8443 is used instead of 443 to leave any existing `tailscale serve`
 * mapping on 443 untouched.
 *
 *   npm run dev:remote
 */
import { execFileSync, spawn } from "node:child_process";
import { createServer } from "node:net";

const VITE_PORT = Number(process.env.PORT ?? 5173);
const HTTPS_PORT = Number(process.env.HTTPS_PORT ?? 8443);

const run = (args, options = {}) =>
  execFileSync("tailscale", args, { encoding: "utf8", ...options });

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

/** Reads this machine's MagicDNS name, verifying the daemon is reachable. */
function getTailscaleHost() {
  let status;
  try {
    status = JSON.parse(run(["status", "--json"], { stdio: ["ignore", "pipe", "ignore"] }));
  } catch {
    fail(
      "Could not talk to Tailscale. Make sure it is installed and running:\n" +
        "  brew install tailscale && tailscale up",
    );
  }

  if (status.BackendState !== "Running") {
    fail(`Tailscale is not connected (state: ${status.BackendState}). Run: tailscale up`);
  }

  const dnsName = status.Self?.DNSName?.replace(/\.$/, "");
  if (!dnsName) fail("Tailscale did not report a MagicDNS name for this machine.");

  return dnsName;
}

/** Vite runs with --strictPort, so bail out before touching the tailnet config. */
function assertPortIsFree(port) {
  return new Promise((resolve) => {
    const probe = createServer()
      .once("error", (error) => {
        if (error.code === "EADDRINUSE") {
          fail(
            `Port ${port} is already in use — another dev server is probably running.\n` +
              `Stop it, or pick another port:  PORT=5174 npm run dev:remote`,
          );
        }
        resolve();
      })
      .once("listening", () => probe.close(resolve))
      .listen(port, "127.0.0.1");
  });
}

const host = getTailscaleHost();
await assertPortIsFree(VITE_PORT);
const url = `https://${host}:${HTTPS_PORT}`;

// Route tailnet HTTPS traffic to the local Vite server.
try {
  run(["serve", "--bg", `--https=${HTTPS_PORT}`, `http://127.0.0.1:${VITE_PORT}`], {
    stdio: ["ignore", "ignore", "inherit"],
  });
} catch {
  fail(
    `Failed to start "tailscale serve" on port ${HTTPS_PORT}.\n` +
      "If HTTPS certificates are disabled for your tailnet, enable them in the admin console.",
  );
}

let cleanedUp = false;
function stopServe() {
  if (cleanedUp) return;
  cleanedUp = true;
  try {
    run(["serve", `--https=${HTTPS_PORT}`, "off"], { stdio: "ignore" });
  } catch {
    console.error(
      `\n⚠ Could not remove the serve mapping. Clean it up with:\n` +
        `  tailscale serve --https=${HTTPS_PORT} off\n`,
    );
  }
}

console.log(`\n  ➜  Tailnet:  ${url}\n`);

const vite = spawn(
  "npx",
  ["vite", "--port", String(VITE_PORT), "--strictPort"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      TAILSCALE_HOST: host,
      TAILSCALE_HTTPS_PORT: String(HTTPS_PORT),
    },
  },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    vite.kill(signal);
  });
}

vite.on("exit", (code) => {
  stopServe();
  process.exit(code ?? 0);
});
