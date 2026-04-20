---
name: imagine
description: vofy-cli overview and command quick-reference for AI agents to generate images and videos
---

# vofy-cli — AI Media Generation CLI

vofy-cli is a command-line tool for the Vofy media generation platform. It supports 21 models across image generation (text-to-image, image-to-image, inpainting) and video generation (text-to-video, image-to-video, interpolation, motion control, and more).

## Prerequisites

1. Install vofy-cli with `npm install -g vofy-cli@0.1.1`
2. User must be authenticated: `vofy login`
3. Verify with: `vofy status`

## AI Agent Rules

When using vofy-cli as an AI agent, always:

- Use `--yes` flag on create commands to skip interactive route picker
- Use `--plain` flag on `vofy tasks` to avoid interactive browser
- Use `--download-to <path>` to save results to a known location
- Never run `vofy login` — it requires a browser. If auth fails, tell the user to run it manually.

## Command Quick Reference

| Command | Purpose |
|---------|---------|
| `vofy status` | Show account summary, credits balance, plan |
| `vofy image create` | Create an image generation task |
| `vofy video create` | Create a video generation task |
| `vofy task <id>` | Show task detail, download results |
| `vofy tasks --plain` | List recent tasks in plain text |
| `vofy models` | List all available models |
| `vofy models <name>` | Show detailed model capabilities |
| `vofy billing` | Manage subscription plan |

## Typical Workflow

```bash
# 1. Check auth and credits
vofy status

# 2. Find the right model
vofy models --type image    # or --type video

# 3. Create media
vofy image create --model seedream-4.5 --prompt "a sunset over mountains" --yes --download-to ./output

# 4. Check task status if needed
vofy tasks --plain --type image
vofy task <task_id> --download-to ./output
```

## Related Skills

- **imagine-create**: Detailed media creation workflow with mode selection and flag guidance
- **imagine-models**: Model selection guide and detailed capability reference
- **imagine-tasks**: Task management — listing, detail view, downloading results

## Full Command Reference

See [commands-reference.md](commands-reference.md) for complete flag documentation for every command.
