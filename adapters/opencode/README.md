# OpenCode Adapter for imagine-skill

OpenCode natively reads `.claude/skills/` directories, so no special adapter is needed.

## Installation

Copy the skills into your project:

```bash
cp -r skills/ <your-project>/.claude/skills/
```

OpenCode will automatically discover and use the skills from `.claude/skills/`.

## Skills Included

| Skill | Description |
|-------|-------------|
| `imagine` | Main entry point — CLI overview, command reference, AI agent rules |
| `imagine-create` | Media creation workflow — mode selection, templates, examples |
| `imagine-models` | Model selection guide — capabilities, pricing, recommendations |
| `imagine-tasks` | Task management — listing, status checking, downloading results |

## Verification

After copying, verify OpenCode can see the skills by asking it about vofy-cli capabilities.
