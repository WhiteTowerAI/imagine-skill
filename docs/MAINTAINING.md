# Maintaining Imagine Skill

This repository follows the same broad shape as the Vercel Labs Agent Skills ecosystem: small installable skill folders, concise trigger metadata, generated references for volatile data, and testable install paths.

## Source of Truth

| Content | Source | Update command |
| --- | --- | --- |
| CLI help and flags | `packages/vofy-cli/src/index.js` | `npm run docs:commands -- <path-to-dev-feat-cli>` |
| Model capabilities | `packages/vofy-cli/src/model-manifest.json` | `npm run docs:models -- <path-to-dev-feat-cli>` |
| Version strings | `packages/vofy-cli/package.json` | Update docs, then run `npm run validate:docs -- <path-to-dev-feat-cli>` |
| Skill install behavior | `npx skills add ...` | `npm test` |

## Skill Design Rules

1. Put trigger conditions in YAML `description`; the body only loads after the skill triggers.
2. Keep `SKILL.md` files actionable and short enough for agent context.
3. Start with the shortest safe path, then point to references only for exact limits or rare flags.
4. Move long examples to `examples.md` and generated model/command data to reference files.
5. Preserve hand-written notes inside `<!-- NOTES:<model> --> ... <!-- NOTES:END -->` blocks when regenerating model docs.
6. Prefer commands agents can run without interaction: `--yes`, `--plain`, and explicit output paths.

## Generated File Boundaries

- `skills/imagine/commands-reference.md` is generated from live `vofy` help output; edit `scripts/generate-command-docs.js` instead of hand-editing command text.
- `skills/imagine-models/image-models.md` and `skills/imagine-models/video-models.md` are generated from `model-manifest.json`; keep human guidance in `SKILL.md` or preserved `NOTES` blocks.
- Hand-written files should summarize workflow and routing, not duplicate every generated flag or model limit.

## Release Checklist

1. Regenerate command and model docs from the current `vofy-cli` source.
2. Run `npm run validate:docs -- <path-to-dev-feat-cli>`.
3. Run `npm test`.
4. Verify `README.md`, `INSTALL.md`, `install.sh`, and `bin/skill.js` all mention the same `vofy-cli` version.
5. Install from a local checkout with `npx -y skills add . --skill '*' --agent codex -y` before publishing.

## Alignment With Vercel Labs Skills

- Use standard `skills/<name>/SKILL.md` folders so `npx skills add` can discover skills directly.
- Keep installation examples compatible with GitHub shorthand, full GitHub URLs, direct subpaths, and local paths.
- Do not add agent-specific adapter folders; native Agent Skills discovery is the supported path.
- Keep validation scripts in `scripts/` and expose them through `package.json` for CI-friendly use.
