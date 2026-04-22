# Video Models — Detailed Reference

> Auto-generated from model-manifest.json. Hand-written notes in NOTES blocks are preserved.

## grok-imagine-video

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, reference_images, video_to_video, video_extension |
| Aspect Ratios | 2:3, 3:2, 1:1, 16:9, 9:16, 4:3, 3:4, auto |
| Resolutions | 720p, 480p |
| Duration | 1-15s |
| Supports Auto | yes |
| Base Price | 1 credits |

Per-mode constraints:
  - text_to_video: AR: 2:3, 3:2, 1:1, 16:9, 9:16, 4:3, 3:4, Res: 720p, 480p, Duration: 1-15s
  - image_to_video: AR: 2:3, 3:2, 1:1, 16:9, 9:16, 4:3, 3:4, auto, Res: 720p, 480p, Duration: 1-15s
  - reference_images: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, Res: 480p, 720p, Duration: 1-15s
  - video_to_video: AR: 16:9, Res: 720p, Duration: 5s
  - video_extension: AR: 16:9, Res: 720p, Duration: 2-10s

Per-mode limits:
  - video_to_video: derived (auto-set): aspect_ratio, resolution, duration
  - video_extension: derived (auto-set): aspect_ratio, resolution

Input Constraints:
- video: formats: mp4, max 8.7s

Pricing:
- Base: 1 credits
- 30 pricing tiers (varies by resolution/duration/mode)
- Range: 6–120 credits

Provider Routes:
- route_a (1x)
    - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, Res: 480p, 720p, Dur: 1-15s
    - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, auto, Res: 480p, 720p, Dur: 1-15s
    - reference_images: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, Res: 480p, 720p, Dur: 1-15s
    - video_to_video: AR: 16:9, Res: 720p, Dur: 5s
    - video_extension: AR: 16:9, Res: 720p, Dur: 2-10s
- route_b (0.5x)
    - text_to_video: AR: 2:3, 3:2, 1:1, Res: 720p, Dur: 6, 10s
    - image_to_video: AR: 2:3, 3:2, 1:1, Res: 720p, Dur: 6, 10s
- route_c (0.5x)
    - text_to_video: AR: 2:3, 3:2, 1:1, Res: 720p, Dur: 10s
    - image_to_video: AR: 2:3, 3:2, 1:1, Res: 720p, Dur: 10s

Route-specific restrictions:
- route_b: when mode=reference_images/video_to_video/video_extension — Route B is not available for this mode
- route_b: when aspect_ratio=16:9/9:16/4:3/3:4/auto — Route B only supports 1:1, 3:2, and 2:3 aspect ratios
- route_b: when resolution=480p — Route B only supports 720p
- route_b: when duration=1/2/3/4/5/7/8/9/11/12/13/14/15 — Route B only supports 6s and 10s
- route_c: when mode=reference_images/video_to_video/video_extension — Route C is not available for this mode
- route_c: when aspect_ratio=16:9/9:16/4:3/3:4/auto — Route C only supports 1:1, 3:2, and 2:3 aspect ratios
- route_c: when resolution=480p — Route C only supports 720p
- route_c: when duration=1/2/3/4/5/6/7/8/9/11/12/13/14/15 — Route C only supports 10s

Validation Rules:
- When mode=video_to_video: forbid aspect_ratio — video_to_video follows the source video aspect ratio
- When mode=video_to_video: forbid resolution — video_to_video follows the source video resolution
- When mode=video_extension: forbid aspect_ratio — video_extension follows the source video aspect ratio
- When mode=video_extension: forbid resolution — video_extension follows the source video resolution

<!-- NOTES:grok-imagine-video -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## kling-2.6

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, interpolation, motion_control |
| Aspect Ratios | 16:9, 9:16, 1:1 |
| Resolutions | 720p, 1080p |
| Duration | 5, 10s |
| Defaults | aspect_ratio=16:9, resolution=720p, duration=5 |
| Supports Auto | no |
| Base Price | 26 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, 1:1, Res: 720p, 1080p, Duration: 5, 10s
  - image_to_video: AR: 16:9, Res: 720p, 1080p, Duration: 5, 10s
  - motion_control: AR: 16:9, Res: 720p, 1080p, Duration: 5s
  - interpolation: AR: 16:9, Res: 1080p, Duration: 5, 10s

