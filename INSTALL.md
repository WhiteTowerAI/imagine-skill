# Installing imagine-skill

These instructions are for AI agents. Follow them step by step.

## Prerequisites

- Install `vofy-cli` first: `npm install -g vofy-cli@0.1.1`
- User must have run `vofy login` to authenticate

## Fast path: install with `npx skills`

```bash
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent codex -y
```

List the skills before installing:

```bash
npx -y skills add WhiteTowerAI/imagine-skill --list
```

Examples for other agents:

```bash
# Claude Code
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent claude-code -y

# Cursor
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent cursor -y
```

For local development, the same CLI can load the current checkout directly:

```bash
npx -y skills add . --list
```

## Alternative fast path: standalone installer

```bash
npx -y imagine-skill
```

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

Run `vofy --version` to confirm `npm install -g vofy-cli@0.1.1` succeeded, then run `vofy status` to confirm authentication.

## Step 5: Clean up

```bash
rm -rf /tmp/imagine-skill
```

## Done

The imagine skills are now installed. You can use vofy-cli to generate images and videos.
