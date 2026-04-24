#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..");
const cliRoot = resolveCliRoot(firstPositionalArg());
const manifest = JSON.parse(
  fs.readFileSync(path.join(cliRoot, "packages", "vofy-cli", "src", "model-manifest.json"), "utf8"),
);

const docFiles = [
  "skills/imagine/SKILL.md",
  "skills/imagine-create/SKILL.md",
  "skills/imagine-create/examples.md",
  "skills/imagine-tasks/SKILL.md",
];

const requiredSnippets = [
  {
    file: "skills/imagine-create/SKILL.md",
    pattern: /multimodal_reference.*--mode multimodal_reference/,
    message: "multimodal_reference guidance must include `--mode multimodal_reference`.",
  },
  {
    file: "skills/imagine-create/SKILL.md",
    pattern: /video_to_video.*--mode video_to_video/,
    message: "video_to_video guidance must include `--mode video_to_video`.",
  },
  {
    file: "skills/imagine-create/SKILL.md",
    pattern: /video_extension.*--mode video_extension/,
    message: "video_extension guidance must include `--mode video_extension`.",
  },
];

const errors = [];

const KNOWN_TASKS_FLAGS = new Set([
  "type", "limit", "offset", "interactive", "plain", "help",
  "api-base-url", "web-base-url",
]);

const KNOWN_TASK_FLAGS = new Set([
  "result-url", "download", "download-to", "help",
  "api-base-url", "web-base-url",
]);

for (const rule of requiredSnippets) {
  const absPath = path.join(repoRoot, rule.file);
  const content = fs.readFileSync(absPath, "utf8");
  if (!rule.pattern.test(content)) {
    errors.push(`${rule.file}: ${rule.message}`);
  }
}

const upstreamPkg = JSON.parse(
  fs.readFileSync(path.join(cliRoot, "packages", "vofy-cli", "package.json"), "utf8"),
);
const expectedVersion = upstreamPkg.version;