Special Parameters:
- `--audio` — Generate audio together with the video when supported by the model. Default: false.
- `--character-orientation <image|video>` — Choose whether character motion and framing should follow the uploaded image or the source video. **Required.**
- `--keep-original-audio` — Keep the original soundtrack from the source video instead of replacing or dropping it. Default: true.

Input Constraints:
- prompt: max 2500 chars
- first_frame: max 10MB, formats: jpg/jpeg/png, min 300px, max 65536px, aspect ratio range: 0.4–2.5
- last_frame: max 10MB, formats: jpg/jpeg/png, min 300px, max 65536px, aspect ratio range: 0.4–2.5
- video: max 100MB, formats: mp4/mov, min 340px, max 3850px, min 3s, max 30s, when character_orientation=video: max 30s, when character_orientation=image: max 10s

Pricing:
- Base: 26 credits
- mode=standard/image_to_video/interpolation/text_to_video, resolution=720p, duration=5: 26 credits
- mode=standard/image_to_video/interpolation/text_to_video, resolution=720p, duration=10: 51 credits
- mode=standard/image_to_video/interpolation/text_to_video, resolution=1080p, duration=5: 40 credits
- mode=standard/image_to_video/interpolation/text_to_video, resolution=1080p, duration=10: 80 credits
- mode=audio, resolution=720p, duration=5: 51 credits
- mode=audio, resolution=720p, duration=10: 100 credits
- mode=audio, resolution=1080p, duration=5: 80 credits
- mode=audio, resolution=1080p, duration=10: 160 credits

Provider Routes:
- route_b (0.5x)
    - text_to_video: AR: 16:9, 9:16, 1:1, Res: 720p, 1080p, Dur: 5, 10s
    - image_to_video: AR: 16:9, Res: 720p, 1080p, Dur: 5, 10s
    - motion_control: AR: 16:9, Res: 720p, 1080p, Dur: 5s
    - interpolation: AR: 16:9, Res: 1080p, Dur: 5, 10s
- route_c (0.5x)
    - text_to_video: AR: 16:9, 9:16, 1:1, Res: 720p, 1080p, Dur: 5, 10s
    - image_to_video: AR: 16:9, Res: 720p, 1080p, Dur: 5, 10s
    - motion_control: AR: 16:9, Res: 720p, 1080p, Dur: 5s
    - interpolation: AR: 16:9, Res: 1080p, Dur: 5, 10s

Validation Rules:
- When mode=text_to_video/image_to_video/interpolation, resolution=720p: forbid audio — 720p does not support audio
- When mode=image_to_video: forbid aspect_ratio — aspect_ratio follows first_frame in image_to_video
- When mode=image_to_video: forbid last_frame — use mode=interpolation for last_frame
- When has last_frame: require resolution=1080p — last_frame requires resolution=1080p
- When has last_frame: forbid audio — last_frame does not support audio
- When mode=motion_control: forbid last_frame
- When mode=motion_control: forbid duration
- When mode=motion_control: forbid aspect_ratio
- When mode=motion_control: force audio=null — audio is not applicable to motion_control

<!-- NOTES:kling-2.6 -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## kling-3.0-motion-control

| Property | Value |
|----------|-------|
| Modes | motion_control |
| Aspect Ratios | 16:9 |
| Resolutions | 720p, 1080p |
| Duration | 3s |
| Supports Auto | no |
| Hidden Controls | duration, aspect_ratio, audio |
| Base Price | 14.5 credits |
| Pricing Unit | per_second |

Per-mode constraints:
  - motion_control: AR: 16:9, Res: 720p, 1080p, Duration: 3s

Special Parameters:
- `--audio` — Generate audio together with the video when supported by the model. Default: false.
- `--character-orientation <image|video>` — Choose whether character motion and framing should follow the uploaded image or the source video. **Required.**
- `--keep-original-audio` — Keep the original soundtrack from the source video instead of replacing or dropping it. Default: true.

Input Constraints:
- prompt: max 2500 chars
- first_frame: max 10MB, formats: jpg/jpeg/png, min 300px, max 65536px, aspect ratio range: 0.4–2.5
- video: max 100MB, formats: mp4/mov, min 340px, max 3850px, min 3s, max 30s, when character_orientation=video: max 30s, when character_orientation=image: max 10s

Pricing:
- Base: 14.5 credits
- Unit: per_second
- resolution=720p: 14.5 credits
- resolution=1080p: 16 credits

Provider Routes:
- route_b (0.5x)

