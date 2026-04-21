# Vofy CLI — AI Agent Instructions

> This file gives Codex (and compatible agents) the knowledge to use vofy-cli for image and video generation.

## What is vofy-cli?

A command-line tool for the Vofy media generation platform. It supports 21 models across image generation (text-to-image, image-to-image, inpainting) and video generation (text-to-video, image-to-video, interpolation, motion control, and more).

## Prerequisites

- Install vofy-cli with `npm install -g vofy-cli@0.1.3`
- User authenticated via `vofy login` (never run this yourself — it needs a browser)
- Verify with `vofy status`

## Critical Rules

1. Always use `--yes` on create commands — skips interactive route picker
2. Always use `--plain` on `vofy tasks` — avoids the interactive task browser in TTY sessions
3. Use `--download-to <path>` when you need local files; otherwise the default sync output already shows result URLs
4. Never run `vofy login` — tell the user to do it manually if auth fails

## Commands

| Command | Purpose |
|---------|---------|
| `vofy status` | Check auth and credits |
| `vofy image create` | Create image |
| `vofy video create` | Create video |
| `vofy task <id_or_prefix>` | Task detail / URLs / download |
| `vofy tasks --plain` | List tasks |
| `vofy models` | List models |
| `vofy models <name>` | Model capabilities |
| `vofy billing` | Open pricing or switch plans |

## Image Creation

```bash
vofy image create \
  --model <model> \
  --prompt "<prompt>" \
  --aspect-ratio <ratio> \
  --resolution <resolution> \
  --yes --download-to ./output
```

Image modes: `text_to_image` (default), `image_to_image` (add `--image <path>`), `inpainting` (add `--image <path> --mask <path>`)

Top image models:
- `seedream-4.5` — general purpose, up to 4K, 8 aspect ratios
- `gpt-image-1.5` — transparent backgrounds (`--background transparent`), inpainting
- `seedream-5.0-lite` — web search support, up to 3K

## Video Creation

```bash
vofy video create \
  --model <model> \
  --prompt "<prompt>" \
  --duration <seconds> \
  --aspect-ratio <ratio> \
  --yes --download-to ./output
```

Video modes:
- `text_to_video` — from text prompt
- `image_to_video` — animate image (`--first-frame <path>`)
- `interpolation` — morph between frames (`--first-frame` + `--last-frame`)
- `reference_images` — style reference (`--reference-image <path>`)
- `multimodal_reference` — mixed image/video/audio references (`--mode multimodal_reference --reference-image <path> --reference-video <path>`)
- `video_to_video` — transform video (`--mode video_to_video --video <path>`)
- `video_extension` — extend video (`--mode video_extension --video <path>`)
- `motion_control` — trajectory control (model-specific)

Top video models:
- `veo-3.1` — highest quality, up to 4K, 4-8s
- `kling-3.0` — long videos up to 15s, audio, multi-shot
- `seedance-2.0` — most versatile, 7 modes, audio, web search

Task tips:
- `vofy tasks` opens an interactive browser in a TTY unless you pass `--plain`
- `vofy task` accepts a unique task id prefix
- `vofy task <id_or_prefix> --result-url` prints generated resource URLs

Billing tips:
- `vofy billing` opens an interactive picker in a TTY
- `vofy billing starter|pro|max` or `vofy billing --plan <plan>` skips the picker

## Error Handling

| Error | Action |
|-------|--------|
| Not authenticated | Tell user to run `vofy login` |
| Insufficient credits | Tell user to check `vofy billing` |
| Model not found | Run `vofy models` to list available |
| Invalid parameter | Check `vofy models <name>` for constraints |
