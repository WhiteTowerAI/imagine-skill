# vofy-cli Command Reference

> Auto-generated from `packages/vofy-cli/src/index.js` help output.
> Do not edit by hand; regenerate with `node scripts/generate-command-docs.js /path/to/dev-feat-cli`.

## vofy login

```text
vofy login

Open the Vofy web login flow and store a refresh-capable CLI session locally.

Usage:
  vofy login [options]

Options:
  -h, --help                print help

Run vofy status after login to verify your account.
```

## vofy logout

```text
vofy logout

Revoke the current CLI session when possible and clear locally stored credentials.
This does not sign the current browser out of its Vofy web session.

Usage:
  vofy logout [options]

Options:
  -h, --help                print help

Run vofy login to sign in again.
```

## vofy status

```text
vofy status

Show account summary, credits balance, and plan information.

Usage:
  vofy status

Options:
  -h, --help                print help

Run vofy tasks for a full task listing with pagination.
Run vofy billing to manage your subscription.
```

## vofy task

```text
vofy task

Show one task in detail, including billing summary and generated resource URLs.

Usage:
  vofy task <task_id_or_prefix> [options]

Arguments:
  <task_id_or_prefix>       full task id or a unique prefix

Options:
      --result-url              print generated resource URLs (completed tasks only)
      --download                download generated resources to the current directory
      --download-to <path>      download generated resources to a directory or file path
  -h, --help                    print help

Examples:
  $ vofy task abc123
  $ vofy task abc                   # prefix lookup
  $ vofy task abc123 --download
  $ vofy task abc123 --result-url

Run vofy tasks to list all recent tasks.
```

## vofy tasks

```text
vofy tasks

Browse tasks in reverse chronological order.
TTY terminals open an interactive browser by default; non-TTY output stays plain text.

Usage:
  vofy tasks [options]

Options:
      --type <all|image|video>  filter by task type
      --limit <count>            page size / number of tasks to return (default: 20)
      --offset <count>      pagination offset (default: 0)
      --interactive         force the interactive task browser
      --plain               force plain-text table output
  -h, --help                print help

Examples:
  $ vofy tasks
  $ vofy tasks --type video
  $ vofy tasks --plain --limit 5 --offset 10

Run vofy task <id> to view task details or download results.
```

## vofy billing

```text
vofy billing

Review plan differences on the website or switch plans from your terminal.

Usage:
  vofy billing [plan] [options]

Arguments:
  [plan]                    optional shortcut: starter | pro | max

Options:
      --plan <starter|pro|max>  switch to a plan directly or open checkout when needed
  -h, --help                    print help

Examples:
  $ vofy billing                 # interactive picker in a TTY, pricing page otherwise
  $ vofy billing pro             # switch to Pro or fall back to checkout
  $ vofy billing --plan max      # same, using flag syntax

Run vofy status to check your current credits balance.
```

## vofy models

```text
vofy models

List available models or print a full capability guide for one model.

Usage:
  vofy models [name] [options]

Arguments:
  [name]                    show detailed capabilities for a specific model

Options:
      --type <image|video>  filter the list view by model type
  -h, --help                print help

Examples:
  $ vofy models                      # list all models
  $ vofy models --type video          # list video models only
  $ vofy models gpt-image-1.5         # full image model guide
  $ vofy models seedance-2.0          # full video model guide
```

## vofy image create

