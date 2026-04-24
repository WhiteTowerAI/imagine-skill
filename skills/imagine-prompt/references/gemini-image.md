# Gemini Image Prompt Guide

Source: https://ai.google.dev/gemini-api/docs/image-generation?hl=zh-cn#prompt-guide

Applies to: `gemini-2.5-flash-image`, `gemini-3-pro-image-preview`, `gemini-3.1-flash-image-preview`.

## Primary Prompting Principle

- Write prompts as complete, descriptive instructions; Gemini responds better to clear natural language than to comma-separated tags.
- Include intent and context, not just visual attributes: what the image is for, who or what matters, and what should be easy to recognize.
- Be specific about the visual outcome: subject, action, environment, composition, lighting, mood, palette, material, texture, and text.
- Use ordered steps for complex edits, multi-image composition, diagrams, or sequential scenes.
- Prefer positive descriptions of the desired scene over long negative lists; use explicit exclusions only for critical failure cases.
- Put model capabilities in Vofy flags when available: model, mode, input images, aspect ratio, resolution, reasoning, search, and output handling.

## Prompt Anatomy

```text
Create [image type] for [purpose/context].
Show [specific subject], [action/expression], set in [environment/background].
Use [composition/shot/camera angle], [lens or render traits], [lighting], [mood], and [palette].
Emphasize [materials, textures, details, product/brand constraints].
Text: [exact quoted text, font description, placement, or "no text"].
Preserve/change: [reference-image or edit constraints].
Output: [layout, aspect ratio, or platform need when not handled by flags].
Avoid: [only critical exclusions].
```

## Generation Prompt Patterns

### Photorealistic People Or Scenes

Use when the target should look like a real photo.

Include:

- Subject identity, age range or role, expression, pose, and action.
- Location, time of day, weather, props, and background details.
- Shot type, camera angle, focal length or depth of field, and framing.
- Lighting type, light direction, mood, palette, and level of realism.
- Texture details such as skin, fabric, metal, glass, dust, water, or plants.

Template:

```text
Create a photorealistic [shot type] of [subject] [action/expression] in [setting]. Use [camera angle/lens/framing], [lighting], [mood], and [palette]. Emphasize [specific textures/details]. No text.
```

### Stylized Illustration

Use when the target should be clearly drawn, painted, rendered, or designed.

Include:

- Medium: watercolor, vector, ink, clay render, 3D toy, paper cutout, pixel art, isometric, editorial illustration.
- Shape language: rounded, geometric, delicate, chunky, simplified, ornate.
- Line quality, brush texture, shading, and detail level.
- Palette, background, composition, and intended use.

Template:

```text
Create a [medium/style] illustration of [subject] for [use]. Use [shape language], [line/brush/render traits], [palette], and [composition]. Keep the background [simple/specific]. No text unless specified.
```

### Stickers, Icons, Mascots, And Assets

Use for isolated assets that may be cut out or placed into apps.

Include:

- A single strong subject with readable silhouette.
- Asset style, outline, shadow, palette, and background.
- Facial expression or brand personality for mascots.
- White or plain background; do not rely on transparent-background wording unless the model/tool explicitly supports it.

Template:

```text
Create a [sticker/icon/mascot] of [subject] with [expression/personality]. Use [style], clean outlines, simple readable shapes, [palette], and a plain white background. Center the subject with generous padding. No text.
```

### Text, Logos, Posters, And Layouts

Use when text accuracy or visual hierarchy matters.

Include:

- Exact text in quotation marks.
- Font description rather than obscure font names.
- Placement, hierarchy, alignment, spacing, and contrast.
- Logo mark concept, brand mood, palette, and background.
- “No extra text” when accuracy matters.

Template:

```text
Create a [logo/poster/layout] for [brand/concept]. Render exactly the text "[TEXT]" in [font style], placed [position]. Use [visual style], [palette], [layout constraints], and high contrast. No extra text.
```

### Product And Commercial Photography

Use for ads, catalog shots, packaging, product pages, and mockups.

Include:

- Product shape, material, color, finish, label/logo preservation, and visible features.
- Surface, background, props, and scale cues.
- Lighting setup, reflection, shadow, camera angle, and focus.
- Commercial mood: premium, playful, clinical, editorial, lifestyle, luxury, tech.

Template:

```text
Create a professional product photograph of [product] for [use]. Show [geometry/material/features] on [surface/background]. Use [camera angle], [lighting setup], crisp focus on [feature], realistic shadows/reflections, and a [brand mood] palette. Preserve [logo/text/details].
```