Validation Rules:
- When mode=motion_control: forbid last_frame
- When mode=motion_control: forbid duration
- When mode=motion_control: forbid aspect_ratio
- When mode=motion_control: force audio=null — audio is not applicable to motion_control

<!-- NOTES:kling-3.0-motion-control -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## kling-3.0

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, interpolation, motion_control |
| Aspect Ratios | 16:9, 9:16, 1:1 |
| Resolutions | 720p, 1080p |
| Duration | 3-15s |
| Defaults | aspect_ratio=16:9, resolution=720p, duration=5 |
| Supports Auto | no |
| Base Price | 30 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, 1:1, Res: 720p, 1080p, Duration: 3-15s
  - image_to_video: AR: 16:9, Res: 720p, 1080p, Duration: 3-15s
  - interpolation: AR: 16:9, Res: 720p, 1080p, Duration: 3-15s
  - motion_control: AR: 16:9, Res: 720p, 1080p, Duration: 3s

Special Parameters:
- `--audio` — Generate audio together with the video when supported by the model. Default: false.
- `--multi-shot` — Split one generation into multiple consecutive shots so you can build a sequence instead of a single continuous clip. Default: false.
- `--shot-type <customize|intelligence>` — Choose how multi-shot scenes are controlled. Customize uses per-shot instructions, while intelligence lets the model plan the sequence from one prompt.
- `--multi-prompt <json>` — Provide the prompt and duration for each individual shot when multi-shot customize mode is enabled.
- `--element-list <json>` — Provide structured scene elements for models that support explicit shot planning.
- `--voice-list <json>` — Provide structured voice instructions for models that support generated spoken audio.

Input Constraints:
- prompt: max 2500 chars
- first_frame: max 10MB, formats: jpg/jpeg/png, min 300px, max 65536px, aspect ratio range: 0.4–2.5
- last_frame: max 10MB, formats: jpg/jpeg/png, min 300px, max 65536px, aspect ratio range: 0.4–2.5

Pricing:
- Base: 30 credits
- 52 pricing tiers (varies by resolution/duration/mode)
- Range: 30–240 credits

Provider Routes:
- route_b (0.5x)
    - text_to_video: AR: 16:9, 9:16, 1:1, Res: 720p, 1080p, Dur: 3-15s
    - image_to_video: AR: 16:9, Res: 720p, 1080p, Dur: 3-15s
    - interpolation: AR: 16:9, Res: 720p, 1080p, Dur: 3-15s
    - motion_control: AR: 16:9, Res: 720p, 1080p, Dur: 3s

Validation Rules:
- When mode=image_to_video, has aspect_ratio: forbid aspect_ratio — aspect ratio follows first_frame
- When mode=image_to_video, has last_frame: forbid last_frame — use mode=interpolation for last_frame
- When has shot_type, multi_shot=false: forbid shot_type — shot_type only valid when multi_shot=true
- When has multi_prompt, multi_shot=false: forbid multi_prompt — multi_prompt only valid when multi_shot=true
- When multi_shot=false: require prompt — prompt required when multi_shot=false
- When multi_shot=true: require shot_type — shot_type required when multi_shot=true
- When has prompt, multi_shot=true, shot_type=customize: forbid prompt — use multi_prompt instead of prompt
- When multi_shot=true, shot_type=customize: require multi_prompt — multi_prompt required for customize mode
- When has multi_prompt, multi_shot=true, shot_type=intelligence: forbid multi_prompt — intelligence mode does not allow multi_prompt
- When multi_shot=true, shot_type=intelligence: require prompt — prompt required for intelligence mode
- When has voice_list: forbid voice_list — element_list and voice_list are mutually exclusive

<!-- NOTES:kling-3.0 -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## kling-motion-control

| Property | Value |
|----------|-------|
| Modes | motion_control |
| Aspect Ratios | 16:9 |
| Resolutions | 720p, 1080p |
| Duration | 5s |
| Supports Auto | no |
| Hidden Controls | duration, aspect_ratio, audio |
| Base Price | 8 credits |
| Pricing Unit | per_second |

Per-mode constraints:
  - motion_control: AR: 16:9, Res: 720p, 1080p, Duration: 5s

Special Parameters:
- `--audio` — Generate audio together with the video when supported by the model. Default: false.
- `--character-orientation <image|video>` — Choose whether character motion and framing should follow the uploaded image or the source video. **Required.**
- `--keep-original-audio` — Keep the original soundtrack from the source video instead of replacing or dropping it. Default: true.

