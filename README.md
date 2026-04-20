# imagine-skill

AI agent skills for [vofy-cli](https://github.com/WhiteTowerAI/Vofy) — a CLI for the Vofy media generation platform.

Give your AI coding agent (Claude Code, Codex, OpenCode, Cursor) the ability to generate images and videos using 21+ models through vofy-cli.

## Quick Install

### Install vofy-cli

```bash
npm install -g vofy-cli@0.1.1
```

### Load this repo with `npx skills`

```bash
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent codex -y
```

List the available skills first:

```bash
npx -y skills add WhiteTowerAI/imagine-skill --list
```

Examples for other agents:

```bash
# Claude Code
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent claude-code -y

# Cursor
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent cursor -y

# OpenCode
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent opencode -y
```

During local development, you can test the same flow against the current checkout:

```bash
npx -y skills add . --list
```

### Standalone installer (optional)

If you want a repo-local installer instead of the shared `skills` ecosystem CLI:

```bash
npx -y imagine-skill
```

### One-line install (git + shell)

```bash
curl -fsSL https://raw.githubusercontent.com/WhiteTowerAI/imagine-skill/main/install.sh | bash
```

### AI agent install

Add this to your AI tool's config (CLAUDE.md, AGENTS.md, etc.):

```
Fetch and follow instructions from https://raw.githubusercontent.com/WhiteTowerAI/imagine-skill/main/INSTALL.md
```

### Manual install

See tool-specific instructions below.

## Supported AI Tools

### Claude Code

```bash
# Copy skills to your project
cp -r skills/ .claude/skills/

# Or to global config
cp -r skills/ ~/.claude/skills/
```

### Codex

```bash
# Copy the pre-built AGENTS.md adapter
cp adapters/codex/AGENTS.md ~/.codex/AGENTS.md

# Or append to existing
cat adapters/codex/AGENTS.md >> ~/.codex/AGENTS.md
```

### Cursor

```bash
# Copy the .mdc rule file
mkdir -p .cursor/rules
cp adapters/cursor/imagine.mdc .cursor/rules/
```

### OpenCode

OpenCode reads `.claude/skills/` natively. Use the Claude Code install method.

## `skills` CLI Compatibility

This repository is compatible with the public [`skills`](https://github.com/vercel-labs/skills) CLI.

- Source listing works: `npx -y skills add WhiteTowerAI/imagine-skill --list`
- Skill install works: `npx -y skills add WhiteTowerAI/imagine-skill --skill imagine --agent codex -y`
- Local development works: `npx -y skills add . --list`

## What's Included

| Skill | Purpose |
|-------|---------|
| `imagine` | CLI overview, command quick-reference, getting started |
| `imagine-create` | Media creation workflow — from prompt to downloaded result |
| `imagine-models` | Model selection guide + detailed capability reference |
| `imagine-tasks` | Task listing, detail view, result download |

## Prerequisites

- [vofy-cli](https://github.com/WhiteTowerAI/Vofy) installed with `npm install -g vofy-cli@0.1.1`
- Authenticated session (`vofy login`)

## License

MIT
