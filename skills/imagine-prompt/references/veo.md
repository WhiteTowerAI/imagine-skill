# Veo Prompt Guide

Source: https://ai.google.dev/gemini-api/docs/video?hl=zh-cn&example=dialogue#prompt-guide

Applies to: `veo-3.1`, `veo-3.1-fast`, `veo-3.1-lite`.

## Model Behavior

- Veo prompts should read like a short video brief, not a keyword pile.
- Start with the core idea, then add concrete video terms and modifiers.
- Specify subject, context, action, style, camera motion, composition, and ambiance.
- Add lighting, color, sound, lens, and focus details when they affect the result.
- Motion reliability improves when actions are chronological and duration-aware.
- Dialogue, sound effects, and ambient sound can be prompted when the selected Vofy model, mode, and flags support audio.
- Use Vofy flags for duration, aspect ratio, resolution, audio, first/last frames, references, and modes.
- Do not prompt for harmful, unsafe, or policy-blocked content; Veo may reject prompts or outputs.

## Core Prompt Anatomy

```text
[Style/format], [shot type] of [subject] [main action] in [location/context].
Start: [initial state].
Action: [ordered motion/change that fits duration].
Camera: [movement, angle, framing].
Composition: [foreground/midground/background or subject placement].
Lens/focus: [depth of field, macro, wide-angle, soft focus, focal emphasis].
Ambiance: [lighting, color palette, mood, weather, environmental sound].
End: [final state].
```

Use the full anatomy for complex video prompts. For simple prompts, keep one fluent paragraph with the same information.

## Prompt Elements

- **Subject**: person, animal, product, vehicle, object, environment, or character identity.
- **Context**: location, time of day, weather, props, crowd level, architecture, background activity.
- **Action**: one clear visible action, or 2-3 simple beats for longer clips.
- **Style**: cinematic, documentary, commercial, handheld phone, animated, stop-motion, hyperreal, macro, slow motion.
- **Camera motion**: dolly in, pan left, tracking shot, orbit, crane up, locked-off tripod, handheld follow.
- **Composition**: wide shot, medium close-up, close-up, low angle, overhead, centered, over-the-shoulder.
- **Focus and lens effects**: shallow depth of field, deep focus, rack focus, soft focus, macro, wide-angle, reflected details.
- **Ambiance**: color scheme, lighting, mood, weather, environmental motion, sound effects, ambient sound.

Use descriptive adjectives and adverbs, but keep each detail tied to something visible or audible in the clip.

## Prompt Modifiers

Add modifiers only when they improve control:

- **Lighting**: golden-hour backlight, soft studio reflections, neon glow, moonlit blue shadows, overcast diffuse light.
- **Color**: muted earth tones, high-contrast black and gold, cool blue palette, saturated candy colors.
- **Pacing**: slow graceful movement, energetic handheld pace, subtle idle motion, deliberate reveal.
- **Texture**: glossy metal, handmade paper, misty glass, dusty shelves, wet asphalt.
- **Atmosphere**: quiet room tone, distant traffic, ocean wind, cafe murmur, mechanical click.

Avoid stacking many unrelated modifiers. Prioritize the 3-5 traits that define the shot.

## Duration-Aware Beat Planning

For 4-6 seconds:

```text
Start: [initial pose/scene].
Action: [one visible movement].
End: [clear final pose/object state].
```

For 8+ seconds:

```text
0-2s: [establish subject and setting].
2-6s: [main action].
6-8s+: [reaction, reveal, or ending hold].
```

Do not request many locations, fast cuts, or complex story arcs in a short clip. If the story needs multiple shots, generate separate clips.

## Dialogue And Audio

- Keep spoken lines short and natural.
- Attribute each line to a speaker.
- Put exact spoken lines in quotation marks.
- Match line length to duration.
- Describe facial expression or action around the line.
- Add sound effects and ambient noise explicitly when they matter.
- If audio is unsupported, convert dialogue/sound into visual acting or omit it.

```text
Medium close-up dialogue scene in a rainy cafe. A woman looks up from a notebook, half-smiles, and says, "I think we found it." Camera slowly pushes in, warm cafe lights behind her, raindrops streaking the glass, quiet room tone.
```

For face-forward clips, specify portrait framing, expression, eye direction, and the facial detail that should remain in focus.

## Camera Guidance

- Use one primary camera move per prompt.
- Combine shot scale and motion: medium close-up with slow push-in, wide aerial tracking shot, low-angle locked-off shot.
- If action is complex, keep camera still.
- If camera is dynamic, keep subject action simple.
- Avoid contradictory instructions like “locked-off handheld orbit.”
- Avoid vague camera phrases like “make it cinematic” unless paired with specific framing, light, and motion.

## Image-To-Video

Start with preservation:

```text
Use the provided image as the starting frame. Preserve [subject identity, outfit/product design, composition, lighting, text/logo].
Animate only [specific motion]. Camera [movement or locked]. End with [final state].
```

Choose an input image that already resembles the desired opening frame. For drawings, paintings, products, or natural scenes, describe the motion and sound to add rather than redescribing every visible detail.

For product animation, preserve product geometry, logo placement, and label text; animate camera, lighting, environment, or simple object motion.

## First And Last Frame

Use first + last frame mode when the beginning and ending states matter more than the exact path.

