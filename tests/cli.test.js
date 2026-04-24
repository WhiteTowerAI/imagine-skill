const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

test("skill CLI prints help", () => {
  const cliPath = path.join(__dirname, "..", "bin", "skill.js");
  const result = spawnSync(process.execPath, [cliPath, "--help"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: skill/);
  assert.match(result.stdout, /npx -y skills add WhiteTowerAI\/imagine-skill/);
});
