#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

const args = process.argv.slice(2);
const vofyPackage = "vofy-cli";
const fallbackVofyVersion = "0.1.7";

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding: "utf8",
    ...options,
  });
}

function updateVofyCli() {
  const localCheck = run("vofy", ["--version"]);

  if (localCheck.error || localCheck.status !== 0) {
    console.log("vofy-cli was not found on PATH.");
    console.log("Install it first with:");
    console.log(`  npm install -g ${vofyPackage}@${fallbackVofyVersion}`);
    console.log("");
    return;
  }

  console.log("Checking for vofy-cli updates...");
  const update = run("vofy", ["update"], { stdio: "inherit" });

  if (update.error || update.status !== 0) {
    console.log("Could not update vofy-cli automatically with `vofy update`.");
    console.log("Please run it manually, or reinstall vofy-cli if your installed version does not support updates.");
  }
  console.log("");
}

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

console.log("Imagine Skill uses the standard Agent Skills ecosystem.");
console.log("");

updateVofyCli();

console.log("Install all skills:");
console.log("  npx -y skills add WhiteTowerAI/imagine-skill --skill '*' -y");
console.log("");
console.log("For local development:");
console.log("  npx -y skills add . --skill '*' -y");
console.log("");
console.log("Add --agent <name> to target one tool. Verify access with: vofy status");
