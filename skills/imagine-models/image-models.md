# Image Models — Detailed Reference

> Auto-generated from model-manifest.json. Hand-written notes in NOTES blocks are preserved.

## gemini-2.5-flash-image

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image |
| Aspect Ratios | 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto |
| Resolutions | 1K, 2K, 4K, auto |
| Max Output (text_to_image) | 1 |
| Max Output (image_to_image) | 1 |
| Max Input (image_to_image) | 14 |
| Supports Auto | yes |
| Base Price | 4 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
  - image_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, auto
    - image_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, auto
- route_b (1x)
    - text_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
    - image_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
- route_c (1x)
    - text_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, auto
    - image_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, auto

Route-specific restrictions:
- route_a: when resolution=2K/4K — Route A only supports 1K and Auto resolutions
- route_c: when resolution=2K/4K — Route C only supports 1K and Auto resolutions

<!-- NOTES:gemini-2.5-flash-image -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## gemini-3-pro-image-preview

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image |
| Aspect Ratios | 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto |
| Resolutions | 1K, 2K, 4K, auto |
| Max Output (text_to_image) | 1 |
| Max Output (image_to_image) | 1 |
| Max Input (image_to_image) | 14 |
| Supports Auto | yes |
| Base Price | 8 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
  - image_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto

Pricing:
- Base: 8 credits
- resolution=1K/2K: 8 credits
- resolution=4K: 16 credits

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
    - image_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
- route_b (0.75x)
    - text_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
    - image_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
- route_c (0.75x)
    - text_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto
    - image_to_image: AR: 1:1, 2:3, 3:4, 4:5, 9:16, 3:2, 4:3, 5:4, 16:9, 21:9, auto, Res: 1K, 2K, 4K, auto

<!-- NOTES:gemini-3-pro-image-preview -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## gemini-3.1-flash-image-preview

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image |
| Aspect Ratios | 1:1, 1:4, 1:8, 2:3, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 3:2, 16:9, 21:9, auto |
| Resolutions | 512, 1K, 2K, 4K, auto |
| Max Output (text_to_image) | 1 |
| Max Output (image_to_image) | 1 |
| Max Input (image_to_image) | 16 |
| Supports Auto | yes |
| Base Price | 6 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 1:4, 1:8, 2:3, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 3:2, 16:9, 21:9, auto, Res: 512, 1K, 2K, 4K, auto
  - image_to_image: AR: 1:1, 1:4, 1:8, 2:3, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 3:2, 16:9, 21:9, auto, Res: 512, 1K, 2K, 4K, auto

Special Parameters:
- `--web-search` — Let the model use live web results as extra context when the prompt depends on current facts, brands, places, or public references. Default: false.
- `--image-search` — Let the model retrieve reference imagery for better visual grounding when the prompt depends on recognizable objects, products, or styles. Default: false.
- `--reasoning-effort <minimal|high>` — Control how much reasoning the model spends interpreting the prompt before generating. Higher effort can improve accuracy but usually adds latency. Default: minimal.

Pricing:
- Base: 6 credits
- resolution=512: 4 credits
- resolution=1K: 6 credits
- resolution=2K: 10 credits
- resolution=4K: 14 credits
- Surcharge: web_search=true adds +1 credits
- Surcharge: image_search=true adds +1 credits
- Surcharge: reasoning_effort=high adds +1 credits

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 1:4, 1:8, 2:3, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 3:2, 16:9, 21:9, auto, Res: 512, 1K, 2K, 4K, auto
    - image_to_image: AR: 1:1, 1:4, 1:8, 2:3, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 3:2, 16:9, 21:9, auto, Res: 512, 1K, 2K, 4K, auto
- route_b (0.5x)
    - text_to_image: AR: 1:1, 1:4, 1:8, 2:3, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 3:2, 16:9, 21:9, auto, Res: 512, 1K, 2K, 4K, auto
    - image_to_image: AR: 1:1, 1:4, 1:8, 2:3, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 3:2, 16:9, 21:9, auto, Res: 512, 1K, 2K, 4K, auto

<!-- NOTES:gemini-3.1-flash-image-preview -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## gpt-image-2

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image, inpainting |
| Aspect Ratios | 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto |
| Resolutions | 1K, 2K, 3K, 4K, auto |
| Max Output (text_to_image) | 10 |
| Max Output (image_to_image) | 10 |
| Max Input (image_to_image) | 16 |
| Max Output (inpainting) | 10 |
| Max Input (inpainting) | 16 |
| Supports Auto | yes |
| Base Price | 12 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto
  - image_to_image: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto
  - inpainting: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto

Special Parameters:
- `--quality <low|medium|high|auto>` — Choose whether the model prioritizes speed, balances quality automatically, or renders with higher image fidelity. Default: auto.
- `--background <auto|opaque>` — Choose whether the image background stays opaque or is decided automatically by the model. Default: auto.

Pricing:
- Base: 12 credits
- 12 pricing tiers (varies by resolution/duration/mode)
- Range: 2–48 credits

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto
    - image_to_image: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto
    - inpainting: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto
