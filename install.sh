#!/usr/bin/env bash
set -euo pipefail

VOFY_PACKAGE="vofy-cli"
FALLBACK_VOFY_VERSION="0.1.7"

update_vofy_cli() {
  if ! command -v vofy >/dev/null 2>&1; then
    cat <<MSG
vofy-cli was not found on PATH.
Install it first with:
  npm install -g ${VOFY_PACKAGE}@${FALLBACK_VOFY_VERSION}

MSG
    return
  fi

  echo "Checking for vofy-cli updates..."

  if ! vofy update; then
    cat <<'MSG'
Could not update vofy-cli automatically with `vofy update`.
Please run it manually, or reinstall vofy-cli if your installed version does not support updates.

MSG
    return
  fi

  echo
}

update_vofy_cli

cat <<'MSG'
Imagine Skill now follows the standard Agent Skills ecosystem layout.

Install with:
  npx -y skills add WhiteTowerAI/imagine-skill --skill '*' -y

Target one tool by adding --agent <name>.

For local development:
  npx -y skills add . --skill '*' -y

Prerequisites:
  npm install -g vofy-cli@0.1.7
  vofy login
MSG
