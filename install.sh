#!/usr/bin/env bash
set -euo pipefail

cat <<'MSG'
Imagine Skill now follows the standard Agent Skills ecosystem layout.

Install with:
  npx -y skills add WhiteTowerAI/imagine-skill --skill '*' -y

Target one tool by adding --agent <name>.

For local development:
  npx -y skills add . --skill '*' -y

Prerequisites:
  npm install -g vofy-cli@0.1.5
  vofy login
MSG