const versionFiles = [
  "README.md",
  "INSTALL.md",
  "install.sh",
  "bin/skill.js",
  ...collectFiles("skills", (relPath) => relPath.endsWith(".md")),
  ...collectFiles("docs", (relPath) => relPath.endsWith(".md")),
];
const versionPattern = /vofy-cli@([\d]+\.[\d]+\.[\d]+[^\s"'`]*)/g;

for (const relPath of versionFiles) {
  const absPath = path.join(repoRoot, relPath);
  if (!fs.existsSync(absPath)) continue;
  const content = fs.readFileSync(absPath, "utf8");
  let match;
  while ((match = versionPattern.exec(content)) !== null) {
    if (match[1] !== expectedVersion) {
      errors.push(
        `${relPath}: version string \`vofy-cli@${match[1]}\` does not match upstream version \`${expectedVersion}\``,
      );
    }
  }
}

const actualModelCount = Object.keys(manifest).filter(
  (name) => name !== "mock" && name !== "mock-image",
).length;
const modelCountFiles = [
  "README.md",
  ...collectFiles("skills", (relPath) => relPath.endsWith(".md")),
  ...collectFiles("docs", (relPath) => relPath.endsWith(".md")),
];
const countPattern = /(\d+)\s+models/g;

for (const relPath of modelCountFiles) {
  const absPath = path.join(repoRoot, relPath);
  if (!fs.existsSync(absPath)) continue;
  const content = fs.readFileSync(absPath, "utf8");
  let match;
  while ((match = countPattern.exec(content)) !== null) {
    const docCount = parseInt(match[1], 10);
    if (docCount !== actualModelCount) {
      errors.push(
        `${relPath}: says "${docCount} models" but manifest has ${actualModelCount} models (excluding mock/mock-image)`,
      );
    }
  }
}

for (const relativePath of docFiles) {
  const absPath = path.join(repoRoot, relativePath);
  const content = fs.readFileSync(absPath, "utf8");
  const commands = extractCreateCommands(content);
  for (const command of commands) {
    try {
      validateCreateCommand(command, relativePath);
    } catch (error) {
      errors.push(`${relativePath}: ${error.message}\n  command: ${command}`);
    }
  }
  const taskCommands = extractTasksCommands(content);
  for (const command of taskCommands) {
    try {
      validateTaskCommand(command);
    } catch (error) {
      errors.push(`${relativePath}: ${error.message}\n  command: ${command}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Skill doc validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Skill docs validated successfully.");

function collectFiles(relativeDir, predicate) {
  const absoluteDir = path.join(repoRoot, relativeDir);
  if (!fs.existsSync(absoluteDir)) return [];

  const results = [];
  const stack = [absoluteDir];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;
      const relPath = path.relative(repoRoot, absolutePath).split(path.sep).join("/");
      if (!predicate || predicate(relPath)) results.push(relPath);
    }
  }

  return results.sort();
}

function resolveCliRoot(input) {
  if (!input) {
    console.error("Usage: node scripts/validate-skill-docs.js <path-to-dev-feat-cli>");
    process.exit(1);
  }

  const root = path.resolve(input);
  const manifestPath = path.join(root, "packages", "vofy-cli", "src", "model-manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.error(`Could not find vofy CLI manifest at ${manifestPath}`);
    process.exit(1);
  }
  return root;
}

function firstPositionalArg() {
  return process.argv.slice(2).find((arg) => !arg.startsWith("--"));
}

function extractCreateCommands(content) {
  const commands = [];
  const blockRegex = /```(?:bash|sh)\n([\s\S]*?)```/g;
  let blockMatch;
  while ((blockMatch = blockRegex.exec(content)) !== null) {
    commands.push(...extractCommandsFromBlock(blockMatch[1]));
  }
  return commands.filter((command) => /vofy (image|video) create/.test(command));
}

function extractTasksCommands(content) {
  const commands = [];
  const blockRegex = /```(?:bash|sh)\n([\s\S]*?)```/g;
  let blockMatch;
  while ((blockMatch = blockRegex.exec(content)) !== null) {
    commands.push(...extractCommandsFromBlock(blockMatch[1]));
  }
  return commands.filter((command) => /^vofy tasks?\b/.test(command) && !/vofy tasks?\s+</.test(command));
}

function validateTaskCommand(command) {
  const tokens = shellSplit(command);
  if (tokens.length < 2 || tokens[0] !== "vofy") return;

  const isTasksList = tokens[1] === "tasks";
  const isSingleTask = tokens[1] === "task";
  if (!isTasksList && !isSingleTask) return;

  const knownFlags = isTasksList ? KNOWN_TASKS_FLAGS : KNOWN_TASK_FLAGS;
  const flagTokens = isTasksList ? tokens.slice(2) : tokens.slice(3);

  for (const token of flagTokens) {
    if (!token.startsWith("--")) continue;
    const flag = token.slice(2).split("=")[0];
    if (!knownFlags.has(flag)) {
      throw new Error(`unknown flag \`--${flag}\` for \`vofy ${tokens[1]}\``);
    }
  }
}

function extractCommandsFromBlock(block) {
  const commands = [];
  const lines = block.split("\n");
  let current = "";

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      if (current) {
        commands.push(current.trim());
        current = "";
      }
      continue;
    }

    const continued = /\\\s*$/.test(line);
    const cleaned = line.replace(/\\\s*$/, "").trim();

    if (!current) {
      current = cleaned;
    } else {
      current += ` ${cleaned}`;
    }

    if (!continued) {
      commands.push(current.trim());
      current = "";
    }
  }

  if (current) {
    commands.push(current.trim());
  }

  return commands;
}

