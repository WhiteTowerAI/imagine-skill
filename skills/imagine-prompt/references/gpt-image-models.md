# GPT Image Models Prompt Guide

Source: https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide

Applies to: `gpt-image-2` and general OpenAI image-generation prompting.

## Core Rules

- Write prompts as clear instructions, not comma-separated keyword lists.
- Put the final asset type first: hero image, product mockup, icon, diagram, edit, inpaint, style transfer, poster, storyboard frame, or transparent cutout.
- Describe the visible result, not hidden intent: subject, setting, composition, style, lighting, color, text, and constraints.
- Use prompt text for creative direction; use Vofy flags for model, size, quality, background, images, masks, counts, and output handling.
- For source-image work, separate what to preserve from what to change before adding style or polish.
- Use explicit tradeoffs: exact instruction following, polished aesthetics, speed, cost, or reference fidelity.

## Model And Parameter Choices

- Use `gpt-image-2` when the prompt needs high instruction adherence, precise edits, reliable text, world knowledge, or strict image-input fidelity.
- Use `gpt-image-1.5` for fast drafts, simple edits, and lower-cost iteration before final rendering.
- Use low quality for composition exploration, medium for normal iteration, and high for final outputs with product detail, readable text, or subtle edits.
- Pair transparent-background output with prompt constraints: isolated subject, clean alpha edges, no backdrop, controlled shadows, and no unwanted halo.
- Move operational settings out of the prompt: size, quality, transparency, masks, and image references belong in Vofy parameters when available.

## Prompt Anatomy

```text
Create [asset type] for [use case/audience/platform].
Subject: [main subject, identity, attributes, materials].
Scene: [environment, background, props, context].
Composition: [crop, viewpoint, placement, negative space, aspect-ratio-aware framing].
Style: [medium, realism level, genre, era, texture, render treatment].
Lighting/color: [light source, mood, palette, contrast].
Text: [exact quoted copy, hierarchy, placement, typography, or "no text"].
Constraints: [preserve, avoid, safety margins, brand rules, output-specific requirements].
```

Keep simple tasks short. Add structure only when precision matters.

## Task Patterns

### New Image

- State the deliverable and audience first.
- Anchor the main subject with concrete visible attributes.
- Add composition, camera, background, lighting, style, and color in that order.
- End with text and avoid-list constraints.

### Image Edit

```text
Preserve: [identity, shape, pose, camera angle, perspective, lighting, shadows, logo/text, background details].
Edit: [one primary local change].
Integrate: match [materials, reflections, grain, edge softness, color temperature, depth of field].
Avoid: [unwanted changes].
```

- Put preservation before the edit request.
- Avoid combining unrelated edits; inspect after one precise change, then iterate.
- For masks, describe the masked region and replacement content in visual terms.
- For identity-sensitive edits, repeat the attributes that must not change.

### Reference Remix

- Assign a role to every input: identity, product geometry, pose, layout, palette, material, lighting, or style.
- Name the primary reference when multiple images are supplied.
- State what to ignore from each reference, especially unwanted background, text, logos, crop, or pose.
- If style transfer should preserve content, say “style only; do not change subject, pose, layout, or text.”
- If content should change but style should remain, isolate style traits such as palette, lens, brushwork, paper texture, or lighting.

### Text Rendering

- Quote exact words and keep them short.
- Specify hierarchy: title, subtitle, label, small caption, badge, or UI copy.
- Specify typography visually: bold geometric sans-serif, serif editorial headline, hand-lettered marker, monospaced UI label.
- Specify placement and contrast: top-left, centered, lower third, large readable letters, high contrast against plain background.
- Ask for no extra text, no watermark, and no misspellings when text accuracy matters.
- For dense information, first generate a layout with placeholder blocks, then iterate on final copy.

### Product And Brand Assets

- Preserve product geometry, silhouette, label layout, logo placement, visible text, and brand colors.
- Specify material behavior: matte plastic, brushed metal, glass thickness, leather grain, paper texture, soft fabric weave.
- Lock camera angle and lighting for mockups: three-quarter front view, top-down flat lay, macro close-up, softbox reflection.
- Ask for realistic contact shadows, reflections, scale, and edge sharpness.
- Avoid redesigning labels or changing brand colors unless the user asks.

### Transparent Assets

- Describe silhouette, contour quality, internal highlights, and shadow behavior.
- Use: isolated subject, clean alpha edges, no backdrop, no halo, no rectangular canvas, no ground shadow unless requested.
- For stickers, specify border thickness, cut line, flat/vector style, and transparent outside border.
- For icons, specify centered composition, simple shapes, readable at small sizes, and no tiny details.

### Diagrams And Infographics

- Prioritize readability over decoration.
- Specify clean layout, large labels, arrows, hierarchy, and color coding.
- Limit the number of labels; prefer fewer large labels over many tiny captions.
- Use exact terms in quotes and request no extra text.
- For step diagrams, state order and flow direction: clockwise, left-to-right, top-to-bottom, or numbered stages.

### UI, App, And Screen Mockups

- Specify device, screen type, layout density, spacing, and visual system.
- Quote UI labels exactly and keep them few.
- Ask for consistent alignment, readable text, realistic shadows, and no invented extra UI copy.
- For reference-driven UI, preserve component placement, brand colors, icon shapes, and hierarchy.

### Characters And Portraits

- Specify age range, expression, pose, clothing, hairstyle, gaze direction, camera angle, and lighting.
- For edits, preserve identity, face shape, expression, skin tone, hairstyle, pose, and clothing unless those are the target.
- Avoid ambiguous identity changes by making the edit local and concrete.
- Use lens and framing controls: headshot, waist-up, full-body, eye-level, 85mm portrait, shallow depth of field.

