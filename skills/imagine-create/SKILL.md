---
name: imagine-create
description: Step-by-step workflow for creating images and videos with vofy-cli, including mode selection and flag guidance
---

# Creating Media with vofy-cli

This skill guides you through the complete media creation workflow — from understanding the user's need to delivering a downloaded result.

If `vofy` is missing, stop and tell the user to install it with `npm install -g vofy-cli@0.1.1` before continuing.

## Workflow

1. Determine what the user wants (image or video? what content?)
2. Pick the right mode (text_to_image, image_to_video, etc.)
3. Pick and confirm the model (`vofy models <name>` first; use imagine-models skill if unsure)
4. Build the command with correct flags
5. Execute and deliver the result

## Image Creation

### Mode Selection

| User wants... | Mode | Key flags |
|---------------|------|-----------|
| Generate from text description | `text_to_image` | `--prompt` |
| Edit/transform an existing image | `image_to_image` | `--prompt --image <path>` |
| Edit a specific region of an image | `inpainting` | `--prompt --image <path> --mask <path>` |

### Template

```bash
vofy image create \
  --model <model> \
  --prompt "<prompt>" \
  --aspect-ratio <ratio> \
  --resolution <resolution> \
  --quality <value> \
  --yes \
  --download-to ./output
```

> `--quality` is model-specific. Only include it when the model exposes a quality parameter (check `vofy models <name>`).

### Common Patterns

**Text to image (simplest)**
```bash
vofy image create --model seedream-4.5 --prompt "a cat sitting on a windowsill" --yes --download-to ./output
```

**Image to image (edit/transform)**
```bash
vofy image create --model gpt-image-1.5 --prompt "make it look like a watercolor painting" --image ./photo.jpg --yes --download-to ./output
```

**Transparent background (logos, icons)**
```bash
vofy image create --model gpt-image-1.5 --prompt "a minimalist logo of a mountain" --background transparent --yes --download-to ./output
```

**High resolution**
```bash
vofy image create --model seedream-4.5 --prompt "landscape photo" --resolution 4K --aspect-ratio 16:9 --yes --download-to ./output
```

## Video Creation

### Mode Selection

| User wants... | Mode | Key flags |
|---------------|------|-----------|
| Generate video from text | `text_to_video` | `--prompt` |
| Animate a still image | `image_to_video` | `--prompt --first-frame <path>` |
| Generate video between two frames | `interpolation` | `--first-frame <path> --last-frame <path>` |
| Use reference images for style | `reference_images` | `--prompt --reference-image <path>` |
| Use mixed media references | `multimodal_reference` | `--mode multimodal_reference --reference-image <path> --reference-video <path>` |
| Control motion trajectories | `motion_control` | Model-specific |
| Transform existing video | `video_to_video` | `--mode video_to_video --prompt --video <path>` |
| Extend existing video | `video_extension` | `--mode video_extension --prompt --video <path>` |

### Template

```bash
vofy video create \
  --model <model> \
  --prompt "<prompt>" \
  --duration <seconds> \
  --aspect-ratio <ratio> \
  --yes \
  --download-to ./output
```

### Common Patterns

**Text to video (simplest)**
```bash
vofy video create --model veo-3.1 --prompt "a drone shot flying over a forest at sunrise" --duration 6 --yes --download-to ./output
```

**Animate a still image**
```bash
vofy video create --model kling-3.0 --prompt "the character slowly turns their head" --first-frame ./character.png --yes --download-to ./output
```

**Interpolation (morph between two frames)**
```bash
vofy video create --model seedance-2.0 --prompt "smooth transition" --first-frame ./start.png --last-frame ./end.png --duration 4 --yes --download-to ./output
```

**Video with audio**
```bash
vofy video create --model kling-3.0 --prompt "a person speaking at a podium" --audio --duration 8 --yes --download-to ./output
```

## Key Rules for AI Agents

1. **Always use `--yes`** — skips the interactive route picker. Without it, the CLI will prompt for user input which blocks the agent.

2. **Use `--download-to <path>` when you need local files** — otherwise the default sync output already includes generated resource URLs.

3. **Local files auto-upload** — pass local paths directly to `--image`, `--first-frame`, `--video`, etc. The CLI handles upload automatically.

4. **Default is synchronous** — the command waits for the task to complete. Use `--async` if you want to submit and check later.

5. **Check credits first** — run `vofy status` before creating media to verify the user has sufficient credits.

6. **Never run `vofy login`** — it requires a browser. If auth fails, tell the user to run it manually.

## Handling Results

After a successful create command:
- With `--download-to ./output`: files are saved to the specified directory
- Without a download flag: the sync output includes generated resource URLs by default
- With `--result-url`: URLs are printed explicitly after completion
- For async tasks: use `vofy task <id> --download-to ./output` to download later

## Validation Gotchas

These are the most common causes of failed generations. The model docs have full validation rules, but these are the ones that trip up agents most often:

**kling-2.6:**
- 720p does NOT support `--audio` — must use 1080p for audio
- `image_to_video` ignores `--aspect-ratio` (follows the input image)
- `--last-frame` requires `resolution=1080p` and forbids `--audio`
- `motion_control` forbids `--last-frame`, `--duration`, `--aspect-ratio`

**kling-3.0:**
- `image_to_video` ignores `--aspect-ratio` (follows the input image)
- `--multi-shot` requires `--shot-type` (either `customize` or `intelligence`)
- `--shot-type customize` requires `--multi-prompt` and forbids `--prompt`
- `--shot-type intelligence` requires `--prompt` and forbids `--multi-prompt`

**seedance-2.0 / seedance-2.0-fast:**
- `multimodal_reference` uses `--reference-image` / `--reference-video` / `--reference-audio` — NOT `--first-frame` or `--video`
- Mixed image+video/audio references require `--mode multimodal_reference`
- `--reference-video` and `--reference-audio` are ONLY available in `multimodal_reference` mode

**grok-imagine-video:**
- `video_to_video` and `video_extension` ignore `--aspect-ratio` and `--resolution` (follows source video)

**Ambiguous mode inference:**
- `--video` by itself is ambiguous; use `--mode video_to_video` or `--mode video_extension`
- Mixed `--reference-image` with `--reference-video` / `--reference-audio` needs `--mode multimodal_reference`

**General:**
- Some models have `hidden_controls` — parameters that exist but are auto-managed (e.g., `kling-3.0-motion-control` hides duration, aspect_ratio, audio)
- Some parameters have `derived` values in certain modes (auto-set from input, e.g., aspect_ratio from source video)
- Route pricing multipliers affect cost — route_b/route_c are often 0.5x but may restrict available modes/resolutions

## Error Handling

| Error | Action |
|-------|--------|
| "Not authenticated" | Tell user to run `vofy login` |
| "Insufficient credits" | Tell user to check `vofy billing` |
| "Model not found" | Run `vofy models` to list available models |
| "Invalid parameter" | Check model capabilities with `vofy models <name>` |
| Task fails/times out | Check `vofy task <id>` for error details |

## Detailed Examples

See [examples.md](examples.md) for more real-world scenarios.
