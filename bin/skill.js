#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const installScript = path.join(rootDir, "install.sh");
const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help")) {
  console.log("Usage: skill [project-root]");
  console.log("");
  console.log("Install imagine-skill into the current project by default.");
  console.log("");
  console.log("Recommended shared ecosystem command:");
  console.log("  npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent codex -y");
  console.log("");
  console.log("Examples:");
  console.log("  npx -y imagine-skill");
  console.log("  npx -y -p imagine-skill skill");
  console.log("  npx -y imagine-skill /path/to/project");
  process.exit(0);
}

if (!fs.existsSync(installScript)) {
  console.error(`Could not find install script at ${installScript}`);
  process.exit(1);
}

const projectRoot = args[0] ? path.resolve(args[0]) : process.cwd();
const vofyCheck = spawnSync("vofy", ["--version"], { stdio: "ignore" });

console.log("imagine-skill npm installer");
console.log("===========================");
console.log(`Target project: ${projectRoot}`);
console.log("");
console.log("Tip: for the shared skills ecosystem, prefer:");
console.log("  npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent codex -y");
console.log("");

if (vofyCheck.error || vofyCheck.status !== 0) {
  console.log("vofy-cli was not found on PATH.");
  console.log("Install it first with:");
  console.log("  npm install -g vofy-cli@0.1.3");
  console.log("");
}

const result = spawnSync("bash", [installScript, projectRoot], {
  cwd: rootDir,
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

if (typeof result.status === "number" && result.status !== 0) {
  process.exit(result.status);
}

console.log("");
console.log("Next steps:");
console.log("  1. Ensure vofy-cli is installed: npm install -g vofy-cli@0.1.3");
console.log("  2. Authenticate once in a browser: vofy login");
console.log("  3. Verify access: vofy status");
