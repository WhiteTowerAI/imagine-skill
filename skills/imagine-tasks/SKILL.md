---
name: imagine-tasks
description: Manage Vofy generation tasks from vofy-cli. Use when the user asks to list jobs, check image/video generation status, inspect a task, print result URLs, download completed media, or continue an async workflow.
---

# Vofy Task Management

Every `vofy image create` and `vofy video create` command creates a task. Use task commands to inspect async jobs, recover result URLs, and download completed media.

## Fast Path

1. List recent tasks with `vofy tasks --plain`, adding `--type image` or `--type video` when known.
2. Identify the relevant task id or unique prefix from the plain table.
3. Use `vofy task <id_or_prefix> --result-url` for URLs or `--download-to ./output` for files.
4. If the task is still pending or processing, report the current status and the exact command to run later.

## List Tasks

Always use `--plain` in agent workflows because `vofy tasks` opens an interactive browser in TTY sessions.

```bash
vofy tasks --plain
vofy tasks --plain --type image
vofy tasks --plain --type video
```

The CLI does not support server-side status filtering. Filter the plain output locally when looking for completed or failed tasks.

## Inspect or Download One Task

`vofy task` accepts a full id or unique prefix.

```bash
vofy task <task_id_or_prefix>
vofy task <task_id_or_prefix> --result-url
vofy task <task_id_or_prefix> --download-to ./output
```

## Async Pattern

```bash
vofy video create --model veo-3.1 --prompt "epic cinematic scene" --duration 8 --async --yes
vofy tasks --plain --type video
vofy task <task_id_or_prefix> --download-to ./output
```

## Status Handling

- `completed`: print URLs or download with `--download-to`.
- `pending` / `processing`: report the status and avoid polling unless asked.
- `failed`: inspect details and suggest a corrected create command.

## Common Actions

- Previous output URL: `vofy task <id_or_prefix> --result-url`
- Download output: inspect the task id, then run `vofy task <id_or_prefix> --download-to ./output`
- Retry failed task: re-run the original create command; there is no retry command.
