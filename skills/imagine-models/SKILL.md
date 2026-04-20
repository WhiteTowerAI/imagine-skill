---
name: imagine-models
description: Model selection guide for vofy-cli — helps choose the right image or video model based on use case, with capability summaries
---

# Model Selection Guide

Use this skill to pick the right model for a vofy-cli task. For full parameter details, see the supporting files.

## Quick Recommendations

| Use case | Recommended model | Why |
|----------|-------------------|-----|
| General text-to-image | `seedream-4.5` | High quality, wide aspect ratio support, up to 4K |
| Transparent background / logo | `gpt-image-1.5` | Only model with `--background transparent` |
| Image editing (inpainting) | `gpt-image-1.5` | Only model supporting inpainting mode |
| Web-aware image generation | `seedream-5.0-lite` or `gemini-3.1-flash-image-preview` | Both support `--web-search` for current references |
| High-quality video | `veo-3.1` | Best quality, up to 4K, supports reference images |
| Fast video preview | `veo-3.1-fast` | Same quality tier, faster generation |
| Budget video | `veo-3.1-lite` | Lower cost, up to 1080p |
| Animate a still image | `kling-3.0` or `seedance-2.0` | Both strong at image-to-video |
| Long video (up to 15s) | `kling-3.0` or `seedance-2.0` | Support 3-15s duration range |
| Video with audio | `kling-3.0` or `seedance-2.0` | Both support `--audio` flag |
| Motion control | `kling-3.0-motion-control` | Dedicated motion control model |
| Video-to-video transform | `seedance-2.0` or `grok-imagine-video` | Support video_to_video mode |
| Video extension | `seedance-2.0` or `grok-imagine-video` | Support video_extension mode |
| Multi-shot storyboard | `kling-3.0` | Supports `--multi-shot` with per-shot prompts |
| Multimodal references (image+video+audio) | `seedance-2.0` | Supports `multimodal_reference` mode with mixed inputs |
| Image search grounding | `gemini-3.1-flash-image-preview` | Supports `--image-search` for visual reference grounding |

## Image Models Overview

| Model | Modes | Max Resolution | Aspect Ratios | Special Features |
|-------|-------|---------------|---------------|-----------------|
| `seedream-4.5` | t2i, i2i | 4K | 8 ratios | High quality, batch up to 10 |
| `seedream-5.0-lite` | t2i, i2i | 3K | 8 ratios | Web search, batch up to 10 |
| `gpt-image-1.5` | t2i, i2i, inpaint | 1K | 3 ratios + auto | Transparent bg, inpainting |
| `gemini-2.5-flash-image` | t2i, i2i | 4K | 11 ratios + auto | Fast, up to 14 input images |
| `gemini-3-pro-image-preview` | t2i, i2i | 4K | 11 ratios + auto | Pro quality, up to 14 input images |
| `gemini-3.1-flash-image-preview` | t2i, i2i | 4K | 15 ratios + auto | Web/image search, reasoning, up to 16 inputs |
| `grok-imagine-image-pro` | t2i, i2i | 2K | 14 ratios + auto | Pro quality |
| `grok-imagine-image` | t2i, i2i | 2K | 14 ratios + auto | Batch up to 10, 3 input images |

## Video Models Overview

| Model | Modes | Max Resolution | Duration | Special Features |
|-------|-------|---------------|----------|-----------------|
| `veo-3.1` | t2v, i2v, interp, ref | 4K | 4-8s | Reference images, highest quality |
| `veo-3.1-fast` | t2v, i2v, interp | 4K | 4-8s | Faster generation |
| `veo-3.1-lite` | t2v, i2v, interp | 1080p | 4-8s | Budget option |
| `kling-3.0` | t2v, i2v, interp, mc | 1080p | 3-15s | Audio, multi-shot, long videos |
| `kling-2.6` | t2v, i2v, interp, mc | 1080p | 5-10s | Stable, proven |
| `kling-3.0-motion-control` | mc | 1080p | 3s | Dedicated motion control |
| `kling-motion-control` | mc | 1080p | 5s | Legacy motion control |
| `seedance-2.0` | t2v, i2v, interp, ref, mm, v2v, ext | 720p | 4-15s | Most versatile, audio, web search |
| `seedance-2.0-fast` | t2v, i2v, interp, ref, mm, v2v, ext | 720p | 4-15s | Fast version of seedance-2.0 |
| `seedance-1.5-pro` | t2v, i2v, interp | 1080p | 4-12s | Pro quality |
| `sora-2-pro` | t2v, i2v | 1080p | 4-12s | OpenAI pro quality |
| `sora-2` | t2v, i2v | 720p | 4-15s | OpenAI standard |
| `grok-imagine-video` | t2v, i2v, ref, v2v, ext | 720p | 1-15s | Most modes, widest AR support |

Mode abbreviations: t2i=text_to_image, i2i=image_to_image, t2v=text_to_video, i2v=image_to_video, interp=interpolation, mc=motion_control, ref=reference_images, mm=multimodal_reference, v2v=video_to_video, ext=video_extension

## Querying Models via CLI

```bash
# List all models
vofy models

# List image models only
vofy models --type image

# List video models only
vofy models --type video

# Show detailed capabilities for a specific model
vofy models seedream-4.5
```

## Detailed References

- For image model parameters, limits, and constraints: see [image-models.md](image-models.md)
- For video model parameters, limits, and constraints: see [video-models.md](video-models.md)