```text
Use the first image as the opening frame and the second image as the final frame. Preserve [subject/style/setting]. Create a smooth, plausible transition where [subject/action/change] connects the two frames. Camera [movement or locked].
```

- Keep the transition physically plausible.
- Avoid asking for new subjects or settings that are not present in either frame.
- Use simple motion when the two frames differ significantly.

## Reference Assets

- Assign each reference a role: identity, style, movement, environment, product design, or sound.
- For Veo 3.1 reference images, use up to three asset references for the same person, character, or product when appearance preservation matters.
- Use reference images for consistency, not as a substitute for describing the desired action.
- If references conflict, state which reference wins for identity, style, or setting.

```text
Use reference image 1 for the character identity and outfit. Use reference image 2 for the neon city lighting style. Keep the character's face, hair, and jacket consistent while she walks through a rain-soaked alley.
```

## Video Extension

- Continue from the final second of the clip.
- Preserve existing subject state, camera direction, lighting, motion speed, and scene geography.
- Add only the next natural beat instead of restarting the scene.
- If the final second is silent, do not rely on strong audio continuation.

```text
Continue from the final moment of the provided video. Preserve the same handheld camera direction, rainy night lighting, and walking pace. The character turns toward a glowing storefront, pauses, and reaches for the door handle as traffic reflections ripple on the pavement.
```

## Aspect Ratio And Platform Fit

Set aspect ratio with Vofy flags when supported; reinforce composition in the prompt only when the framing matters.

- **16:9**: cinematic landscape, wide environments, product reveals, group action.
- **9:16**: mobile social video, portrait framing, single subject, vertical motion.
- **1:1**: centered product, icon-like compositions, compact social previews.

Do not rely on prompt text alone for aspect ratio, duration, or resolution when Vofy exposes flags.

## Negative Guidance

Veo prompts usually work better with positive direction than long negative lists.

Prefer:

```text
Keep the camera locked, the subject centered, and the background softly blurred.
```

Instead of:

```text
No shaky camera, no extra people, no background clutter, no blur problems.
```

Use explicit “do not change” constraints for source-driven modes when preservation is critical.

## Style Examples

### Cinematic Scene

```text
Cinematic wide shot of a lone hiker crossing a black volcanic beach at dawn. The scene starts with the hiker small against the shoreline, then she walks toward a thin beam of golden light breaking through clouds. Camera slowly tracks sideways, waves rolling in the background, cool blue shadows with warm sunrise rim light, quiet wind ambiance.
```

### Product Commercial

```text
Premium macro commercial shot of a silver smartwatch on a dark stone surface. The clip starts on a close-up of the crown, then the camera slowly orbits to reveal the screen lighting up. Soft studio reflections glide across the metal edge, black and cool-blue palette, subtle mechanical click sound if audio is supported.
```

### Dialogue

```text
Medium close-up dialogue scene in a small bookstore at night. A young bookseller closes an old ledger, looks toward someone off-camera, and says, "This copy was never meant to be sold." Camera slowly pushes in, warm lamp light, dusty shelves behind her, quiet street rain outside.
```

### Animated Style

```text
Whimsical stop-motion style shot of a paper boat sailing across a kitchen sink like an ocean. The boat bobs through tiny soap bubbles, passes a spoon like a silver island, and ends under a dripping faucet. Camera is locked-off, warm afternoon light, handmade paper texture.
```

### Portrait With Audio

```text
Vertical medium close-up of a chef in a bright test kitchen, framed from chest up. She smiles directly at camera and says, "The secret is patience." Camera is locked, shallow depth of field keeps her eyes sharp, warm overhead light, soft kitchen clatter in the background.
```

### Natural Scene From Image

```text
Use the provided forest image as the starting frame. Preserve the mossy rocks, tall pine trees, and misty morning light. Animate a gentle breeze moving the branches while thin fog drifts between the trunks. Camera slowly pushes forward along the path, quiet bird calls and distant water if audio is supported.
```

## Common Failure Fixes

- **Too much happens**: reduce to one subject, one action, one camera move.
- **Weak motion**: add start, middle, and end beats.
- **Camera confusion**: choose either moving camera or locked camera.
- **Style mismatch**: add style, lighting, palette, texture, and medium.
- **Flat composition**: specify shot scale, subject placement, foreground/background, and focus.
- **Dialogue problems**: shorten the line, attribute the speaker, and describe expression.
- **Audio mismatch**: name the exact sound source and keep it consistent with the scene.
- **Reference drift**: start with preservation instructions and assign each reference a role.
- **Product/logo drift**: explicitly preserve geometry, logo placement, label text, colors, and materials.
- **Unrealistic transition**: simplify motion between first and last frames.

## Final Rewrite Checklist

- Subject, action, and setting are explicit.
- Prompt uses a natural video brief, not only keyword tags.
- Motion is chronological and duration-aware.
- Camera movement and shot scale are specified.
- Composition and subject placement are clear.
- Focus, lens, lighting, palette, and ambiance are concrete.
- Dialogue/audio is short, attributed, and supported by the chosen model/mode.
- Reference preservation comes before animation instructions.
- Aspect ratio, duration, resolution, and mode are handled with Vofy flags when available.
- Prompt avoids unsafe content and unsupported controls.
