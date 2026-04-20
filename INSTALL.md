# Installing imagine-skill

These instructions are for AI agents. Follow them step by step.

## Prerequisites

- `vofy` CLI must be installed and on PATH
- User must have run `vofy login` to authenticate

## Step 1: Detect your AI tool

Check which AI tools are configured in the current environment:

```bash
# Check for Claude Code
ls -d .claude 2>/dev/null || ls -d ~/.claude 2>/dev/null

# Check for Codex
ls -d ~/.codex 2>/dev/null

# Check for Cursor
ls -d .cursor 2>/dev/null

# Check for OpenCode
ls -d .opencode 2>/dev/null
```

## Step 2: Clone the skill repository

```bash
git clone https://github.com/WhiteTowerAI/imagine-skill.git /tmp/imagine-skill
```

## Step 3: Install skills for your tool

### For Claude Code or OpenCode

```bash
mkdir -p .claude/skills
cp -r /tmp/imagine-skill/skills/* .claude/skills/
```

### For Codex

```bash
mkdir -p ~/.codex
# If AGENTS.md exists, append; otherwise copy
if [ -f ~/.codex/AGENTS.md ]; then
  echo "" >> ~/.codex/AGENTS.md
  cat /tmp/imagine-skill/adapters/codex/AGENTS.md >> ~/.codex/AGENTS.md
else
  cp /tmp/imagine-skill/adapters/codex/AGENTS.md ~/.codex/AGENTS.md
fi
```

### For Cursor

```bash
mkdir -p .cursor/rules
cp /tmp/imagine-skill/adapters/cursor/imagine.mdc .cursor/rules/
```

## Step 4: Verify

Run `vofy --version` to confirm vofy-cli is available, then run `vofy status` to confirm authentication.

## Step 5: Clean up

```bash
rm -rf /tmp/imagine-skill
```

## Done

The imagine skills are now installed. You can use vofy-cli to generate images and videos.
