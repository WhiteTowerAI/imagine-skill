# Sora 2 Prompt Guide

Source: https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide

Applies to: `sora-2`, `sora-2-pro`.

Use this as an agent reference for rewriting prompts for Vofy/Sora 2. It is intentionally fuller than `SKILL.md`: keep workflow instructions short there and keep model-specific prompting detail here.

## What Sora 2 Can Be Steered With

- Text prompts can control video style, setting, subject, action, camera movement, dialogue, ambient sound, and continuity.
- Image input can anchor the first frame, composition, character appearance, product design, wardrobe, environment, and aesthetic.
- Character references can improve consistency across people, animals, or objects when supported by the route.
- Edits and extensions work best when the prompt says what stays fixed before describing what changes.
- Sora 2 responds well to cinematic language, but the strongest instructions are still visible, audible, and physically concrete.

## API And Vofy Boundaries

Do not bury hard parameters in prose. Prefer Vofy flags and capability docs:

- `--model`: `sora-2` or `sora-2-pro`.
- `--duration`: Sora API supports `4`, `8`, `12`, `16`, and `20` seconds; verify current Vofy support with `vofy models <model>`.
- `--aspect-ratio` / `--resolution`: choose through supported model constraints, not prompt text alone.
- `sora-2`: 720p portrait or landscape (`720x1280`, `1280x720`) when exposed by Vofy.
- `sora-2-pro`: 720p, 1024p, and 1080p portrait/landscape when exposed by Vofy.
- Quality tradeoff: higher resolution can improve detail and consistency but may take longer and cost more.
- Endpoints/modes differ: generation, remix/edit, extension, and character-reference workflows may expose different inputs.
- Use Vofy input flags for first-frame media, reference images/videos, remixes, extensions, and character IDs; do not invent unsupported flags.

## Prompting Mindset

- Write like a director or cinematographer briefing a shoot: what is on screen, how it moves, how it sounds, and how it is lit.
- Keep the first sentence high-signal: output style, main subject, setting, and main action.
- Choose the amount of detail intentionally: detailed prompts improve control; lighter prompts allow creative variation.
- Avoid overloading one shot with many simultaneous events, competing subjects, or contradictory styles.
- Iterate systematically. Change one variable at a time: camera, lens, action, lighting, color, dialogue, or continuity anchor.
- Short clips are easier to control. Split complex concepts into multiple clips or shot blocks.

## Detail Levels

### Lightweight Prompt

Use when creative variation is welcome.

```text
A handheld documentary-style shot of a street musician playing violin under a subway entrance at night. Rain glints on the pavement, commuters pass behind him, and the camera slowly pushes in as the final note rings out.
```

### Descriptive Prompt

Use for most agent rewrites.

```text
Style: [documentary / commercial / 16mm / animation / phone footage], [texture/grade].
Scene: [subject, wardrobe/materials, setting, weather, props].
Cinematography:
Camera shot: [framing and angle].
Camera motion: [locked-off / slow push-in / handheld follow / orbit / tilt].
Lens/depth: [wide deep focus / macro shallow focus / telephoto compression / anamorphic flare].
Lighting + palette: [source direction and quality], [3-5 color anchors].
Mood: [tone].
Actions:
- [beat 1: clear visible gesture or movement]
- [beat 2: next chronological beat]
- [final beat: ending pose, hold, or transition]
Dialogue:
- [Speaker, action]: "[short natural line]"
Background sound: [diegetic ambience only, or silence].
Avoid: [only critical exclusions].
```

### Ultra-Detailed Prompt

Use for strict cinematography, VFX, product, or continuity needs.

```text
Format & look: [capture medium], [grain/halation/texture], [grade].
Location & framing: [foreground], [midground], [background], [shot scale], [angle].
Subject/wardrobe/props: [stable identity anchors], [materials], [required text/logos].
Lighting & atmosphere: [key/fill/rim/practicals], [weather/haze/particles].
Lenses & filtration: [focal length feel], [depth of field], [filter artifacts].
Shot timing:
- 0.00-[time]s: [beat]
- [time]-[time]s: [beat]
- final second: [hold or payoff]
Sound: [diegetic audio, dialogue, no score if needed].
Continuity notes: [what must remain stable across shots/edits/extensions].
```

## Core Prompt Anatomy

