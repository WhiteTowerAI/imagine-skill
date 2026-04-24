---
name: imagine-prompt
description: Optimize image and video generation prompts for specific Vofy models using model-specific official prompt guides. Use when the user asks to improve, rewrite, translate, structure, or adapt prompts for image/video generation, or before create requests where prompt quality materially affects results.
---

# Prompt Optimization For Vofy Media

Rewrite user intent into model-ready prompts while preserving creative direction.

## Adaptive Workflow

1. Identify output type, mode, named model, source media, target platform, aspect ratio, duration, and hard constraints.
2. If no model is named, choose or infer one with `imagine-models` before loading prompt guidance.
3. Load the exact model guide from the routing table below; for multi-stage pipelines, load one guide per stage.
4. If the selected model has no guide in this skill, do not load a substitute guide; use only the user's intent plus `imagine-models` capability constraints.
5. Rewrite the prompt for the selected model and mode.
6. When the user asked to generate media, pass the optimized prompt to `imagine-create` instead of stopping at advice.

## Model Guide Routing

| Model | Load |
| --- | --- |
| `sora-2`, `sora-2-pro` | `references/sora-2.md` |
| `gpt-image-1.5` | `references/gpt-image-1.5.md` |
| `gpt-image-2` | `references/gpt-image-models.md` |
| `gemini-2.5-flash-image`, `gemini-3-pro-image-preview`, `gemini-3.1-flash-image-preview` | `references/gemini-image.md` |
| `veo-3.1`, `veo-3.1-fast`, `veo-3.1-lite` | `references/veo.md` |

## Rewrite Shape

For images, include: subject, environment, composition, style or medium, lighting, camera or render traits, color palette, important text, and constraints.

For videos, include: subject, action over time, setting, camera movement, shot scale, pacing, lighting, style, duration-aware beats, continuity constraints, and audio/dialogue only if the chosen model supports it.

For edits or source-driven modes, describe what must remain unchanged before describing the change.

## Output Format

- **Optimized prompt**: one copy-paste-ready prompt.
- **Parameter hints**: model, mode, ratio, duration, resolution, and special flags when known.
- **Why this works**: 1-3 terse bullets only when useful.
- **Next command**: include a `vofy` command only if the user asked to create media.

## Guardrails

- Do not invent unsupported flags; verify special controls with `vofy models <model>` or `imagine-models` references.
- Do not use another model's prompt guide as a fallback.
- Keep user-specified text exact, especially logos, UI copy, captions, product names, and brand language.
- Do not overconstrain simple prompts; add detail where it improves controllability.