Input Constraints:
- prompt: max 2500 chars
- first_frame: max 10MB, formats: jpg/jpeg/png, min 300px, max 65536px, aspect ratio range: 0.4–2.5
- video: max 100MB, formats: mp4/mov, min 340px, max 3850px, min 3s, max 30s, when character_orientation=video: max 30s, when character_orientation=image: max 10s

Pricing:
- Base: 8 credits
- Unit: per_second
- resolution=720p: 8 credits
- resolution=1080p: 12 credits

Provider Routes:
- route_b (0.5x)
- route_c (0.5x)

<!-- NOTES:kling-motion-control -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## seedance-1.5-pro

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, interpolation |
| Aspect Ratios | 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive |
| Resolutions | 480p, 720p, 1080p |
| Duration | 4-12s |
| Supports Auto | yes |
| Base Price | 12 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Duration: 4-12s
  - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Duration: 4-12s
  - interpolation: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Duration: 4-12s

Input Constraints:
- first_frame: max 30MB, formats: jpg/jpeg/png/webp/bmp/tiff/gif/heic/heif, min 300px, max 6000px, aspect ratio range: 0.4–2.5
- last_frame: max 30MB, formats: jpg/jpeg/png/webp/bmp/tiff/gif/heic/heif, min 300px, max 6000px, aspect ratio range: 0.4–2.5

Pricing:
- Base: 12 credits
- 27 pricing tiers (varies by resolution/duration/mode)
- Range: 12–144 credits

Provider Routes:
- route_a (1x)
    - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s
    - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s
    - interpolation: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s
- route_b (1x)
    - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s
    - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s
    - interpolation: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s
- route_c (1x)
    - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s
    - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s
    - interpolation: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, 1080p, Dur: 4-12s

<!-- NOTES:seedance-1.5-pro -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## seedance-2.0-fast

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, interpolation, reference_images, multimodal_reference, video_to_video, video_extension |
| Aspect Ratios | 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive |
| Resolutions | 480p, 720p |
| Duration | 4-15s |
| Supports Auto | yes |
| Base Price | 30 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - interpolation: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - reference_images: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - multimodal_reference: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - video_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - video_extension: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s

Per-mode limits:
  - reference_images: max_reference_images=9
  - multimodal_reference: max_reference_images=9, max_reference_videos=3, max_reference_audios=3
  - video_to_video: max_reference_images=9

Special Parameters:
- `--audio` — Generate audio together with the video when supported by the model. Default: true.
- `--web-search` — Allow the model to use web search when the provider supports it. Default: false.

Input Constraints:
- first_frame: max 30MB, formats: jpg/jpeg/png/webp/bmp/tiff/gif, min 300px, max 6000px, aspect ratio range: 0.4–2.5
- last_frame: max 30MB, formats: jpg/jpeg/png/webp/bmp/tiff/gif, min 300px, max 6000px, aspect ratio range: 0.4–2.5
- video: max 50MB, formats: mp4/mov, min 300px, max 6000px, min 2s, max 15s
- audio: max 15MB, formats: wav/mp3, min 2s, max 15s

Pricing:
- Base: 30 credits
- 24 pricing tiers (varies by resolution/duration/mode)
- Range: 25–192 credits

Provider Routes:
- route_a (1x)
    - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - interpolation: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - reference_images: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - multimodal_reference: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - video_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - video_extension: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s

Validation Rules:
- When mode=text_to_video/image_to_video/interpolation/reference_images/video_to_video/video_extension: forbid reference_videos — reference_videos are only available in multimodal_reference mode
- When mode=text_to_video/image_to_video/interpolation/reference_images/video_to_video/video_extension: forbid reference_audios — reference_audios are only available in multimodal_reference mode
- When mode=multimodal_reference: forbid first_frame — multimodal_reference uses reference_images instead of first_frame
- When mode=multimodal_reference: forbid last_frame — multimodal_reference does not support last_frame
- When mode=multimodal_reference: forbid video — multimodal_reference uses reference_videos instead of video

<!-- NOTES:seedance-2.0-fast -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## seedance-2.0

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, interpolation, reference_images, multimodal_reference, video_to_video, video_extension |
| Aspect Ratios | 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive |
| Resolutions | 480p, 720p |
| Duration | 4-15s |
| Supports Auto | yes |
| Base Price | 37 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - interpolation: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - reference_images: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - multimodal_reference: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - video_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s
  - video_extension: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Duration: 4-15s