```text
[Format/style], [shot scale and angle] of [subject with identity anchors] in [setting].
Start: [initial visible state].
Action: [chronological beats that fit the duration].
Camera: [one setup and one movement], [lens/framing/depth-of-field feel].
Lighting/color: [specific sources, mood, 3-5 palette anchors].
Audio: [brief dialogue, ambience, or silence cue].
Continuity: preserve [identity, outfit/product, geography, lighting, motion direction].
End: [final state or held frame].
```

Use only fields that matter. Concrete nouns, visible actions, and ordered timing beat generic adjectives.

## Subject And Scene Control

- Introduce the main subject early with stable identity anchors: age range, silhouette, outfit, material, color, logo/text, or distinctive object features.
- Describe the environment as layered composition: foreground, midground, background.
- Use specific props and textures: cracked ceramic mug, chrome espresso machine, fogged glass, frayed denim, paper lanterns.
- Make spatial relationships explicit: “the bicycle is leaning against the left wall,” “the red suitcase stays beside her right foot.”
- For products, specify exact visible surfaces, required labels, packaging shape, and what must remain legible.
- For animals or characters, avoid unnecessary trait changes between sentences.

## Style And Medium

Good style descriptions combine medium, era, capture feel, and texture:

- Documentary realism: handheld, available light, imperfect framing, natural background action.
- Commercial product: glossy highlights, clean negative space, controlled reflections, macro detail.
- Film look: 16mm grain, halation, gate weave, muted stock colors, soft highlight rolloff.
- Smartphone footage: vertical framing, casual hand shake, compressed dynamic range, autofocus breathing.
- Animation: claymation, watercolor, cel animation, stop motion, low-poly, miniature diorama.
- VFX/fantasy: practical set feel, believable scale cues, contact shadows, particles, atmospheric depth.

Avoid vague style-only prompts like `cinematic`, `beautiful`, or `epic` unless paired with concrete visual choices.

## Camera And Composition

- Pick one camera setup per shot unless writing a deliberate multi-shot sequence.
- Specify shot scale: extreme wide, wide, medium, close-up, macro, over-the-shoulder, POV, aerial.
- Specify angle: eye-level, low-angle, high-angle, top-down, Dutch tilt, profile, three-quarter view.
- Specify motion: locked-off, slow push-in, dolly out, pan left, tilt down, handheld follow, orbit, crane up.
- Use one lens/depth cue: macro shallow focus, deep-focus wide shot, telephoto compression, anamorphic flare.
- If the output drifts, use locked camera, simple background, and fewer moving subjects.

## Lighting, Color, And Atmosphere

- Name light sources: window key, tungsten practical lamp, neon sign, moon rim, overcast skylight, car headlights.
- State direction and quality: soft left key, hard backlight, low warm practicals, cool overhead fluorescents.
- Use palette anchors instead of broad adjectives: amber, teal, cream, oxblood, graphite, sodium orange.
- Include atmosphere only when important: haze, dust motes, rain mist, smoke plume, underwater particles.
- Keep lighting continuity explicit in edits/extensions: preserve source direction, time of day, shadow length, color temperature.
- For consistent series, repeat palette and light-source anchors across prompts.

## Motion And Timing

- One primary subject action plus one primary camera move is the most reliable pattern.
- Put actions in chronological order. Avoid many simultaneous unrelated actions.
- Use physical verbs and counts: steps, turns, lifts, pours, blinks, brakes, opens, folds, lands.
- Tie action density to duration:
  - 4 seconds: one clear movement plus an ending hold.
  - 8 seconds: 2-3 beats with simple transitions.
  - 12-20 seconds: structured shot blocks or a small scene arc.
- Use final-second payoffs: pause, held expression, object reveal, completed turn, settled frame.
- If motion becomes chaotic, reduce moving background elements and make the camera locked-off.

## Dialogue And Audio

- Use a labeled `Dialogue:` block for speech.
- Keep lines short enough to be spoken naturally during the clip.
- Attribute every line to a speaker and pair it with visible face/body action.
- For 4 seconds, use one or two short lines; for 8 seconds, a few brief turns can work.
- Background sound should support the scene: rain on glass, rail brakes, espresso machine hum, distant traffic, crowd murmur.
- Avoid asking for a full mixed soundtrack when diegetic ambience is enough.
- If a Vofy route does not support audio, convert speech into visible acting or omit audio.

