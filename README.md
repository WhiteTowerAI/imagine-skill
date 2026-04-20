# imagine-skill

AI agent skills for [vofy-cli](https://github.com/WhiteTowerAI/Vofy) — a CLI for the Vofy media generation platform.

Give your AI coding agent (Claude Code, Codex, OpenCode, Cursor) the ability to generate images and videos using 21+ models through vofy-cli.

## Quick Install

### One-line install (auto-detects your AI tools)

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

## What's Included

| Skill | Purpose |
|-------|---------|
| `imagine` | CLI overview, command quick-reference, getting started |
| `imagine-create` | Media creation workflow — from prompt to downloaded result |
| `imagine-models` | Model selection guide + detailed capability reference |
| `imagine-tasks` | Task listing, detail view, result download |

## Prerequisites

- [vofy-cli](https://github.com/WhiteTowerAI/Vofy) installed and on PATH
- Authenticated session (`vofy login`)

## License

MIT