### Minimal Designs And Negative Space

Use when future copy or UI elements need space.

Include:

- Exact subject placement and size in frame.
- Empty region location and style.
- Background color, gradient, texture, or environment.
- Mood, lighting, and platform use.

Template:

```text
Create a [style] image for [platform/use]. Place [subject] in [frame position/size]. Leave a large clean empty area on [side/top/bottom] for future text. Use [background], [lighting], and [palette]. No text.
```

### Diagrams, Infographics, And Educational Images

Use when the image must explain a concept clearly.

Include:

- Diagram style and audience level.
- Limited, exact labels.
- Spatial relationship, arrows, callouts, color coding, and hierarchy.
- Readability, high contrast, and clean background.

Template:

```text
Create a clean [diagram/infographic] explaining [concept] for [audience]. Show [components] arranged [layout]. Add exactly [number] labels: "[A]", "[B]", "[C]". Use [arrows/callouts/color coding], high contrast, and a plain background. No extra text.
```

### Sequential Art And Storyboards

Use for comics, panel sequences, process visuals, and shot boards.

Include:

- Number of panels and reading direction.
- Consistent character description and style.
- Per-panel action beats and any captions.
- Continuity constraints for clothing, props, location, and lighting.

Template:

```text
Create a [number]-panel [comic/storyboard] in [style]. Keep [character] consistent across all panels: [appearance/clothing]. Panel 1: [beat]. Panel 2: [beat]. Panel 3: [beat]. Use [layout], [palette], and [caption/text rules].
```

## Editing Prompt Patterns

### Add, Remove, Or Modify A Specific Element

Use for targeted changes to an existing image.

Include:

- What the source image contains.
- The exact change.
- What must stay identical.
- Matching style, lighting, shadows, perspective, texture, and scale.

Template:

```text
Using the provided image of [source], change only [target element] to [new description]. Keep [unchanged elements] exactly the same. Match the existing [style/lighting/shadows/perspective/texture].
```

### Local Repainting Or Masked Edit

Use when a mask or a clearly localized region exists.

Include:

- The affected region in words even if a mask is present.
- The desired replacement.
- Strong “keep everything else unchanged” instruction.
- Integration requirements for edges, shadows, reflections, and perspective.

Template:

```text
Edit only the [masked/specified region]: [change]. Preserve every unmasked part of the image, including [identity/composition/background/lighting/camera]. Blend the edit naturally with matching shadows, edges, and perspective.
```

### Style Transfer

Use to re-render an existing scene in a new visual style.

Include:

- Preserve composition, subject layout, pose, and key identity details.
- Target medium, rendering style, brushwork, palette, lighting, and texture.
- What not to reinterpret: faces, products, logos, text, or proportions.

Template:

```text
Transform the provided image into [target style]. Preserve the original composition, subject placement, pose, and key details. Render it with [medium/brush/render traits], [palette], and [lighting]. Do not alter [identity/logo/text/proportions].
```

### Sketch, Wireframe, Or Rough Concept Refinement

Use to turn drafts into polished visuals.

Include:

- What the sketch represents.
- Which sketch features must remain.
- Desired final material, style, detail level, lighting, and environment.
- Any labels or UI details that must remain exact.

Template:

```text
Refine this rough [sketch/wireframe] into a polished [final style]. Preserve [layout/shape/key markings]. Add [materials/details/environment/lighting] while keeping the original concept recognizable. Keep any visible text exactly as provided.
```

### Character Consistency

Use for new poses, views, scenes, or expressions using an existing character image.

Include:

- Reference image role for character identity.
- Distinctive traits to preserve.
- New pose, camera angle, expression, clothing change, or environment.
- If pose is difficult, provide or mention a separate pose reference and assign its role.

Template:

```text
Use image 1 as the character identity reference. Preserve [face shape, hairstyle, outfit, colors, proportions, distinctive marks]. Create a new image of the same character [new pose/action/view] in [setting]. Match the original design style while changing only [intended changes].
```

### High-Fidelity Preservation

Use when exact likeness, product marks, labels, UI, or geometry are critical.

Include:

- The high-value details that must remain exact.
- The specific allowed change.
- Instruction to avoid reinterpretation or simplification of those details.

Template:

```text
Preserve [face/logo/product shape/label/UI text] with high fidelity. Do not redraw, simplify, or reinterpret those details. Change only [allowed target] to [new result], matching the original image’s camera, lighting, perspective, and texture.
```

