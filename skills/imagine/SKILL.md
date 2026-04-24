---
name: imagine
description: Vofy CLI overview and quick reference for AI agents using image or video generation. Use when the user asks what Imagine/Vofy can do, needs setup guidance, wants command syntax, or needs a safe non-interactive workflow before creating media.
---

# Vofy CLI Quick Reference

Use `vofy-cli` to create and manage AI-generated images and videos on Vofy.

## Fast Routing

- Need setup, syntax, or safe defaults: stay in this skill.
- Need to improve, rewrite, translate, or adapt a media prompt: load `imagine-prompt`.
- Need to generate, edit, animate, transform, extend, or download media: load `imagine-create`.
- Need model fit, limits, pricing, durations, ratios, or special flags: load `imagine-models`.
- Need prior jobs, status, URLs, or downloads: load `imagine-tasks`.
- Need exact CLI help text only: open `commands-reference.md`.

## Non-Interactive Agent Rules

- Verify setup with `vofy status`; do not run `vofy login` because it opens a browser.
- Add `--yes` to every `vofy image create` or `vofy video create` command.
- Add `--plain` to `vofy tasks` in agent workflows.
- Add `--download-to <dir>` when the user needs local files; otherwise return result URLs from sync output.
- Check `vofy models <name>` before using model-specific flags.

If `vofy` is missing, tell the user to run:

```bash
npm install -g vofy-cli@0.1.5
vofy login
```

## Commands

| Command | Purpose |
| --- | --- |
| `vofy status` | Check auth, plan, and credits |
| `vofy models [name]` | List models or inspect one model |
| `vofy image create` | Create image tasks |
| `vofy video create` | Create video tasks |
| `vofy tasks --plain` | List recent tasks without the TTY browser |
| `vofy task <id_or_prefix>` | Inspect, download, or print URLs for one task |
| `vofy billing [plan]` | View pricing or switch plans |

## Minimal Create Pattern

```bash
vofy status
vofy image create --model seedream-4.5 --prompt "a cinematic mountain sunrise" --yes --download-to ./output
```

For video:

```bash
vofy status
vofy video create --model veo-3.1 --prompt "a drone shot over a forest at sunrise" --duration 6 --yes --download-to ./output
```

Inspect models only when the request names a model-specific feature, strict limit, pricing concern, or a flag that may be unsupported.