```text
Dialogue:
- Detective, whispering: "You're lying."
- Suspect, looking away: "Maybe I'm just tired."
Background sound: rain on the window and a distant police radio.
```

## Image Input And First Frames

- Use image input to anchor the first frame, composition, character design, wardrobe, set dressing, product layout, or aesthetic.
- Preserve first, animate second: identity, outfit/product design, composition, lighting, and text/logo placement come before motion.
- For first-frame prompts, describe what happens after the provided frame rather than redescribing the entire image.
- Ensure the input image matches target video resolution when the route requires it.
- Animate only a few attributes: expression, hand motion, fabric movement, camera drift, environmental motion.
- Mention important static elements that must not change: logo placement, face, outfit, prop geometry, room layout.

```text
Use the provided first frame as the opening frame. Preserve the woman’s face, red coat, rainy window lighting, and camera angle. She slowly turns toward the glass, exhales a small fog patch, then smiles faintly. Camera remains locked. End on the same composition.
```

## Character References

- Use character references when supported to keep a person, animal, or object consistent across generations.
- Character references are created from reference video assets outside the prompt; prompts should use the actual character handle/ID supplied by Vofy.
- Short, clear reference clips work best: isolated subject, stable lighting, visible defining features, minimal occlusion, limited background distractions.
- Reference no more than two characters per generation when possible.
- In the prompt, use the same name throughout and repeat only essential anchors: face, build, outfit, species/breed, signature accessory.
- Avoid introducing conflicting age, hairstyle, color, size, or wardrobe details after the character has been anchored.

```text
A cinematic shot of Alfie running through wet grass at sunrise. Preserve Alfie’s small terrier build, cream curls, red collar, and playful ears. Camera follows low behind him as he bounds three times, turns toward camera, and pauses in warm rim light.
```

## Remix And Edits

- Start with what stays unchanged, then state the edit.
- Change one variable at a time: color grade, lens, prop, action, background detail, wardrobe, added subject, or weather.
- Preserve continuity anchors: identity, pose, camera angle, composition, light direction, product labels, and scene geography.
- Avoid edits that contradict the source frame or require large hidden geometry changes unless that is the purpose.
- When close to the target, pin successful details before requesting the next tweak.

```text
Preserve the original camera angle, woman’s pose, black dress, and candlelit restaurant background. Change only the weather visible through the window: heavy rain streaks down the glass with occasional blue lightning flashes. Keep the warm indoor lighting unchanged.
```

## Extensions

- Extensions use the full original clip as context; state continuity first, then the next action.
- Preserve camera direction, lens feel, lighting, character pose, soundbed, motion direction, and scene geography.
- Add the next logical beat rather than summarizing the original clip.
- Individual extensions can be up to 20 seconds in the Sora API and can be chained when supported by the client.
- For chained extensions, keep a continuity log: final pose, camera direction, lighting, active props, and audio bed.

```text
Continue from the final frame. Preserve the locked-off camera, warm desk-lamp lighting, rain sound, and the character’s seated posture. She closes the notebook, looks toward the door, and the lamp flickers once before the shot holds on her concerned expression.
```

## Multi-Shot Prompts

- Multi-shot prompts can work, but each block needs a clear boundary.
- Give each shot one camera setup, one main action, and one lighting recipe.
- Prefer separate generations when exact editing rhythm matters.
- Use shot blocks when continuity matters more than frame-perfect cutting.

```text
Shot 1, 0-4s: Wide eye-level establishing shot of the empty rooftop at golden hour; sheets sway and city traffic hums below.
Shot 2, 4-8s: Medium close-up of the dancer entering frame; slow dolly-in, warm edge light, red silk dress catching wind.
```

## Negative Instructions And Avoid Lists

- Use `Avoid:` sparingly for critical exclusions only.
- Prefer positive constraints over long negative lists: “locked camera, empty background” is clearer than many “no...” phrases.
- Good avoid items: extra fingers, text changes, logo changes, camera cuts, additional people, warped product shape, non-diegetic music.
- Do not include broad contradictory avoid lists that compete with the main prompt.

## Troubleshooting Rewrite Patterns

