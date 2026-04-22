#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const cliRoot = resolveCliRoot(process.argv[2]);
const cliEntry = path.join(cliRoot, "packages", "vofy-cli", "src", "index.js");
const outputPath = path.join(__dirname, "..", "skills", "imagine", "commands-reference.md");

const sections = [
  { title: "vofy login", args: ["help", "login"] },
  { title: "vofy logout", args: ["help", "logout"] },
  { title: "vofy status", args: ["help", "status"] },
  { title: "vofy task", args: ["help", "task"] },
  { title: "vofy tasks", args: ["help", "tasks"] },
  { title: "vofy billing", args: ["help", "billing"] },
  { title: "vofy models", args: ["help", "models"] },
  { title: "vofy image create", args: ["help", "image", "create"] },
  { title: "vofy video create", args: ["help", "video", "create"] },
];

let markdown = "";
markdown += "# vofy-cli Command Reference\n\n";
markdown += "> Auto-generated from `packages/vofy-cli/src/index.js` help output.\n";
markdown += "> Do not edit by hand; regenerate with `node scripts/generate-command-docs.js /path/to/dev-feat-cli`.\n\n";

for (const section of sections) {
  const helpText = runHelp(cliEntry, cliRoot, section.args);
  markdown += `## ${section.title}\n\n`;
  markdown += "```text\n";
  markdown += `${helpText}\n`;
  markdown += "```\n\n";
}

markdown += "## Mode Detection Notes\n\n";
markdown += "- `vofy image create` infers `text_to_image`, `image_to_image`, and `inpainting` from the supplied image and mask inputs.\n";
markdown += "- `vofy video create` infers `text_to_video`, `image_to_video`, `interpolation`, and `reference_images` from the supplied inputs when they are unambiguous.\n";
markdown += "- `--video` by itself is ambiguous. Use `--mode video_to_video` or `--mode video_extension`.\n";
markdown += "- Mixing `--reference-image` with `--reference-video` or `--reference-audio` requires `--mode multimodal_reference`.\n";

if (process.argv.includes("--check")) {
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
  if (current !== markdown) {
    console.error(`DRIFT: ${outputPath} is out of date.`);
    console.error("Run without --check to regenerate.");
    process.exit(1);
  }
  console.log("Command docs are up to date.");
  process.exit(0);
}

fs.writeFileSync(outputPath, markdown);
console.log(`Generated command reference -> ${outputPath}`);

function resolveCliRoot(input) {
  if (!input) {
    console.error("Usage: node scripts/generate-command-docs.js <path-to-dev-feat-cli>");
    process.exit(1);
  }

  const root = path.resolve(input);
  const manifestPath = path.join(root, "packages", "vofy-cli", "src", "model-manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.error(`Could not find vofy CLI manifest at ${manifestPath}`);
    process.exit(1);
  }
  return root;
}

function runHelp(cliEntryPath, cwd, args) {
  const result = spawnSync("node", [cliEntryPath, ...args], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, NO_COLOR: "1" },
  });

  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    console.error(`Failed to read help for ${args.join(" ")}${detail ? `\n${detail}` : ""}`);
    process.exit(result.status || 1);
  }

  return stripAnsi((result.stdout || "").trimEnd());
}

function stripAnsi(value) {
  return value.replace(/\u001b\[[0-9;]*m/g, "");
}
