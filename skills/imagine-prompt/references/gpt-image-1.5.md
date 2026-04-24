# GPT Image 1.5 Prompt Guide

Source: https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide

Applies to: `gpt-image-1.5`.

## Model Behavior

- Use direct natural language instructions instead of keyword piles.
- State the task type first: generate, edit, inpaint, product mockup, text rendering, or style transfer.
- Be explicit about preservation during edits; the model may otherwise reinterpret the whole image.
- Put exact rendered text in quotes and keep it short.
- Separate visual description from API or CLI parameters; put size, background, number of images, image input, mask input, and download behavior in Vofy flags.
- Prefer the model's default behavior unless the user needs a specific aspect ratio, transparent background, exact text, or localized edit.
- When quality matters, ask for observable image traits rather than abstract intent: material, geometry, camera angle, lighting, shadows, palette, typography, and whitespace.

## Core Prompt Anatomy

```text
Goal: [generate/edit/inpaint] [asset type] for [use case].
Subject: [main subject with concrete details].
Composition: [viewpoint, crop, layout, whitespace, background].
Style: [medium, realism level, design style, era, texture].
Lighting/color: [light source, mood, palette].
Text: [exact quoted text, typography, placement, or "no text"].
Constraints: preserve [attributes]; avoid [critical exclusions].
```

For simple generation, combine these into one concise paragraph. For edits, keep sections separate so preservation and changes are unambiguous.

Use this structure as a checklist, not a template to expose to end users. Drop sections that do not affect the result.

## Generation Guidance

- Lead with the deliverable: poster, icon, product photo, UI illustration, diagram, character sheet, sticker, texture, logo draft.
- Specify visible layout rather than intent: “centered product with 30% empty space on the right,” not “premium.”
- Define style with medium and texture: studio product photo, flat vector illustration, risograph poster, clay render, watercolor sketch.
- Mention background and transparency needs explicitly, and use `--background transparent` when supported.
- For text-heavy outputs, reduce copy and use large, simple typography.

## Composition And Camera

- State the camera relationship: eye-level, overhead flat lay, macro close-up, three-quarter front view, isometric, wide establishing shot.
- Define framing and crop: full body, waist-up, centered product, edge-to-edge pattern, safe margins, negative space.
- Give spatial instructions for multi-object scenes: left/right placement, foreground/background, overlap, scale hierarchy, and clear separation.
- For product or UI work, specify alignment, surface, reflection, shadow, and whether the asset should feel photographed, rendered, or illustrated.
- Use aspect ratio and resolution flags for canvas shape; use prompt text for what occupies the canvas.

## Style Control

- Combine medium, era, finish, and constraints: `flat vector mascot, 1960s travel-poster palette, subtle paper grain, no gradients`.
- Avoid vague style-only prompts such as `make it cinematic`; pair mood words with concrete lighting, lens, palette, and composition.
- If matching a style reference, name the transferable traits: line weight, color palette, texture, lighting, typography, or composition.
- If style must not drift, add exclusions for competing looks: `not 3D, not photorealistic, no glossy plastic`.

## Editing Guidance

Use this order:

```text
Preserve: [identity, pose, geometry, lighting, camera angle, colors, text/logo].
Change: [one primary edit].
Blend: match [shadows, reflections, grain, perspective, edge softness].
Avoid: [unwanted changes].
```

- For masks, describe the masked region and the replacement content.
- For localized edits, use one primary change per request and say `only` when scope matters.
- For product or logo work, preserve geometry, label text, logo placement, and brand colors.
- For people, preserve identity, expression, age, hairstyle, and clothing unless those are the edit target.
- If an edit fails, reduce the requested change to one local operation.

## Inpainting With Masks

- Treat the mask as the edit boundary, but still describe what belongs inside it.
- Explain how the new content should connect to the unmasked image: perspective, edge softness, material, shadows, reflections, lighting direction, and grain.
- Preserve unmasked regions explicitly when important: `Keep all unmasked pixels visually unchanged`.
- If replacing a background, describe both the new background and how foreground edges should blend.

## Prompting For Text

- Quote exact text: `Text: "SPRING SALE"`.
- Keep text short and high contrast.
- Specify font style and placement: bold condensed sans-serif, top-left, centered baseline, large readable letters.
- Avoid asking for paragraphs, tiny captions, dense menus, or many labels in one image.
- Add `No extra text, no watermark, no misspellings` when text accuracy matters.
- For logos, signage, packaging, and UI, identify which text must remain exact and which decorative text should be omitted.

## Reference Images

- Use references to anchor identity, product details, composition, or style.
- Say which attributes to copy and which to ignore; references do not replace written instructions.
- Do not assume the model knows which reference is primary; name the role of each input if multiple images are supported.
- When using multiple references, assign a stable role to each image before giving the edit or generation instruction.
- Use references for one or two strong anchors, not as a substitute for resolving contradictory requirements.

```text
Use image 1 for the product shape and label placement. Use image 2 only for the warm studio lighting style. Preserve the exact bottle silhouette and front logo; replace the background with matte cream paper.
```

## Parameter Hints

- Use `--size` or ratio-related Vofy options for canvas dimensions instead of asking for pixel dimensions in the prompt.
- Use `--background transparent` for transparent assets and still mention transparent background in the prompt.
- Use `--image` inputs for references or edits, and `--mask` only when the user needs an inpainted region.
- Use `--n` for variations rather than asking the model to create contact sheets or multiple unrelated designs in one image.
- If Vofy exposes a quality flag for the selected model, use lower quality for draft composition checks and higher quality for final text, product detail, or subtle edits.
- Use `--yes` in create examples so agents can run non-interactively.

