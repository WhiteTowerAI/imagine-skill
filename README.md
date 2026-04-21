<h1 align="center">
  Imagine-skill
</h1>

<p align="center">
  <strong> A Vofy-powered skill for agents to use image and video generation models reliably. </strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vofy-cli"><img src="https://img.shields.io/npm/v/vofy-cli?logo=npm&logoColor=white&color=CB3837" alt="npm version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/Codex-supported-10A37F" alt="Codex supported">
  <img src="https://img.shields.io/badge/Claude%20Code-supported-D97757" alt="Claude Code supported">
  <a href="https://discord.gg/AuggThwmXm"><img src="https://img.shields.io/badge/Discord-Join%20chat-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
</p>

<p align="center">
  <a href="https://www.vofy.art/">Website</a> &bull;
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="https://discord.gg/AuggThwmXm">Discord</a>
</p>

This repository gives agents (Claude Code, Codex, OpenCode, Cursor, OpenClaw...) a easy way to generate images and videos:
```
- Unified interface across models
- Fast access to 20+ latest models
- Agent-friendly CLI workflow
- Official and lower-cost provider options
```

---

## See it in action

<p align="center">
  <img
    src="./assets/image_8WfdbsWYGAAlcOHT-1.jpg"
    alt="Spider-Man climbing a skyscraper in Taipei"
    width="720"
  />
</p>

```
User    ❯ Use Grok Imagine to generate an image of Spider-Man 
           climbing a skyscraper in Taipei, 
           with an extremely realistic, cinematic look.

Agent   ❯ Generated with vofy using grok-imagine-image at 9:16, 2K.
           The result is saved at ./grok-imagine-spiderman-taipei/image_iohf7jePtbVywKJM-1.jpg
```

---

## Quick Start

### 1. Install vofy-cli

```bash
npm install -g vofy-cli@0.1.3
```

run `vofy login` to fully set up the vofy-cli.

### 2. Install Imagine-skill with `npx skills`

```bash
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' -y
```

Install for specific agents:

```bash
# Codex
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent codex -y

# Claude Code
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent claude-code -y

# Cursor
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent cursor -y

# OpenCode
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent opencode -y
```

### 3. Just use it

Now tell your AI: `/imagine create <what-you-want-to-generate>`

You can also use `/imagine` for quick reference, `imagine-models` for model guides, and `imagine-tasks` to track the history runs.

> [!NOTE]
> Also works with one-line shell install, manual install, and agent install. [See more installation options](INSTALL.md).

---

## What's Included

| Skill | Purpose |
|-------|---------|
| `imagine` | CLI overview, command quick-reference, getting started |
| `imagine-create` | Media creation workflow — from prompt to downloaded result |
| `imagine-models` | Model selection guide + detailed capability reference |
| `imagine-tasks` | Task listing, detail view, result download |

---

## Supported Models

Imagine-skill supports a growing set of image and video models across major providers.

Representative models:

| Provider | Image Models | Video Models |
| --- | --- | --- |
| Google | `gemini-3.1-flash-image-preview`, `gemini-3-pro-image-preview` | `veo-3.1`, `veo-3.1-fast`, `veo-3.1-lite` |
| OpenAI | `gpt-image-1.5` | `sora-2`, `sora-2-pro` |
| xAI | `grok-imagine-image`, `grok-imagine-image-pro` | `grok-imagine-video` |
| ByteDance | `seedream-4.5`, `seedream-5.0-lite` | `seedance-1.5-pro`, `seedance-2.0`, `seedance-2.0-fast` |
| Kling | - | `kling-2.6`, `kling-3.0`, `kling-motion-control`, `kling-3.0-motion-control` |

---

## Prerequisites

- [vofy-cli](https://github.com/WhiteTowerAI/Vofy) installed with `npm install -g vofy-cli@0.1.3`
- Authenticated session (`vofy login`)

---

## License

MIT
