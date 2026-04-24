# Installing Imagine Skill

Imagine Skill follows the standard Agent Skills ecosystem layout. The repository exposes installable `skills/<name>/SKILL.md` folders and relies on `npx skills add` to place them in the right agent-specific location.

## Prerequisites

Install and authenticate `vofy-cli` first:

```bash
npm install -g vofy-cli@0.1.5
vofy login
vofy status
```

Do not ask an agent to run `vofy login`; it opens a browser and must be completed by the user.

## Install With `npx skills`

Install all skills into the detected agent environment:

```bash
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' -y
```

List skills without installing:

```bash
npx -y skills add WhiteTowerAI/imagine-skill --list
```

Add `--agent <name>` when targeting one tool:

```bash
npx -y skills add WhiteTowerAI/imagine-skill --skill '*' --agent codex -y
```

Install from a local checkout while developing:

```bash
npx -y skills add . --skill '*' -y
```

Install one skill only:

```bash
npx -y skills add WhiteTowerAI/imagine-skill --skill imagine-create -y
```

## Compatibility Commands

The npm package and shell script only print the standard install commands; they do not copy files themselves:

```bash
npx -y imagine-skill
curl -fsSL https://raw.githubusercontent.com/WhiteTowerAI/imagine-skill/main/install.sh | bash
```

## Verify

```bash
vofy --version
vofy status
```

Then ask your agent:

```text
Use imagine-create to generate a small test image and download it to ./output.
```

The generated command should include `--yes` and should not run `vofy login`.
