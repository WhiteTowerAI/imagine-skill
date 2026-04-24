#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help")) {
  console.log("Usage: skill");
  console.log("");
  console.log("Print standard Agent Skills installation commands for Imagine Skill.");
  console.log("");
  console.log("Recommended command:");
  console.log("  npx -y skills add WhiteTowerAI/imagine-skill --skill '*' -y");
  console.log("");
  console.log("Examples:");
  console.log("  npx -y imagine-skill");
  console.log("  npx -y -p imagine-skill skill");
  process.exit(0);
}

const vofyCheck = spawnSync("vofy", ["--version"], { stdio: "ignore" });

console.log("Imagine Skill uses the standard Agent Skills ecosystem.");
console.log("");

if (vofyCheck.error || vofyCheck.status !== 0) {
  console.log("vofy-cli was not found on PATH.");
  console.log("Install it first with:");
  console.log("  npm install -g vofy-cli@0.1.5");
  console.log("");
}

console.log("Install all skills:");
console.log("  npx -y skills add WhiteTowerAI/imagine-skill --skill '*' -y");
console.log("");
console.log("For local development:");
console.log("  npx -y skills add . --skill '*' -y");
console.log("");
console.log("Add --agent <name> to target one tool. Verify access with: vofy status");