### Multi-Image Composition

Use when multiple references provide identity, style, layout, background, pose, or product details.

Template:

```text
Use image 1 as [identity/product/layout source].
Use image 2 as [style/background/material/pose reference].
Use image 3 as [optional additional role].
Create [final image description].
Preserve [critical identity/logo/text/proportions/composition].
Make the result unified by matching [lighting, shadows, perspective, color temperature, texture, scale].
```

## Text Rendering Guidance

- Quote exact text and keep it short.
- Describe the font style in plain visual terms: clean bold sans-serif, elegant serif, handwritten marker, rounded playful letters, condensed editorial type.
- Specify placement, alignment, size hierarchy, contrast, and surrounding whitespace.
- For logos, define the relationship between wordmark and symbol.
- For diagrams, use a small number of labels and explicit arrows or callouts.
- Add “no extra text” when text accuracy matters.
- For best results on text-heavy visuals, write the text content first, then ask for a visual layout that renders that exact copy.
- Prefer `gemini-3-pro-image-preview` for professional assets, complex text, or high-fidelity typography when available.

## Semantic Negative Prompting

Gemini generally responds better when the target state is described positively.

Prefer:

```text
Create an empty modern kitchen countertop with a clean marble surface, no objects on the counter, and soft morning light.
```

Instead of only:

```text
No cups, no plates, no appliances, no clutter.
```

Use direct exclusions when they are essential, but pair them with a clear positive scene description.

## Model-Specific Capability Notes

- `gemini-2.5-flash-image`: fast interactive image generation and editing; useful for rapid iteration, conversational edits, and small reference sets.
- `gemini-3-pro-image-preview`: stronger for professional visuals, richer reasoning, high-fidelity text, up to 4K output, and larger multi-image reference workflows.
- `gemini-3.1-flash-image-preview`: focused image generation/editing preview with strong likeness/detail preservation in supported workflows.
- Image generation accepts text and images as inputs; audio and video inputs are not supported for these image workflows.
- Requested image counts may not be returned exactly; design prompts so one strong output is acceptable unless the CLI/model explicitly supports multiple outputs.
- Generated images include SynthID watermarking.

## Search And Reasoning Hints

- Use search-capable flags for current products, places, landmarks, wildlife, events, weather, score graphics, or factual visual references.
- Do not rely on Google Search grounding for real-world images of people with `gemini-3.1-flash-image-preview`.
- Use reasoning-capable flags for complex layouts, multi-reference composition, diagrams, precise product constraints, and high-fidelity text.
- Keep search/reasoning as execution parameters; the prompt should still specify the desired final visual result.

## Input Reference Limits

Check `imagine-models` or `vofy models <model>` for the current source of truth. As of this guide:

- `gemini-2.5-flash-image`: up to 3 input images.
- `gemini-3-pro-image-preview`: up to 5 high-fidelity input images and up to 14 total images.
- `gemini-3.1-flash-image-preview`: can preserve likeness for up to 4 characters and detail fidelity for up to 10 objects in one workflow.

## Vofy Parameter Hints

- Put visual intent in `--prompt`.
- Use `--image` for source images or references when the selected mode supports it.
- Use aspect ratio and resolution flags rather than burying hard technical output constraints only in prose.
- Use search/reasoning flags only if the selected Vofy model exposes them.
- Do not invent flags; verify with `vofy models <model>` or `skills/imagine-models/`.

## Examples

### Photorealistic Portrait

```text
Create a photorealistic close-up portrait for an artisan profile. Show an elderly Japanese ceramicist with deep sun-etched wrinkles and a warm, knowing smile as he inspects a freshly glazed tea bowl in a rustic, sunlit workshop. Use a vertical portrait composition, soft golden-hour window light, an 85mm portrait lens with gentle bokeh, and a serene masterful mood. Emphasize clay texture, apron fabric, shelves of pottery, and warm earth tones. No text.
```

### Stylized Illustration

```text
Create a whimsical watercolor illustration for a children’s book cover. Show a small fox wearing a navy scarf, standing under giant glowing mushrooms in a rainy forest. Use soft brush edges, gentle ink outlines, a teal and amber palette, visible paper texture, and a magical cozy mood. Leave clean space at the top for a future title. No text.
```

### Sticker Asset

