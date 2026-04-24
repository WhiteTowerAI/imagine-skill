---
name: imagine-create
description: Create, edit, animate, transform, or extend images and videos with vofy-cli. Use when the user asks for text-to-image, image editing, inpainting, text-to-video, image-to-video, interpolation, reference-based video, video-to-video, video extension, or local media output.
---

# Create Media With Vofy CLI

Deliver generated media with a deterministic, non-interactive workflow.

## Workflow

1. Run `vofy status`; if auth fails, tell the user to run `vofy login`.
2. Identify output type, source assets, aspect ratio, duration, resolution, and whether local files are required.
3. Load `imagine-prompt` when the user gives a rough idea, asks for prompt improvement, or model-specific wording matters.
4. Choose the simplest matching mode from the tables below.
5. Pick a default model unless the user named one; load `imagine-models` only for strict limits, price, or special flags.
6. Build one non-interactive command with `--yes` and, when local output is useful, `--download-to ./output`.
7. Return file paths or resource URLs; for async jobs, return the task id and next check command.

If `vofy` is missing, stop and ask the user to install `vofy-cli@0.1.7` and authenticate once.

## Default Model Shortcuts

| Need | Default |
| --- | --- |
| General image | `seedream-4.5` |
| Image editing or transparent assets | `gpt-image-1.5` |
| Premium text-to-video | `veo-3.1` |
| Fast video draft | `veo-3.1-fast` |
| Animate an image | `kling-3.0` |
| Transform or extend video | `seedance-2.0` |

Check `vofy models <model>` before adding optional flags such as `--audio`, `--background`, `--web-search`, `--multi-shot`, or motion-control settings.

## Image Modes

| Intent | Mode | Required flags |
| --- | --- | --- |
| Text prompt | `text_to_image` | `--prompt` |
| Transform image | `image_to_image` | `--prompt --image <path>` |
| Edit masked area | `inpainting` | `--prompt --image <path> --mask <path>` |

Base command:

```bash
vofy image create --model <model> --prompt "<prompt>" --aspect-ratio <ratio> --resolution <resolution> --yes --download-to ./output
```

## Video Modes

| Intent | Mode | Required flags |
| --- | --- | --- |
| Text prompt | `text_to_video` | `--prompt` |
| Animate image | `image_to_video` | `--prompt --first-frame <path>` |
| Morph images | `interpolation` | `--first-frame <path> --last-frame <path>` |
| Image references | `reference_images` | `--prompt --reference-image <path>` |
| Mixed references | `multimodal_reference` | `--mode multimodal_reference --reference-image <path>` plus optional `--reference-video` / `--reference-audio` |
| Transform video | `video_to_video` | `--mode video_to_video --prompt --video <path>` |
| Extend video | `video_extension` | `--mode video_extension --prompt --video <path>` |
| Control motion | `motion_control` | Model-specific trajectory flags |

Base command:

```bash
vofy video create --model <model> --prompt "<prompt>" --duration <seconds> --aspect-ratio <ratio> --yes --download-to ./output
```

## Result Handling

- Sync create commands wait for completion and print output by default.
- `--download-to ./output` saves files locally and creates the directory if needed.
- `--result-url` prints generated resource URLs explicitly after completion.
- `--async` returns early; use `vofy tasks --plain --type video` and `vofy task <id_or_prefix> --download-to ./output` later.
- If the command fails because a value is unsupported, run `vofy models <model>` and retry with one of the listed ratios, resolutions, durations, or modes.

## Common Validation Traps

- `--video` is ambiguous; always add `--mode video_to_video` or `--mode video_extension`.
- Mixed `--reference-image` with `--reference-video` or `--reference-audio` requires `--mode multimodal_reference`.
- `kling-2.6` needs `resolution=1080p` for `--audio` and for last-frame interpolation.
- `kling-3.0 --multi-shot` requires `--shot-type`; `customize` uses `--multi-prompt`, while `intelligence` uses `--prompt`.
- Source-driven modes may ignore `--aspect-ratio` or `--resolution`; trust derived values from input media.

See `examples.md` for broader scenarios and `commands-reference.md` for full CLI help.