Per-mode limits:
  - reference_images: max_reference_images=9
  - multimodal_reference: max_reference_images=9, max_reference_videos=3, max_reference_audios=3
  - video_to_video: max_reference_images=9

Special Parameters:
- `--audio` — Generate audio together with the video when supported by the model. Default: true.
- `--web-search` — Allow the model to use web search when the provider supports it. Default: false.

Input Constraints:
- first_frame: max 30MB, formats: jpg/jpeg/png/webp/bmp/tiff/gif, min 300px, max 6000px, aspect ratio range: 0.4–2.5
- last_frame: max 30MB, formats: jpg/jpeg/png/webp/bmp/tiff/gif, min 300px, max 6000px, aspect ratio range: 0.4–2.5
- video: max 50MB, formats: mp4/mov, min 300px, max 6000px, min 2s, max 15s
- audio: max 15MB, formats: wav/mp3, min 2s, max 15s

Pricing:
- Base: 37 credits
- 24 pricing tiers (varies by resolution/duration/mode)
- Range: 30–238 credits

Provider Routes:
- route_a (1x)
    - text_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - image_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - interpolation: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - reference_images: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - multimodal_reference: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - video_to_video: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s
    - video_extension: AR: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive, Res: 480p, 720p, Dur: 4-15s

Validation Rules:
- When mode=text_to_video/image_to_video/interpolation/reference_images/video_to_video/video_extension: forbid reference_videos — reference_videos are only available in multimodal_reference mode
- When mode=text_to_video/image_to_video/interpolation/reference_images/video_to_video/video_extension: forbid reference_audios — reference_audios are only available in multimodal_reference mode
- When mode=multimodal_reference: forbid first_frame — multimodal_reference uses reference_images instead of first_frame
- When mode=multimodal_reference: forbid last_frame — multimodal_reference does not support last_frame
- When mode=multimodal_reference: forbid video — multimodal_reference uses reference_videos instead of video

<!-- NOTES:seedance-2.0 -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## sora-2-pro

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video |
| Aspect Ratios | 16:9, 9:16 |
| Resolutions | 720p, 1080p |
| Duration | 4, 8, 12s |
| Defaults | aspect_ratio=16:9, resolution=720p, duration=4 |
| Supports Auto | no |
| Base Price | 120 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Duration: 4, 8, 12s
  - image_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Duration: 4, 8, 12s

Pricing:
- Base: 120 credits
- resolution=720p, duration=4: 120 credits
- resolution=1080p, duration=4: 200 credits
- resolution=720p, duration=8: 240 credits
- resolution=1080p, duration=8: 400 credits
- resolution=720p, duration=12: 360 credits
- resolution=1080p, duration=12: 600 credits

