# vofy-cli Examples

Real-world scenarios for image and video creation.

## Image Examples

### Product mockup with transparent background
```bash
vofy image create \
  --model gpt-image-1.5 \
  --prompt "a sleek wireless headphone, product photography, white background" \
  --background transparent \
  --aspect-ratio 1:1 \
  --yes --download-to ./output
```

### Social media banner
```bash
vofy image create \
  --model seedream-4.5 \
  --prompt "abstract gradient background with geometric shapes, modern tech aesthetic" \
  --aspect-ratio 16:9 \
  --resolution 2K \
  --yes --download-to ./output
```

### Edit an existing photo
```bash
vofy image create \
  --model gpt-image-1.5 \
  --prompt "change the sky to a dramatic sunset" \
  --image ./landscape.jpg \
  --yes --download-to ./output
```

### Inpainting — remove an object
```bash
vofy image create \
  --model gpt-image-1.5 \
  --prompt "clean background, no person" \
  --image ./photo.jpg \
  --mask ./mask.png \
  --yes --download-to ./output
```

### Multiple outputs for selection
```bash
vofy image create \
  --model seedream-4.5 \
  --prompt "minimalist app icon for a weather app" \
  --n 4 \
  --aspect-ratio 1:1 \
  --yes --download-to ./output
```

### Batch creation (multiple tasks)
```bash
vofy image create \
  --model seedream-4.5 \
  --prompt "hero image for a travel blog" \
  --batch-size 3 \
  --aspect-ratio 16:9 \
  --yes --download-to ./output
```

## Video Examples

### Simple text-to-video
```bash
vofy video create \
  --model veo-3.1 \
  --prompt "a timelapse of clouds moving over a mountain range, cinematic" \
  --duration 6 \
  --aspect-ratio 16:9 \
  --yes --download-to ./output
```

### Animate a product image
```bash
vofy video create \
  --model kling-3.0 \
  --prompt "the product slowly rotates 360 degrees on a white surface" \
  --first-frame ./product.png \
  --duration 5 \
  --yes --download-to ./output
```

### Video with generated audio
```bash
vofy video create \
  --model kling-3.0 \
  --prompt "a barista making latte art, ambient coffee shop sounds" \
  --audio \
  --duration 8 \
  --yes --download-to ./output
```

### Morph between two images
```bash
vofy video create \
  --model seedance-2.0 \
  --prompt "smooth morphing transition" \
  --first-frame ./before.png \
  --last-frame ./after.png \
  --duration 4 \
  --yes --download-to ./output
```

### Fast preview video
```bash
vofy video create \
  --model veo-3.1-fast \
  --prompt "a person walking through a neon-lit city at night" \
  --duration 4 \
  --yes --download-to ./output
```

### Transform existing video style
```bash
vofy video create \
  --model seedance-2.0 \
  --prompt "convert to anime style" \
  --mode video_to_video \
  --video ./original.mp4 \
  --yes --download-to ./output
```

### Extend a video
```bash
vofy video create \
  --model seedance-2.0 \
  --prompt "continue the scene naturally" \
  --video ./clip.mp4 \
  --mode video_extension \
  --yes --download-to ./output
```

### Reference image for style consistency
```bash
vofy video create \
  --model veo-3.1 \
  --prompt "a character walking through a garden" \
  --reference-image ./character-ref.png \
  --duration 8 \
  --yes --download-to ./output
```

## Async Workflow

For long-running video tasks, use async mode:

```bash
# Submit without waiting
vofy video create \
  --model veo-3.1 \
  --prompt "epic cinematic scene" \
  --duration 8 \
  --async \
  --yes

# Check status later
vofy tasks --plain --type video

# Download when complete
vofy task <task_id> --download-to ./output
```
