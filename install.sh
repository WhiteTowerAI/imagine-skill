#!/usr/bin/env bash
set -euo pipefail

# imagine-skill installer
# Detects installed AI tools and copies the appropriate skill files.

REPO_URL="${IMAGINE_SKILL_REPO:-https://github.com/WhiteTowerAI/imagine-skill.git}"

if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
else
  CLONE_DIR="$(mktemp -d)"
  trap 'rm -rf "$CLONE_DIR"' EXIT
  echo "Cloning imagine-skill to $CLONE_DIR ..."
  git clone --depth 1 "$REPO_URL" "$CLONE_DIR"
  SCRIPT_DIR="$CLONE_DIR"
fi

SKILLS_SRC="$SCRIPT_DIR/skills"
ADAPTERS_SRC="$SCRIPT_DIR/adapters"

installed=()

echo "imagine-skill installer"
echo "======================="
echo ""

# --- Claude Code / OpenCode ---
# Both use .claude/skills/ in the project root
install_claude_skills() {
  local target="$1/.claude/skills"
  mkdir -p "$target"
  cp -r "$SKILLS_SRC"/imagine "$target/"
  cp -r "$SKILLS_SRC"/imagine-create "$target/"
  cp -r "$SKILLS_SRC"/imagine-models "$target/"
  cp -r "$SKILLS_SRC"/imagine-tasks "$target/"
}

# --- Codex ---
install_codex() {
  local codex_dir="$HOME/.codex"
  local agents_file="$codex_dir/AGENTS.md"
  local src="$ADAPTERS_SRC/codex/AGENTS.md"

  mkdir -p "$codex_dir"

  if [ -f "$agents_file" ]; then
    echo ""
    echo "  Found existing AGENTS.md at $agents_file"
    echo "  Appending vofy-cli instructions..."
    echo "" >> "$agents_file"
    echo "---" >> "$agents_file"
    echo "" >> "$agents_file"
    cat "$src" >> "$agents_file"
  else
    cp "$src" "$agents_file"
  fi
}

# --- Cursor ---
install_cursor() {
  local target="$1/.cursor/rules"
  mkdir -p "$target"
  cp "$ADAPTERS_SRC/cursor/imagine.mdc" "$target/"
}

# --- Detect project root ---
if [ -n "${1:-}" ]; then
  PROJECT_ROOT="$1"
else
  PROJECT_ROOT="$(pwd)"
fi

if [ ! -d "$PROJECT_ROOT" ]; then
  echo "Error: $PROJECT_ROOT is not a directory"
  exit 1
fi

echo "Project root: $PROJECT_ROOT"
echo ""

if ! command -v vofy &>/dev/null; then
  echo "[!] vofy-cli is not installed yet"
  echo "    Run: npm install -g vofy-cli@0.1.3"
  echo ""
fi

# --- Detect tools and install ---

# Claude Code
if command -v claude &>/dev/null || [ -d "$PROJECT_ROOT/.claude" ]; then
  echo "[+] Claude Code detected"
  install_claude_skills "$PROJECT_ROOT"
  installed+=("claude-code")
fi

# OpenCode (uses same .claude/skills/ format)
if command -v opencode &>/dev/null; then
  echo "[+] OpenCode detected"
  if [[ ! " ${installed[*]:-} " =~ " claude-code " ]]; then
    install_claude_skills "$PROJECT_ROOT"
  fi
  installed+=("opencode")
fi

# Codex
if command -v codex &>/dev/null; then
  echo "[+] Codex detected"
  install_codex
  installed+=("codex")
fi

# Cursor
if [ -d "$PROJECT_ROOT/.cursor" ] || [ -d "$HOME/.cursor" ]; then
  echo "[+] Cursor detected"
  install_cursor "$PROJECT_ROOT"
  installed+=("cursor")
fi

# --- Summary ---
echo ""
if [ ${#installed[@]} -eq 0 ]; then
  echo "No AI tools detected. You can install manually:"
  echo ""
  echo "  Claude Code / OpenCode:"
  echo "    cp -r skills/* <project>/.claude/skills/"
  echo ""
  echo "  Codex:"
  echo "    cp adapters/codex/AGENTS.md ~/.codex/AGENTS.md"
  echo ""
  echo "  Cursor:"
  echo "    cp adapters/cursor/imagine.mdc <project>/.cursor/rules/"
  echo ""
  exit 1
fi

echo "Installed for: ${installed[*]}"
echo "Done. Your AI agent can now use vofy-cli."
echo "If vofy is missing, install it with: npm install -g vofy-cli@0.1.3"
