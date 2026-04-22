---
name: imagine-tasks
description: Task management for vofy-cli — listing, filtering, checking status, and downloading completed media
---

# Task Management with vofy-cli

Every `vofy image create` or `vofy video create` command in the [Vofy](https://www.vofy.art/) CLI produces a task. This skill covers how to list, inspect, and download task results.

## Listing Tasks

```bash
vofy tasks --plain                    # all recent tasks (non-interactive)
vofy tasks --plain --type image       # image tasks only
vofy tasks --plain --type video       # video tasks only
vofy tasks --interactive              # force the interactive browser in a TTY
```

> **Note:** The CLI does not support server-side status filtering. To find tasks by status, run `vofy tasks --plain` and filter the output yourself.

Always use `--plain` as an AI agent — in a TTY, the default opens an interactive browser that blocks automation.

## Checking a Specific Task

```bash
vofy task <task_id_or_prefix>                # show task detail
vofy task <task_id_or_prefix> --result-url   # print generated resource URLs
vofy task <task_id_or_prefix> --download-to ./output
```

`vofy task` accepts either a full task id or a unique task id prefix.

## Task Lifecycle

| Status | Meaning |
|--------|---------|
| `pending` | Queued, waiting for processing |
| `processing` | Model is generating the media |
| `completed` | Done — results available for download |
| `failed` | Generation failed — check error message |

## Sync vs Async

By default, `vofy image create` and `vofy video create` run synchronously — they wait for the task to complete and return the result. This is the recommended approach for AI agents.

For long-running video tasks, use `--async` to submit and check later:

```bash
# Submit without waiting
vofy video create --model veo-3.1 --prompt "epic scene" --duration 8 --async --yes

# Check status
vofy tasks --plain --type video

# Download when complete
vofy task <task_id> --download-to ./output
```

## Downloading Results

```bash
# Download to a specific directory
vofy task <task_id> --download-to ./output

# The CLI creates the directory if it doesn't exist
# Files are named by the task ID and output index
```

## Common Patterns for AI Agents

**Check if a previous task succeeded:**
```bash
vofy task <task_id>
```

**Retry a failed task:** Re-run the original create command. There is no built-in retry command.

**Find the latest completed task:**
```bash
vofy tasks --plain --type image
```
Look for tasks with `completed` status in the output.