- Identity drift: add stable anchors, use character/reference input, reduce action, repeat outfit and face constraints.
- Camera drift: specify locked-off tripod or one simple movement; remove competing camera language.
- Chaotic motion: reduce background actors, split into beats, shorten duration, use final hold.
- Weak product accuracy: describe shape, material, label placement, front-facing angle, and what text must remain unchanged.
- Bad dialogue timing: shorten lines, reduce speakers, pair speech with visible mouth/face action.
- Inconsistent lighting: name source direction, time of day, palette, and shadows; repeat them in extension/edit prompts.
- Overconstrained result: remove secondary props, redundant adjectives, and low-priority avoid items.

## Weak To Strong Transformations

- Weak: `A beautiful street at night.`
- Strong: `Wet asphalt, zebra crosswalk, neon signs reflected in puddles, and a single cyclist braking at the curb under blue-pink storefront light.`

- Weak: `Person moves quickly.`
- Strong: `The cyclist pedals three times, brakes hard, and stops with one foot down in the final second.`

- Weak: `Cinematic look.`
- Strong: `Wide low-angle shot, shallow depth of field, anamorphic lens feel, warm rim light through fog, amber and teal palette.`

- Weak: `Make this image move.`
- Strong: `Use the provided image as the opening frame. Preserve the product position, label, marble counter, and soft left window light. Only animate condensation sliding down the bottle and a subtle camera push-in.`

- Weak: `Continue the video.`
- Strong: `Continue from the final frame. Preserve the handheld forward motion, blue dusk lighting, wet street reflections, and distant siren sound. The runner slows, looks back once, then turns into the alley as the camera follows.`

## Complete Example: Product Clip

```text
Style: glossy product commercial with clean macro detail and soft studio reflections.
Scene: a matte black ceramic coffee mug on a walnut desk beside cream paper and a silver spoon. The mug logo faces camera and stays readable.
Cinematography:
Camera shot: centered macro close-up at desk height.
Camera motion: slow push-in only.
Lens/depth: shallow depth of field, crisp logo, soft background falloff.
Lighting + palette: large softbox from upper left, warm rim from a tungsten desk lamp; black, walnut brown, cream, and amber.
Actions:
- Steam curls upward from the mug in thin strands.
- A hand enters from the right and gently places the spoon beside the mug.
- Final second holds on the readable logo and rising steam.
Background sound: quiet room tone and a faint ceramic clink.
Avoid: changing the logo text, extra hands, camera cuts.
```

## Complete Example: Character Clip

```text
Style: naturalistic handheld documentary footage, early morning park.
Scene: Maya, wearing a yellow raincoat and white sneakers, stands on a wet path under maple trees. Fallen orange leaves cover the ground.
Cinematography:
Camera shot: medium eye-level shot from three meters away.
Camera motion: gentle handheld follow as she walks toward camera.
Lens/depth: natural smartphone-like depth, background slightly soft.
Lighting + palette: overcast skylight, wet green leaves, yellow coat, gray path, orange leaves.
Actions:
- Maya looks down, steps around a puddle, and laughs softly.
- She raises one hand to catch a falling leaf.
- Final second holds as she looks into camera with the leaf in her palm.
Dialogue:
- Maya, smiling: "I found the perfect one."
Background sound: light rain on leaves and distant city traffic.
Continuity: preserve Maya’s yellow raincoat, white sneakers, path direction, and overcast lighting.
```

## Complete Example: Extension

```text
Continue from the final frame of the provided clip. Preserve the same handheld camera height, forward walking direction, wet pavement reflections, blue-pink neon palette, and distant traffic sound. The cyclist pushes off from the curb, pedals twice through the crosswalk, then brakes under the next streetlight. Camera follows from behind at walking speed and holds as the red brake light reflects in the puddle.
```

## Final Rewrite Checklist

- Subject, setting, style, and action are clear in the first sentence.
- Prompt detail level matches the goal: creative variation or tight control.
- Hard parameters are represented as Vofy flags, not only prompt prose.
- Motion is chronological, physically plausible, and duration-aware.
- Camera has one explicit setup and movement per shot.
- Lighting, palette, texture, and depth of field are concrete.
- Dialogue/audio is short, labeled, naturally timed, and route-supported.
- Reference preservation comes before animation, edits, or extensions.
- Character names, handles, and identity anchors stay consistent.
- Avoid list is short and critical, not a competing prompt.