```text
vofy image create

Create image generations with first-class flags for image parameters.

Usage:
  vofy image create --model <model> --prompt <prompt> [options]

Modes:
  text_to_image   omit --image and --mask
  image_to_image  supply one or more --image values
  inpainting      supply both --image and --mask

Media Inputs:
  --image <path|url>                        local files auto-upload; pass multiple times
  --mask <path|url>                         local files auto-upload

Options:
      --model <model>                       required model id
      --prompt <prompt>                     required prompt text
      --mode <mode>                         explicit mode override when needed
      --aspect-ratio <ratio>                e.g. 1:1, 3:2, 16:9, auto
      --resolution <value>                  e.g. 1K, 2K, 4K, auto
      --n <count>                           number of output images
      --quality <value>                     image quality enum for models that expose it
      --background <value>                  transparent | opaque | auto
      --web-search [true|false]             enable provider web search tools
      --image-search [true|false]           enable provider image search tools
      --reasoning-effort <value>            e.g. minimal | high
      --sequential-image-generation <mode>  e.g. auto | disabled
      --sequential-image-generation-options <json|file>
                                                JSON object or JSON file path
      --batch-size <count>                  create 1–4 tasks in one request
      --provider-route <official|channel>   pin to Official or Channel (raw aliases also accepted)
      --provider-route-order <official|channel>  alias of --provider-route
      --yes                                 skip the interactive route picker (server default)
      --async                               submit without waiting for completion
      --download                            download generated resources on completion
      --download-to <path>                  download to a specific path
      --result-url                          (default) show generated resource URLs
  -h, --help                                print help

Examples:
  $ vofy image create --model seedream-4.5 --prompt "a sunset over mountains"
  $ vofy image create --model gpt-image-1.5 --prompt "logo" --background transparent
  $ vofy image create --model seedream-4.5 --prompt "edit" --image photo.jpg
  $ vofy image create --model gpt-image-1.5 --prompt "remove bg" --image photo.jpg --mask mask.png

By default the CLI waits for task completion and shows results.
Use --async to submit without waiting.

Boolean Flags:
  Pass --web-search or --image-search with no value to set true.
  Use --no-web-search or --no-image-search to disable.

Run vofy models --type image to see available image models and their capabilities.
```

## vofy video create

```text
vofy video create

Create video generations with local-file upload support for frame, video, image, and audio inputs.

Usage:
  vofy video create --model <model> --prompt <prompt> [options]

Media Inputs:
  --first-frame <path|url>      local files auto-upload
  --last-frame <path|url>       local files auto-upload
  --video <path|url>            local files auto-upload
  --reference-image <path|url>  pass multiple times for multiple images
  --reference-video <path|url>  pass multiple times for multiple videos
  --reference-audio <path|url>  pass multiple times for multiple audios
  --reference-asset <json|file> pass multiple times; local urls auto-upload

Options:
      --model <model>            required model id
      --prompt <prompt>          required prompt text
      --mode <mode>              explicit mode override
      --aspect-ratio <ratio>     e.g. 16:9
      --resolution <value>       e.g. 720p, 1080p
      --duration <seconds>       alias of --seconds
      --seconds <seconds>        video duration in seconds
      --audio [true|false]       request native audio generation
      --keep-original-audio [true|false]
                                 preserve source audio for motion modes
      --character-orientation <value>
                                 e.g. image | video
      --web-search [true|false]  enable provider web search tools
      --input-video-duration <sec>
                                 source video duration for pricing-sensitive modes
      --batch-size <count>       create 1–4 tasks in one request
      --provider-route <official|channel>
                                 pin to Official or Channel (raw aliases also accepted)
      --provider-route-order <official|channel>
                                 alias of --provider-route
      --yes                      skip the interactive route picker (server default)
      --multi-shot [true|false]  enable Kling multi-shot storyboard
      --shot-type <value>        e.g. customize | intelligence
      --multi-prompt <json|file> pass multiple times
      --element <json|file>      pass multiple times
      --element-list <json|file> alias of --element
      --voice <json|file>        pass multiple times
      --voice-list <json|file>   alias of --voice
      --async                    submit without waiting for completion
      --download                 download generated resources on completion
      --download-to <path>       download to a specific path
      --result-url               (default) show generated resource URLs
  -h, --help                     print help

Examples:
  $ vofy video create --model veo-3.1 --prompt "a cat walking"
  $ vofy video create --model kling-3.0 --prompt "animate" --first-frame photo.jpg
  $ vofy video create --model seedance-2.0 --prompt "dance" --duration 10
  $ vofy video create --model veo-3.1 --prompt "scene" --first-frame a.jpg --last-frame b.jpg

By default the CLI waits for task completion and shows results.
Use --async to submit without waiting.

Boolean Flags:
  Pass --audio, --keep-original-audio, --web-search, or --multi-shot with no value to set true.
  Use --no-audio, --no-keep-original-audio, --no-web-search, or --no-multi-shot to disable.

Run vofy models --type video to see available video models and their capabilities.
```

## Mode Detection Notes

- `vofy image create` infers `text_to_image`, `image_to_image`, and `inpainting` from the supplied image and mask inputs.
- `vofy video create` infers `text_to_video`, `image_to_video`, `interpolation`, and `reference_images` from the supplied inputs when they are unambiguous.
- `--video` by itself is ambiguous. Use `--mode video_to_video` or `--mode video_extension`.
- Mixing `--reference-image` with `--reference-video` or `--reference-audio` requires `--mode multimodal_reference`.