## Use Case Recipes

- **Infographics and diagrams**: define the audience, topic, major sections, flow direction, label count, visual hierarchy, and exact labels. Ask for simple readable structure, not dense copy.
- **Image translation/localization**: preserve layout, icons, colors, typography style, spacing, and imagery. Change only the specified text into the target language.
- **Natural photorealism**: write like a photographer: real subject behavior, camera/lens feel, shot scale, lighting source, depth of field, material wear, skin or fabric texture, and no heavy retouching.
- **World-knowledge scenes**: include the place, date or era, cultural context, and realism target. Ask for period-accurate clothing, objects, environment, and signage only when needed.
- **Logos and marks**: request an original non-infringing mark with simple geometry, strong silhouette, balanced negative space, flat color, scalability, centered padding, and no watermark.
- **Comics and panels**: specify panel count, reading order, equal panel sizing, one concrete visual beat per panel, repeated character traits, and any text or caption limits.
- **UI mockups**: describe a real shipped interface: platform, screen type, layout hierarchy, sections, spacing, typography, component states, practical content, and minimal decoration.
- **Style transfer**: preserve only style traits such as palette, texture, brushwork, line weight, lighting, or grain. Replace the subject or scene explicitly.
- **Virtual try-on**: lock identity, face, skin tone, body shape, pose, hair, expression, camera angle, and background. Change only garments and require realistic fit, folds, seams, occlusion, and shadows.
- **Sketch-to-render**: preserve the sketch layout, proportions, perspective, and design intent. Add realistic materials, lighting, surfaces, edges, and environment details.
- **Product mockups**: preserve product geometry, label text, logo placement, proportions, and material. For cutouts, request crisp alpha edges, no halos, and optional subtle shadow.
- **Marketing creatives**: separate product preservation from scene generation. Put final ad copy in quotes, specify exact placement, typography, contrast, and forbid extra characters.
- **Lighting/weather changes**: change only time of day, season, sky, weather, reflections, and color temperature. Preserve scene geometry, camera, subject placement, and identity.
- **Object removal or recolor**: name the object and operation, say `Do not change anything else`, and require background reconstruction, matching texture, shadows, and lighting.
- **Person insertion or compositing**: name the source person and target scene roles. Match scale, perspective, contact shadows, lighting direction, grain, and occlusion.
- **Multi-image compositing**: assign each image a role, then describe the final composition, which traits to preserve, which to ignore, and how sources should interact.
- **Interior design swaps**: preserve room architecture, camera, windows, floor, wall boundaries, and lighting. Change only specified furniture, materials, colors, or decor.
- **Merch concepts**: describe product type, material, pose, package or accessory details, scale cues, clean product render lighting, and plain background.
- **Character-consistent book art**: create or reuse a character sheet, then lock character traits across scenes while varying pose, emotion, setting, and story beat.

## Useful Patterns

### Product Photo

```text
Generate a studio product photo of a matte white insulated tumbler, three-quarter front view, centered on a light gray seamless background. Softbox reflection from upper left, subtle contact shadow, crisp rim highlight, neutral premium catalog style. No text.
```

### Product Background Edit

```text
Preserve the product silhouette, label text, logo placement, camera angle, and existing highlights. Replace only the background with a warm beige stone countertop and soft morning window light from the left. Match the contact shadow, reflections, perspective, and edge softness. Do not change the product color, cap, label, or text.
```

### Transparent Sticker

```text
Generate a cute flat-vector sticker of a smiling corgi astronaut floating with a tiny blue planet. Thick white sticker border, clean shapes, cheerful orange and sky-blue palette, transparent background. No text.
```

### Local Edit

```text
Preserve the person, pose, camera angle, and warm indoor lighting. Replace only the plain gray sweater with a forest-green cable-knit sweater. Match fabric folds and shadows. Do not change the face, hair, hands, or background.
```

### Masked Inpaint

```text
Edit only the masked area on the tabletop. Add a small ceramic espresso cup in correct perspective, with a soft contact shadow and matching warm indoor light. Keep all unmasked regions visually unchanged, including the laptop, notebook, hands, and background.
```

### Text Poster

```text
Generate a minimalist concert poster on an off-white paper background. Large black text at top: "MOON ROOM". Smaller text below: "LIVE 9 PM". Center: simple blue crescent moon icon, lots of whitespace, modern Swiss grid layout. No extra text.
```

### Style Reference

```text
Use the reference image only for its muted teal-and-cream palette, screen-print texture, and simple geometric shapes. Generate a new poster of a mountain train crossing a bridge at sunrise, centered composition with large empty sky at the top. Do not copy the reference subject, layout, logo, or any text. No text.
```

## Common Failure Fixes

- **Wrong edit scope**: start with `Preserve:` and list what must not change.
- **Weak composition**: specify crop, camera angle, object placement, and whitespace.
- **Messy text**: shorten text, quote it, increase size, and remove extra labels.
- **Style drift**: name medium, era, texture, palette, and lighting.
- **Overloaded request**: split into separate generations or edits.
- **Reference confusion**: assign each reference a role and state which traits to ignore.
- **Poor background removal**: request transparent background in both prompt and Vofy flags.

## Final Rewrite Checklist

- The prompt states generation, editing, or reference use.
- The main subject and deliverable are explicit.
- Composition, style, lighting, and background are concrete.
- Preservation instructions come before edit instructions.
- Exact text is quoted, short, and placed.
- Vofy flags carry size, background, image, and mask settings.
- Reference-image roles and ignored traits are explicit when references are used.
- Masked edits describe blending with surrounding perspective, light, shadows, and texture.