- route_c (0.75x)
    - text_to_image: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto
    - image_to_image: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto
    - inpainting: AR: 1:1, 1:2, 2:3, 3:4, 4:5, 5:4, 4:3, 3:2, 2:1, 9:16, 9:19.5, 9:20, 16:9, 19.5:9, 20:9, 21:9, auto, Res: 1K, 2K, 3K, 4K, auto

<!-- NOTES:gpt-image-2 -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## gpt-image-1.5

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image, inpainting |
| Aspect Ratios | 1:1, 2:3, 3:2, auto |
| Resolutions | 1K, auto |
| Max Output (text_to_image) | 10 |
| Max Output (image_to_image) | 10 |
| Max Input (image_to_image) | 16 |
| Max Output (inpainting) | 10 |
| Max Input (inpainting) | 16 |
| Supports Auto | yes |
| Base Price | 8 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
  - image_to_image: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
  - inpainting: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto

Special Parameters:
- `--quality <low|medium|high|auto>` — Choose whether the model prioritizes speed, balances quality automatically, or renders with higher image fidelity. Default: auto.
- `--background <transparent|opaque|auto>` — Choose whether the image background stays transparent, becomes a solid backdrop, or is decided automatically by the model. Default: auto.

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
    - image_to_image: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
    - inpainting: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
- route_b (0.5x)
    - text_to_image: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
    - image_to_image: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
    - inpainting: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
- route_c (0.5x)
    - text_to_image: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
    - image_to_image: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto
    - inpainting: AR: 1:1, 2:3, 3:2, auto, Res: 1K, auto

<!-- NOTES:gpt-image-1.5 -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## grok-imagine-image

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image |
| Aspect Ratios | 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto |
| Resolutions | 1K, 2K, auto |
| Max Output (text_to_image) | 10 |
| Max Output (image_to_image) | 10 |
| Max Input (image_to_image) | 3 |
| Supports Auto | yes |
| Base Price | 2.5 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto, Res: 1K, 2K, auto
  - image_to_image: AR: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto, Res: 1K, 2K, auto

Input Constraints:
- image: formats: jpg/jpeg/png

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto, Res: 1K, 2K, auto
    - image_to_image: AR: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto, Res: 1K, 2K, auto

<!-- NOTES:grok-imagine-image -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## grok-imagine-image-pro

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image |
| Aspect Ratios | 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto |
| Resolutions | 1K, 2K, auto |
| Max Output (text_to_image) | 1 |
| Max Output (image_to_image) | 1 |
| Max Input (image_to_image) | 1 |
| Supports Auto | yes |
| Base Price | 8 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto, Res: 1K, 2K, auto
  - image_to_image: AR: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto, Res: 1K, 2K, auto

Input Constraints:
- image: formats: jpg/jpeg/png

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto, Res: 1K, 2K, auto
    - image_to_image: AR: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 2:1, 1:2, 19.5:9, 9:19.5, 20:9, 9:20, auto, Res: 1K, 2K, auto

<!-- NOTES:grok-imagine-image-pro -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## seedream-4.5

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image |
| Aspect Ratios | 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9 |
| Resolutions | 2K, 4K |
| Defaults | aspect_ratio=1:1, resolution=2K |
| Max Output (text_to_image) | 10 |
| Max Output (image_to_image) | 10 |
| Max Input (image_to_image) | 14 |
| Supports Auto | no |
| Base Price | 4 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 4K
  - image_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 4K

Special Parameters:
- `--sequential-image-generation <auto|disabled>` — Control whether the model uses a more sequential generation path. Auto is the recommended balance unless you need to disable it for speed or compatibility. Default: auto.

Input Constraints:
- image: max 10MB, formats: jpg/jpeg/png/webp/bmp/tiff/gif, min 15px, max 36MP, aspect ratio range: 0.0625–16

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 4K
    - image_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 4K
- route_b (0.75x)
    - text_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 4K
    - image_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 4K

<!-- NOTES:seedream-4.5 -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## seedream-5.0-lite

| Property | Value |
|----------|-------|
| Modes | text_to_image, image_to_image |
| Aspect Ratios | 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9 |
| Resolutions | 2K, 3K |
| Defaults | aspect_ratio=1:1, resolution=2K |
| Max Output (text_to_image) | 10 |
| Max Output (image_to_image) | 10 |
| Max Input (image_to_image) | 16 |
| Supports Auto | no |
| Base Price | 5 credits |

Per-mode constraints:
  - text_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 3K
  - image_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 3K

Special Parameters:
- `--sequential-image-generation <auto|disabled>` — Control whether the model uses a more sequential generation path. Auto is the recommended balance unless you need to disable it for speed or compatibility. Default: auto.
- `--web-search` — Let the model use live web results as extra context when the prompt depends on current facts, brands, places, or public references. Default: false.

Input Constraints:
- image: max 10MB, formats: jpg/jpeg/png/webp/bmp/tiff/gif, min 15px, max 36MP, aspect ratio range: 0.0625–16

Provider Routes:
- route_a (1x)
    - text_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 3K
    - image_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 3K
- route_b (0.75x)
    - text_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 3K
    - image_to_image: AR: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9, Res: 2K, 3K

<!-- NOTES:seedream-5.0-lite -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---