function validateCreateCommand(command, relativePath) {
  if (/[<[]/.test(command)) {
    return;
  }

  const tokens = shellSplit(command);
  if (tokens.length < 3 || tokens[0] !== "vofy" || tokens[2] !== "create") {
    return;
  }

  const kind = tokens[1];
  if (kind !== "image" && kind !== "video") {
    return;
  }

  const parsed = parseFlags(tokens.slice(3));
  const model = getSingleValue(parsed.values, "model");
  if (!model) {
    throw new Error("missing required `--model` flag");
  }

  const modelSpec = manifest[model];
  if (!modelSpec) {
    throw new Error(`unknown model \`${model}\``);
  }
  if (modelSpec.kind !== kind) {
    throw new Error(`model \`${model}\` is a ${modelSpec.kind} model, not ${kind}`);
  }

  const mode = inferMode(kind, parsed);
  if (!mode) {
    throw new Error("could not infer mode");
  }
  if (!Object.prototype.hasOwnProperty.call(modelSpec.modes || {}, mode)) {
    throw new Error(`model \`${model}\` does not support mode \`${mode}\``);
  }

  validateAllowedValue("aspect-ratio", getSingleValue(parsed.values, "aspect-ratio"), modelSpec, mode, model);
  validateAllowedValue("resolution", getSingleValue(parsed.values, "resolution"), modelSpec, mode, model);

  const duration = getSingleValue(parsed.values, "duration") || getSingleValue(parsed.values, "seconds");
  validateAllowedValue("duration", duration, modelSpec, mode, model);

  validateModelSpecificFlags(parsed, modelSpec, kind, relativePath);
}

function inferMode(kind, parsed) {
  const explicitMode = getSingleValue(parsed.values, "mode");
  if (explicitMode) return explicitMode;

  if (kind === "image") {
    if (hasFlagValue(parsed, "image") && hasFlagValue(parsed, "mask")) return "inpainting";
    if (hasFlagValue(parsed, "image")) return "image_to_image";
    return "text_to_image";
  }

  const hasFirstFrame = hasFlagValue(parsed, "first-frame");
  const hasLastFrame = hasFlagValue(parsed, "last-frame");
  const hasVideo = hasFlagValue(parsed, "video");
  const hasReferenceImage = hasFlagValue(parsed, "reference-image");
  const hasReferenceVideo = hasFlagValue(parsed, "reference-video");
  const hasReferenceAudio = hasFlagValue(parsed, "reference-audio");

  if (hasFirstFrame && hasLastFrame) return "interpolation";
  if (hasFirstFrame && hasVideo) return "motion_control";
  if (hasFirstFrame) return "image_to_video";

  if (hasReferenceImage && (hasReferenceVideo || hasReferenceAudio)) {
    throw new Error("mixed reference-image + reference-video/audio inputs require `--mode multimodal_reference`");
  }
  if (hasReferenceImage) return "reference_images";
  if (hasReferenceVideo || hasReferenceAudio) return "multimodal_reference";

  if (hasVideo) {
    throw new Error("`--video` is ambiguous without `--mode video_to_video` or `--mode video_extension`");
  }

  return "text_to_video";
}

function validateAllowedValue(flagName, rawValue, modelSpec, mode, model) {
  if (rawValue === undefined) return;

  const allowed = modelSpec.allowed_by_mode?.[mode] || {};
  const key =
    flagName === "aspect-ratio" ? "aspect_ratios"
      : flagName === "resolution" ? "resolutions"
        : "durations";
  const allowedValues = allowed[key] || [];
  if (allowedValues.length === 0) return;

  const normalizedRaw = String(rawValue).toLowerCase();
  const normalizedAllowed = allowedValues.map((value) => String(value).toLowerCase());
  if (!normalizedAllowed.includes(normalizedRaw)) {
    throw new Error(
      `model \`${model}\` does not allow \`--${flagName} ${rawValue}\` in mode \`${mode}\`; valid values: ${allowedValues.join(", ")}`,
    );
  }
}

function validateModelSpecificFlags(parsed, modelSpec, kind, relativePath) {
  const alwaysAllowed = new Set(
    kind === "image"
      ? [
        "model", "prompt", "mode", "image", "mask", "aspect-ratio", "resolution", "n",
        "batch-size", "provider-route", "provider-route-order", "yes", "async",
        "download", "download-to", "result-url", "help",
      ]
      : [
        "model", "prompt", "mode", "first-frame", "last-frame", "video",
        "reference-image", "reference-video", "reference-audio", "reference-asset",
        "aspect-ratio", "resolution", "duration", "seconds", "batch-size",
        "provider-route", "provider-route-order", "yes", "async",
        "download", "download-to", "result-url", "help",
      ],
  );

  const modelFlagMap = {
    "background": "background",
    "web-search": "web_search",
    "image-search": "image_search",
    "reasoning-effort": "reasoning_effort",
    "sequential-image-generation": "sequential_image_generation",
    "sequential-image-generation-options": "sequential_image_generation",
    "audio": "audio",
    "keep-original-audio": "keep_original_audio",
    "character-orientation": "character_orientation",
    "input-video-duration": "input_video_duration",
    "multi-shot": "multi_shot",
    "shot-type": "shot_type",
    "multi-prompt": "multi_prompt",
    "element": "element_list",
    "element-list": "element_list",
    "voice": "voice_list",
    "voice-list": "voice_list",
  };

  for (const flag of parsed.presentFlags) {
    if (flag.startsWith("no-")) {
      const positive = flag.slice(3);
      if (alwaysAllowed.has(positive)) continue;
      if (!Object.prototype.hasOwnProperty.call(modelFlagMap, positive)) {
        console.warn(`warning: ${relativePath}: unrecognized flag \`--${flag}\` (not in alwaysAllowed or modelFlagMap)`);
        continue;
      }
      const paramName = modelFlagMap[positive];
      if (!isModelFlagSupported(modelSpec, paramName)) {
        throw new Error(`model \`${getSingleValue(parsed.values, "model")}\` does not support \`--${flag}\``);
      }
      continue;
    }

    if (alwaysAllowed.has(flag)) continue;
    if (!Object.prototype.hasOwnProperty.call(modelFlagMap, flag)) {
      console.warn(`warning: ${relativePath}: unrecognized flag \`--${flag}\` (not in alwaysAllowed or modelFlagMap)`);
      continue;
    }

    const paramName = modelFlagMap[flag];
    if (!isModelFlagSupported(modelSpec, paramName)) {
      throw new Error(`model \`${getSingleValue(parsed.values, "model")}\` does not support \`--${flag}\``);
    }
  }
}

function isModelFlagSupported(modelSpec, paramName) {
  return Boolean(
    modelSpec.parameters?.[paramName]
    || (modelSpec.hidden_controls || []).includes(paramName),
  );
}

function hasFlagValue(parsed, flag) {
  return parsed.values.has(flag) && parsed.values.get(flag).length > 0;
}

function getSingleValue(values, flag) {
  const list = values.get(flag);
  if (!list || list.length === 0) return undefined;
  return list[list.length - 1];
}

function parseFlags(tokens) {
  const values = new Map();
  const presentFlags = new Set();

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token.startsWith("--")) continue;

    const body = token.slice(2);
    const eqIndex = body.indexOf("=");
    if (eqIndex >= 0) {
      const key = body.slice(0, eqIndex);
      const value = body.slice(eqIndex + 1);
      pushValue(values, key, value);
      presentFlags.add(key);
      continue;
    }

    const next = tokens[index + 1];
    if (next && !next.startsWith("--")) {
      pushValue(values, body, next);
      presentFlags.add(body);
      index += 1;
      continue;
    }

    pushValue(values, body, true);
    presentFlags.add(body);
  }

  return { values, presentFlags };
}

function pushValue(values, key, value) {
  if (!values.has(key)) values.set(key, []);
  values.get(key).push(value);
}

function shellSplit(input) {
  const tokens = [];
  let current = "";
  let quote = null;
  let escaping = false;

  for (const char of input) {
    if (escaping) {
      current += char;
      escaping = false;
      continue;
    }

    if (quote) {
      if (char === quote) {
        quote = null;
        continue;
      }
      if (quote === "\"" && char === "\\") {
        escaping = true;
        continue;
      }
      current += char;
      continue;
    }

    if (char === "'" || char === "\"") {
      quote = char;
      continue;
    }

    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    if (char === "\\") {
      escaping = true;
      continue;
    }

    current += char;
  }

  if (quote) {
    throw new Error(`unterminated quote in command: ${input}`);
  }
  if (current) {
    tokens.push(current);
  }

  return tokens;
}
