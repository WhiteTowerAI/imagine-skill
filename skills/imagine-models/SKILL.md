---
name: imagine-models
description: Select Vofy image and video models by use case, mode, resolution, aspect ratio, duration, pricing, and special capabilities. Use when the user asks which model to use or when a create request has constraints that could make flags invalid.
---

# Vofy Model Selection

Choose a model before composing `vofy image create` or `vofy video create`. When exact limits matter, inspect the generated references or run `vofy models <name>`.

## Selection Steps

1. Classify the task as image or video, then identify the required mode.
2. Pick from Quick Picks for common requests.
3. Confirm exact allowed aspect ratios, resolutions, durations, source inputs, and pricing in the generated references.
4. Avoid model-specific flags until confirmed by `vofy models <name>` or the references.

## Quick Picks

| Use case | Recommended model | Why |
| --- | --- | --- |
| General image | `seedream-4.5` | High quality, broad ratios, up to 4K |
| OpenAI image/editing | `gpt-image-2` | 4K output, broad ratios, inpainting |
| Transparent logo/icon | `gpt-image-1.5` | Supports `--background transparent` |
| Web-aware image | `seedream-5.0-lite` or `gemini-3.1-flash-image-preview` | Supports current-reference workflows |
| Highest quality video | `veo-3.1` | Up to 4K, strong text/video quality |
| Fast video preview | `veo-3.1-fast` | Faster same-family preview model |
| Budget video | `veo-3.1-lite` | Lower-cost 1080p option |
| Animate still image | `kling-3.0` or `seedance-2.0` | Strong image-to-video support |
| Long or audio video | `kling-3.0` or `seedance-2.0` | Up to 15s and audio support |
| Motion control | `kling-3.0-motion-control` | Dedicated trajectory model |
| Video transform/extension | `seedance-2.0` or `grok-imagine-video` | Support `video_to_video` and `video_extension` |
| Multimodal references | `seedance-2.0` | Image, video, and audio references |

## When To Inspect Details

- User asks for exact cost, ratio, resolution, duration, or output count.
- User supplies source media and the mode may derive output dimensions from it.
- User asks for audio, search grounding, transparent background, multi-shot, motion control, or mixed references.
- A create command fails with an unsupported mode, flag, or value.

Mode abbreviations in references: `t2i`, `i2i`, `t2v`, `i2v`, `interp`, `ref`, `mm`, `v2v`, `ext`, `mc`.

## References

- Use `image-models.md` for exact image modes, aspect ratios, resolutions, special parameters, and pricing.
- Use `video-models.md` for exact video modes, durations, source constraints, special parameters, and pricing.
- Use `vofy models --type image`, `vofy models --type video`, or `vofy models <name>` for live CLI output.
