<h1 align="center">Imagine Skill</h1>

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
  <a href="#quick-start">Install</a> &bull;
  <a href="#whats-included">Skills</a> &bull;
  <a href="https://discord.gg/AuggThwmXm">Discord</a>
</p>


This repository gives agents (Claude Code, Codex, OpenCode, Cursor, OpenClaw...) a easy way to generate images and videos.

## Why imagine-skill

- Works across agent environments including Codex, Claude Code, Cursor, OpenCode, and similar tools.
- Builds on `vofy-cli`, so agents can access 22 modern image and video models through one consistent workflow.
- Reduces common agent mistakes with clear rules for authentication, non-interactive commands, downloads, and task handling.
- Helps agents go from natural-language requests to real generated outputs with less setup and less guesswork.

---

## See it in action

<p align="center">
  <video
    src="https://github.com/user-attachments/assets/363bb325-29bb-449f-8e62-ac41d7572a73"
    width="720"
    controls
    muted
    playsinline
  >
    Your browser does not support the video tag.
  </video>
</p>

```text
User    ❯ Create a cinematic 6-second video of a paper airplane 
           flying through neon-lit streets in Tokyo at night, 
           use seedance 2.0

Agent   ❯ Generated with seedance-2.0 
           as a 6-second 16:9 720p text-to-video render.
           Local file: video_hMQpifnYS9yMTXzJ.mp4.
```

---

## Quick Start

### 1. Install vofy-cli

```bash
npm install -g vofy-cli@0.1.5
vofy login
```

remember to run `vofy login` to fully set up the vofy-cli.

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

You can also use `/imagine` for quick reference, `imagine-prompt` for prompt optimization, `imagine-models` for model guides, and `imagine-tasks` to track the history runs.

> [!NOTE]
> Also works with one-line shell install, manual install, and agent install. [See more installation options](INSTALL.md).

---

## How it works

`vofy-cli` is the execution layer. It talks to Vofy models, submits generation jobs, and returns files or result URLs.

`imagine-skill` is the agent layer. It teaches your AI agent when to use `vofy image create`, `vofy video create`, `vofy tasks --plain`, and other commands safely and consistently.

In practice, you install both:

1. Install `vofy-cli` so media generation commands are available.
2. Install `imagine-skill` for your AI tool so the agent knows the correct workflow.
3. Ask your agent for an image or video in natural language, and the skill guides the CLI usage behind the scenes.

---

## What's Included

| Skill | Purpose |
|-------|---------|
| `imagine` | CLI overview, command quick-reference, getting started |
| `imagine-create` | Media creation workflow — from prompt to downloaded result |
| `imagine-prompt` | Prompt optimization for model-ready image and video generation |
| `imagine-models` | Model selection guide + detailed capability reference |
| `imagine-tasks` | Task listing, detail view, result download |

---

## Supported Models

Imagine-skill supports a growing set of image and video models across major providers.

Representative models:

| Provider | Image Models | Video Models |
| --- | --- | --- |
| Google | `gemini-3.1-flash-image-preview`, `gemini-3-pro-image-preview` | `veo-3.1`, `veo-3.1-fast`, `veo-3.1-lite` |
| OpenAI | `gpt-image-2`, `gpt-image-1.5` | `sora-2`, `sora-2-pro` |
| xAI | `grok-imagine-image`, `grok-imagine-image-pro` | `grok-imagine-video` |
| ByteDance | `seedream-4.5`, `seedream-5.0-lite` | `seedance-1.5-pro`, `seedance-2.0`, `seedance-2.0-fast` |
| Kling | - | `kling-2.6`, `kling-3.0`, `kling-2.6-motion-control`, `kling-3.0-motion-control` |

> [!NOTE]
> All models available on [Vofy](https://www.vofy.art/) can be accessed through imagine-skill, and pricing is currently the same as on the Vofy website.


---

## License

MIT