```text
Create a cute sticker of a sleepy orange tabby cat curled around a tiny laptop. Use rounded shapes, thick white outline, soft cel shading, warm pastel colors, and a plain white background. Center the sticker with generous padding. No text.
```

### Product Photography

```text
Create a high-resolution studio product photograph for a minimalist coffee brand. Show a matte ivory ceramic mug on a pale stone surface, with the handle turned 45 degrees toward camera. Use a three-point softbox lighting setup, a low three-quarter camera angle, crisp focus on the ceramic rim, soft contact shadow, and a subtle reflection. Clean warm-gray background, premium catalog style. No text.
```

### Logo With Text

```text
Create a modern minimalist logo for a coffee shop called "The Daily Grind". Render exactly the text "The Daily Grind" in a clean, bold sans-serif style inside a simple circle. Use black and white only, integrate a coffee bean shape in a clever but readable way, centered composition, high contrast. No extra text.
```

### Diagram With Labels

```text
Create a clean flat-vector diagram explaining how a plant absorbs water for elementary students. Show soil, roots, stem, and leaves arranged vertically. Add exactly three large labels: "Roots", "Stem", "Leaves". Use blue arrows moving from soil through roots to leaves, high contrast, and a white background. No extra text.
```

### Local Edit

```text
Using the provided image of the living room, change only the blue sofa to a vintage brown leather chesterfield sofa. Keep the pillows, wall art, floor, windows, camera angle, lighting, shadows, and overall composition exactly the same. Match the new sofa to the room’s perspective and soft daylight.
```

### Style Transfer

```text
Transform the provided city street photo into a detailed ink-and-watercolor travel illustration. Preserve the street layout, buildings, pedestrians, and camera angle. Use delicate black linework, loose transparent washes, warm afternoon light, and subtle paper texture. Do not change storefront signs or visible text.
```

### Multi-Image Product Composite

```text
Use image 1 for the exact perfume bottle shape, cap, label, logo placement, and product proportions. Use image 2 only for the warm golden studio lighting and satin background texture. Create a premium centered product ad with a soft reflection beneath the bottle, realistic shadows, cream-gold palette, and sharp label detail. Preserve all label text; no extra text.
```

### Character Consistency

```text
Use image 1 as the character identity reference. Preserve the character’s round face, short silver hair, teal jacket, yellow scarf, and compact proportions. Create a new three-quarter rear view of the same character looking over a snowy mountain valley at sunrise. Keep the same stylized 3D toy render style and soft warm lighting.
```

### Sequential Panels

```text
Create a 4-panel silent comic in a clean pastel vector style. Keep the same small robot character in every panel: round head, blue body, single antenna, expressive eyes. Panel 1: the robot finds a wilted plant. Panel 2: it brings a tiny watering can. Panel 3: the plant grows a flower. Panel 4: the robot smiles beside the flower. Use consistent lighting and no text.
```

### Semantic Negative Prompt

```text
Create a cinematic wide-angle photo of an empty desert highway at dawn. The road stretches into open sand with no signs of traffic, no parked vehicles, and no buildings on the horizon. Use low warm sunlight, long shadows, dusty atmosphere, and a quiet isolated mood.
```

## Common Failure Fixes

- **Prompt is too tag-like**: rewrite it as a descriptive paragraph with subject, action, setting, lighting, camera, mood, and purpose.
- **Result ignores reference images**: assign every image a role and state what each one controls.
- **Text is wrong**: shorten copy, quote exact text, describe font and placement, and request no extra text.
- **Layout is messy**: reduce object count, specify positions, and use step-by-step instructions.
- **Edit drifts too much**: begin with what must remain unchanged, then describe the single allowed change.
- **Unwanted objects appear**: describe the desired clean/empty state and add only the most important exclusions.
- **Style is inconsistent**: specify medium, line quality, rendering method, palette, and detail level.
- **Product or face changes**: explicitly preserve identity, geometry, logos, labels, proportions, camera, and lighting.

## Final Rewrite Checklist

- The prompt reads like a clear instruction or scene description, not a tag list.
- Purpose/context is explicit when it affects design decisions.
- Subject, action, setting, composition, lighting, mood, textures, and palette are concrete.
- Reference-image roles and preservation rules are named when inputs exist.
- Exact text is quoted, minimal, and has placement/font guidance.
- Complex scenes or edits are broken into ordered steps.
- Negative constraints are framed as desired visual states where possible.
- Search/reasoning/ratio/resolution controls are handled through Vofy flags when supported.