Provider Routes:
- route_b (0.5x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Dur: 4, 8, 12s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Dur: 4, 8, 12s
- route_c (0.5x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Dur: 4, 8, 12s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Dur: 4, 8, 12s

<!-- NOTES:sora-2-pro -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## sora-2

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video |
| Aspect Ratios | 16:9, 9:16 |
| Resolutions | 720p |
| Duration | 4, 8, 10, 12, 15s |
| Defaults | aspect_ratio=16:9, resolution=720p, duration=4 |
| Supports Auto | no |
| Base Price | 40 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, Res: 720p, Duration: 4, 8, 10, 12, 15s
  - image_to_video: AR: 16:9, 9:16, Res: 720p, Duration: 4, 8, 10, 12, 15s

Pricing:
- Base: 40 credits
- duration=4: 40 credits
- duration=8: 80 credits
- duration=10: 100 credits
- duration=12: 120 credits
- duration=15: 150 credits

Provider Routes:
- route_b (0.5x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, Dur: 4, 8, 10, 12, 15s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, Dur: 4, 8, 10, 12, 15s
- route_c (0.5x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, Dur: 4, 8, 10, 12, 15s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, Dur: 4, 8, 10, 12, 15s

<!-- NOTES:sora-2 -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## veo-3.1-fast

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, interpolation |
| Aspect Ratios | 16:9, 9:16 |
| Resolutions | 720p, 4k, 1080p |
| Duration | 4, 6, 8s |
| Defaults | aspect_ratio=16:9, resolution=720p, duration=4 |
| Supports Auto | no |
| Base Price | 44 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, Res: 720p, 4k, 1080p, Duration: 4, 6, 8s
  - image_to_video: AR: 16:9, 9:16, Res: 720p, 4k, 1080p, Duration: 4, 6, 8s
  - interpolation: AR: 16:9, 9:16, Res: 720p, 4k, 1080p, Duration: 8s

Pricing:
- Base: 44 credits
- duration=4, resolution=720p/1080p: 44 credits
- duration=4, resolution=4k: 96 credits
- duration=6, resolution=720p/1080p: 68 credits
- duration=6, resolution=4k: 144 credits
- duration=8, resolution=720p/1080p: 88 credits
- duration=8, resolution=4k: 192 credits

Provider Routes:
- route_a (1x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, 4k, Dur: 4, 6, 8s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, 4k, Dur: 4, 6, 8s
    - interpolation: AR: 16:9, 9:16, Res: 720p, 1080p, 4k, Dur: 8s
- route_b (0.5x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, 4k, Dur: 8s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, 4k, Dur: 8s
    - interpolation: AR: 16:9, 9:16, Res: 720p, 4k, Dur: 8s

Route-specific restrictions:
- route_b: when duration=4/6 — Route B only supports 8s
- route_b: when resolution=1080p — Route B does not support 1080p

<!-- NOTES:veo-3.1-fast -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## veo-3.1-lite

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, interpolation |
| Aspect Ratios | 16:9, 9:16 |
| Resolutions | 720p, 1080p |
| Duration | 4, 6, 8s |
| Defaults | aspect_ratio=16:9, resolution=720p, duration=4 |
| Supports Auto | no |
| Base Price | 22 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Duration: 4, 6, 8s
  - image_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Duration: 4, 6, 8s
  - interpolation: AR: 16:9, 9:16, Res: 720p, 1080p, Duration: 4, 6, 8s

Pricing:
- Base: 22 credits
- duration=4, resolution=720p: 22 credits
- duration=6, resolution=720p: 33 credits
- duration=8, resolution=720p: 44 credits
- duration=8, resolution=1080p: 71 credits

Provider Routes:
- route_a (1x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Dur: 4, 6, 8s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, Dur: 4, 6, 8s
    - interpolation: AR: 16:9, 9:16, Res: 720p, 1080p, Dur: 4, 6, 8s

<!-- NOTES:veo-3.1-lite -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---

## veo-3.1

| Property | Value |
|----------|-------|
| Modes | text_to_video, image_to_video, interpolation, reference_images |
| Aspect Ratios | 16:9, 9:16 |
| Resolutions | 720p, 4k, 1080p |
| Duration | 4, 6, 8s |
| Defaults | aspect_ratio=16:9, resolution=720p, duration=4 |
| Supports Auto | no |
| Base Price | 116 credits |

Per-mode constraints:
  - text_to_video: AR: 16:9, 9:16, Res: 720p, 4k, 1080p, Duration: 4, 6, 8s
  - image_to_video: AR: 16:9, 9:16, Res: 720p, 4k, 1080p, Duration: 4, 6, 8s
  - interpolation: AR: 16:9, 9:16, Res: 720p, 4k, 1080p, Duration: 8s
  - reference_images: AR: 16:9, 9:16, Res: 720p, 4k, 1080p, Duration: 8s

Pricing:
- Base: 116 credits
- duration=4, resolution=720p/1080p: 116 credits
- duration=4, resolution=4k: 176 credits
- duration=6, resolution=720p/1080p: 176 credits
- duration=6, resolution=4k: 264 credits
- duration=8, resolution=720p/1080p: 232 credits
- duration=8, resolution=4k: 352 credits

Provider Routes:
- route_a (1x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, 4k, Dur: 4, 6, 8s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, 1080p, 4k, Dur: 4, 6, 8s
    - interpolation: AR: 16:9, 9:16, Res: 720p, 1080p, 4k, Dur: 8s
    - reference_images: AR: 16:9, 9:16, Res: 720p, 1080p, 4k, Dur: 8s
- route_b (0.5x)
    - text_to_video: AR: 16:9, 9:16, Res: 720p, 4k, Dur: 8s
    - image_to_video: AR: 16:9, 9:16, Res: 720p, 4k, Dur: 8s
    - interpolation: AR: 16:9, 9:16, Res: 720p, 4k, Dur: 8s
    - reference_images: AR: 16:9, 9:16, Res: 720p, 4k, Dur: 8s

Route-specific restrictions:
- route_b: when duration=4/6 — Route B only supports 8s
- route_b: when resolution=1080p — Route B does not support 1080p

<!-- NOTES:veo-3.1 -->
<!-- Add hand-written tips and best practices here -->
<!-- NOTES:END -->

---
