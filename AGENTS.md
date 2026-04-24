# Imagine Skill Repository Guide

## Editing Principles

- Keep every `SKILL.md` short, imperative, and task-oriented; move bulky examples or generated data into adjacent Markdown references.
- Treat `vofy-cli` help output and `packages/vofy-cli/src/model-manifest.json` as the source of truth for commands, flags, models, limits, and pricing.
- Do not run `vofy login` during tests or examples; it requires a browser and must be performed by the user.
- Use non-interactive CLI examples for agents: add `--yes` to create commands and `--plain` to `vofy tasks`.

## Generated Docs

- Regenerate command docs with `npm run docs:commands -- <path-to-dev-feat-cli>`.
- Regenerate model docs with `npm run docs:models -- <path-to-dev-feat-cli>/packages/vofy-cli/src/model-manifest.json`.
- Validate generated and hand-written docs with `npm run validate:docs -- <path-to-dev-feat-cli>`.

## Validation

- Run `npm test` after changing installers, package metadata, or tests.
- Run the docs validation script after changing any `skills/`, `README.md`, `INSTALL.md`, `install.sh`, or `bin/skill.js` content that mentions commands, model counts, or `vofy-cli` versions.