### Realistic Photography

- Include camera viewpoint, focal length feel, depth of field, lighting source, lens artifacts only if useful, and environment detail.
- Use natural constraints: physically plausible shadows, reflections, contact points, scale, and perspective.
- Avoid overloading with conflicting styles such as “photorealistic watercolor vector.”

### Stylized Illustration

- Name medium, era, texture, line quality, color palette, and simplification level.
- Preserve subject and layout separately from style when using references.
- Avoid broad style words alone; describe visual traits such as flat color blocks, ink outlines, risograph grain, cel shading, or paper texture.

## Composition Controls

- Placement: centered, lower third, top-left, rule of thirds, symmetrical, full-bleed, isolated on white, copy space on the left.
- Camera: eye-level, top-down, three-quarter view, macro, wide shot, telephoto compression, orthographic, isometric.
- Crop: close-up, waist-up, full-body, uncropped product, margin-safe, bleed-safe, no object cut off.
- Background: seamless studio, transparent, simple gradient, shallow-focus environment, contextual scene, empty copy space.
- Overlap: fully visible, not cropped, no objects covering labels, foreground partly obscures background, label unobstructed.
- Platform: square icon, vertical story, horizontal banner, wide hero, app-store screenshot, e-commerce listing.

## Prompt Rewriting Workflow

1. Identify model, mode, source images, masks, aspect ratio, quality target, and final use.
2. Choose the matching task pattern from this guide.
3. Start with the desired deliverable and the most important subject attributes.
4. Add composition, background, lighting, palette, and style.
5. Add exact text in quotes or state “no text.”
6. For edits and references, put preservation and reference roles before creative changes.
7. End with avoid-list constraints and move operational settings into Vofy flags.
8. If the request is complex, split into draft, edit, and final-quality passes.

## Examples

### E-Commerce Hero

```text
Create a premium e-commerce hero image of black wireless earbuds in an open charging case, three-quarter macro view, centered with 40% empty space on the left for copy. Matte charcoal seamless background, soft rim light on the case edge, subtle reflection, crisp commercial product photography. No text.
```

### Educational Diagram

```text
Create a clean educational diagram showing the water cycle for middle-school students. Use four large labeled stages: "Evaporation", "Condensation", "Precipitation", "Collection". Blue arrows move clockwise through the diagram. Flat vector style, white background, high contrast, large readable labels. No extra text.
```

### Reference-Based Edit

```text
Preserve the chair shape, wood grain, camera angle, and shadow from the reference image. Change only the seat cushion fabric to deep navy velvet. Match the original perspective, seams, edge softness, and studio lighting. Do not alter the chair legs or background.
```

### Transparent Asset

```text
Create a transparent-background PNG-style asset of a glossy red heart-shaped balloon, front-facing with a tied knot and short curled ribbon. Smooth clean alpha edges, subtle internal highlight, realistic latex reflections, no backdrop, no ground shadow, no text.
```

### Product Mockup

```text
Use image 1 as the exact product reference. Preserve the bottle silhouette, cap shape, front label layout, logo placement, and visible text. Create a premium studio mockup on warm beige paper, three-quarter front view, softbox reflection from upper left, subtle contact shadow, accurate glass thickness. Do not redesign the label or change the brand colors.
```

### Text Poster

```text
Create a minimalist concert poster on warm off-white paper. Large title at top: "MOON ROOM". Smaller subtitle below: "LIVE 9 PM". Centered blue crescent moon icon, generous whitespace, modern Swiss grid, crisp black typography, no extra text.
```

### UI Mockup

```text
Create a clean mobile banking app dashboard mockup on a single phone screen. Top greeting says "Good morning". Main card shows "$2,480" in large readable numbers. Three rounded action buttons: "Send", "Save", "Pay". Minimal white-and-navy interface, consistent spacing, soft shadows, no extra labels.
```

### Style Transfer

```text
Use the reference image only for the subject and pose. Recreate it as a 1970s Japanese travel poster: flat color blocks, sun-faded paper texture, simplified shadows, teal-orange palette, clean border. Preserve the subject silhouette and direction of gaze. No text.
```

## Common Failure Fixes

- **Too much creative freedom**: add deliverable, use case, composition, lighting, palette, and avoid constraints.
- **Composition mismatch**: specify viewpoint, crop, object placement, whitespace, and background.
- **Text errors**: shorten text, quote exact words, increase size, simplify layout, and request no extra text.
- **Reference drift**: identify the primary reference and explicitly state what to preserve and ignore.
- **Unnatural edit**: ask to match shadows, reflections, perspective, grain, edge softness, and material.
- **Weak transparent cutout**: request clean alpha edges, isolated subject, no backdrop, no halo, and controlled shadow behavior.
- **Product redesign**: repeat preserve rules for silhouette, label layout, logo placement, colors, and visible text.
- **Overloaded request**: split into separate generation, local edit, and final-quality passes.
- **Costly iteration**: draft at lower quality, then raise quality after composition, text, and references are approved.

## Final Rewrite Checklist

- The prompt states the asset type, use case, subject, and mode.
- Composition, camera, background, style, lighting, and color are concrete.
- Text is quoted, short, placed, and hierarchy-aware.
- Reference roles, primary reference, and ignore rules are explicit.
- Edit scope is local, preservation comes first, and integration details are included.
- Product, brand, UI, and character identity constraints are protected when relevant.
- Transparency, diagrams, and icons include readability or edge-quality constraints.
- Quality/latency/cost tradeoff is reflected in parameter hints.
- Operational settings are Vofy flags, not prompt prose.
