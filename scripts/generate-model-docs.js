#!/usr/bin/env node

// Generates image-models.md and video-models.md from model-manifest.json
// Preserves hand-written <!-- NOTES:model-name --> blocks across regeneration.
//
// Usage: node generate-model-docs.js <path-to-model-manifest.json>

const fs = require('fs');
const path = require('path');

const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error('Usage: node generate-model-docs.js <path-to-model-manifest.json>');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const outDir = path.join(__dirname, '..', 'skills', 'imagine-models');

function extractNotes(existingContent) {
  const notes = {};
  const regex = /<!-- NOTES:(\S+) -->\n([\s\S]*?)<!-- NOTES:END -->/g;
  let match;
  while ((match = regex.exec(existingContent)) !== null) {
    notes[match[1]] = match[2];
  }
  return notes;
}

function formatModes(modes) {
  return Object.keys(modes).join(', ');
}

function formatAllowedByMode(allowedByMode) {
  if (!allowedByMode) return null;
  const lines = [];
  for (const [mode, allowed] of Object.entries(allowedByMode)) {
    const parts = [];
    if (allowed.aspect_ratios?.length) parts.push(`AR: ${allowed.aspect_ratios.join(', ')}`);
    if (allowed.resolutions?.length) parts.push(`Res: ${allowed.resolutions.join(', ')}`);
    if (allowed.durations?.length) {
      const d = allowed.durations;
      if (d.length > 3 && d[d.length - 1] - d[0] === d.length - 1) {
        parts.push(`Duration: ${d[0]}-${d[d.length - 1]}s`);
      } else {
        parts.push(`Duration: ${d.join(', ')}s`);
      }
    }
    if (parts.length) lines.push(`  - ${mode}: ${parts.join(', ')}`);
  }
  return lines.length ? lines.join('\n') : null;
}

function formatConstraint(cName, cDef) {
  const parts = [];
  if (cDef.max_file_size_mb) parts.push(`max ${cDef.max_file_size_mb}MB`);
  if (cDef.accepted_formats) parts.push(`formats: ${cDef.accepted_formats.join('/')}`);
  if (cDef.min_side) parts.push(`min ${cDef.min_side}px`);
  if (cDef.max_side) parts.push(`max ${cDef.max_side}px`);
  if (cDef.max_pixels) parts.push(`max ${(cDef.max_pixels / 1e6).toFixed(0)}MP`);
  if (cDef.min_duration_seconds) parts.push(`min ${cDef.min_duration_seconds}s`);
  if (cDef.max_duration_seconds) parts.push(`max ${cDef.max_duration_seconds}s`);
  if (cDef.max_characters) parts.push(`max ${cDef.max_characters} chars`);
  if (cDef.aspect_ratio_range) parts.push(`aspect ratio range: ${cDef.aspect_ratio_range[0]}–${cDef.aspect_ratio_range[1]}`);
  if (cDef.duration_rules) {
    for (const dr of cDef.duration_rules) {
      const whenStr = Object.entries(dr.when).map(([k, v]) => `${k}=${v}`).join(', ');
      parts.push(`when ${whenStr}: max ${dr.max_duration_seconds}s`);
    }
  }
  return `- ${cName}: ${parts.join(', ')}`;
}

function formatPricing(pricing) {
  const lines = [];
  lines.push(`- Base: ${pricing.default} credits`);
  if (pricing.unit) lines.push(`- Unit: ${pricing.unit}`);
  if (pricing.pricing_notes) lines.push(`- Note: ${pricing.pricing_notes}`);
  if (pricing.rules?.length) {
    const grouped = {};
    for (const r of pricing.rules) {
      const key = JSON.stringify(r.when);
      grouped[key] = r.price;
    }
    const entries = Object.entries(grouped);
    if (entries.length <= 8) {
      for (const [whenStr, price] of entries) {
        const when = JSON.parse(whenStr);
        const desc = Object.entries(when).map(([k, v]) => `${k}=${Array.isArray(v) ? v.join('/') : v}`).join(', ');
        lines.push(`- ${desc}: ${price} credits`);
      }
    } else {
      lines.push(`- ${entries.length} pricing tiers (varies by resolution/duration/mode)`);
      const prices = Object.values(grouped);
      lines.push(`- Range: ${Math.min(...prices)}–${Math.max(...prices)} credits`);
    }
  }
  if (pricing.surcharges?.length) {
    for (const s of pricing.surcharges) {
      lines.push(`- Surcharge: ${s.param}=${s.match} adds +${s.add} credits`);
    }
  }
  return lines.join('\n');
}

function formatValidationRules(rules) {
  if (!rules?.length) return null;
  const lines = ['Validation Rules:'];
  for (const r of rules) {
    const whenParts = [];
    if (r.when.mode) whenParts.push(`mode=${Array.isArray(r.when.mode) ? r.when.mode.join('/') : r.when.mode}`);
    if (r.when.has) whenParts.push(`has ${r.when.has}`);
    if (r.when.resolution) whenParts.push(`resolution=${r.when.resolution}`);
    if (r.when.multi_shot !== undefined) whenParts.push(`multi_shot=${r.when.multi_shot}`);
    if (r.when.shot_type) whenParts.push(`shot_type=${r.when.shot_type}`);
    if (r.when.character_orientation) whenParts.push(`character_orientation=${r.when.character_orientation}`);
    const whenStr = whenParts.join(', ');
    const action = r.action === 'forbid' ? `forbid ${r.field}` :
                   r.action === 'require_value' ? `require ${r.field}${r.value !== undefined ? '=' + r.value : ''}` :
                   r.action === 'force_value' ? `force ${r.field}=${r.value}` : r.action;
    const msg = r.message ? ` — ${r.message}` : '';
    lines.push(`- When ${whenStr}: ${action}${msg}`);
  }
  return lines.join('\n');
}

function formatProviderRoutes(providerRoutes) {
  if (!providerRoutes) return null;

  const lines = ['Provider Routes:'];

  if (providerRoutes.routes) {
    for (const [rName, rData] of Object.entries(providerRoutes.routes)) {
      const mult = providerRoutes.pricing?.[rName]?.multiplier || 1;
      let line = `- ${rName} (${mult}x)`;
      if (rData.allowed_by_mode) {
        const restrictions = [];
        for (const [mode, allowed] of Object.entries(rData.allowed_by_mode)) {
          const parts = [];
          if (allowed.aspect_ratios) parts.push(`AR: ${allowed.aspect_ratios.join(', ')}`);
          if (allowed.resolutions) parts.push(`Res: ${allowed.resolutions.join(', ')}`);
          if (allowed.durations) {
            const d = allowed.durations;
            if (d.length > 3 && d[d.length - 1] - d[0] === d.length - 1) {
              parts.push(`Dur: ${d[0]}-${d[d.length - 1]}s`);
            } else {
              parts.push(`Dur: ${d.join(', ')}s`);
            }
          }
          restrictions.push(`${mode}: ${parts.join(', ')}`);
        }
        line += '\n' + restrictions.map(r => `    - ${r}`).join('\n');
      }
      lines.push(line);
    }
  } else if (providerRoutes.available) {
    for (const rName of providerRoutes.available) {
      const mult = providerRoutes.pricing?.[rName]?.multiplier || 1;
      lines.push(`- ${rName} (${mult}x)`);
    }
  } else {
    return null;
  }

  if (providerRoutes.validation_rules) {
    lines.push('');
    lines.push('Route-specific restrictions:');
    for (const [rName, rules] of Object.entries(providerRoutes.validation_rules)) {
      for (const rule of rules) {
        const whenParts = Object.entries(rule.when).map(([k, v]) => `${k}=${Array.isArray(v) ? v.join('/') : v}`);
        lines.push(`- ${rName}: when ${whenParts.join(', ')} — ${rule.message}`);
      }
    }
  }

  return lines.join('\n');
}

function formatModeLimits(modes) {
  const lines = [];
  for (const [modeName, modeData] of Object.entries(modes)) {
    const parts = [];
    if (modeData.max_reference_images) parts.push(`max_reference_images=${modeData.max_reference_images}`);
    if (modeData.max_reference_videos) parts.push(`max_reference_videos=${modeData.max_reference_videos}`);
    if (modeData.max_reference_audios) parts.push(`max_reference_audios=${modeData.max_reference_audios}`);
    if (modeData.derived_parameters?.length) parts.push(`derived (auto-set): ${modeData.derived_parameters.join(', ')}`);
    if (parts.length) lines.push(`  - ${modeName}: ${parts.join(', ')}`);
  }
  return lines.length ? 'Per-mode limits:\n' + lines.join('\n') : null;
}

function generateImageModels(models, existingNotes) {
  let md = '# Image Models — Detailed Reference\n\n';
  md += '> Auto-generated from model-manifest.json. Hand-written notes in NOTES blocks are preserved.\n\n';

  for (const [name, data] of models) {
    md += `## ${name}\n\n`;

    md += '| Property | Value |\n|----------|-------|\n';
    md += `| Modes | ${formatModes(data.modes)} |\n`;

    if (data.allowed?.aspect_ratios?.length) {
      md += `| Aspect Ratios | ${data.allowed.aspect_ratios.join(', ')} |\n`;
    }
    if (data.allowed?.resolutions?.length) {
      md += `| Resolutions | ${data.allowed.resolutions.join(', ')} |\n`;
    }
    if (data.defaults) {
      const defs = Object.entries(data.defaults).map(([k, v]) => `${k}=${v}`).join(', ');
      md += `| Defaults | ${defs} |\n`;
    }
    if (data.limits) {
      for (const [mode, lim] of Object.entries(data.limits)) {
        if (lim.max_output_images) md += `| Max Output (${mode}) | ${lim.max_output_images} |\n`;
        if (lim.max_input_images) md += `| Max Input (${mode}) | ${lim.max_input_images} |\n`;
      }
    }
    if (data.supports_auto !== undefined) {
      md += `| Supports Auto | ${data.supports_auto ? 'yes' : 'no'} |\n`;
    }
    if (data.pricing?.default) {
      md += `| Base Price | ${data.pricing.default} credits |\n`;
    }
    md += '\n';

    // Per-mode allowed values (if they differ from top-level)
    if (data.allowed_by_mode) {
      const modeDetails = formatAllowedByMode(data.allowed_by_mode);
      if (modeDetails) {
        md += 'Per-mode constraints:\n' + modeDetails + '\n\n';
      }
    }

    if (data.parameters) {
      md += 'Special Parameters:\n';
      for (const [pName, pDef] of Object.entries(data.parameters)) {
        const flag = `--${pName.replace(/_/g, '-')}`;
        if (pDef.values) {
          md += `- \`${flag} <${pDef.values.join('|')}>\` — ${pDef.description} Default: ${pDef.default}.\n`;
        } else if (pDef.type === 'boolean') {
          md += `- \`${flag}\` — ${pDef.description} Default: ${pDef.default}.\n`;
        }
      }
      md += '\n';
    }

    if (data.constraints) {
      md += 'Input Constraints:\n';
      for (const [cName, cDef] of Object.entries(data.constraints)) {
        md += formatConstraint(cName, cDef) + '\n';
      }
      md += '\n';
    }

    // Pricing details
    if (data.pricing && (data.pricing.rules?.length || data.pricing.surcharges?.length)) {
      md += 'Pricing:\n' + formatPricing(data.pricing) + '\n\n';
    }

    // Provider routes
    const routeInfo = formatProviderRoutes(data.provider_routes);
    if (routeInfo) {
      md += routeInfo + '\n\n';
    }

    // Validation rules
    const valRules = formatValidationRules(data.validation_rules);
    if (valRules) {
      md += valRules + '\n\n';
    }

    const noteContent = existingNotes[name] || '<!-- Add hand-written tips and best practices here -->\n';
    md += `<!-- NOTES:${name} -->\n${noteContent}<!-- NOTES:END -->\n\n---\n\n`;
  }

  return md.trimEnd() + '\n';
}

function generateVideoModels(models, existingNotes) {
  let md = '# Video Models — Detailed Reference\n\n';
  md += '> Auto-generated from model-manifest.json. Hand-written notes in NOTES blocks are preserved.\n\n';

  for (const [name, data] of models) {
    md += `## ${name}\n\n`;

    md += '| Property | Value |\n|----------|-------|\n';
    md += `| Modes | ${formatModes(data.modes)} |\n`;

    if (data.allowed_by_mode) {
      const allAR = new Set();
      const allRes = new Set();
      const allDur = new Set();
      for (const allowed of Object.values(data.allowed_by_mode)) {
        (allowed.aspect_ratios || []).forEach(v => allAR.add(v));
        (allowed.resolutions || []).forEach(v => allRes.add(v));
        (allowed.durations || []).forEach(v => allDur.add(v));
      }
      if (allAR.size) md += `| Aspect Ratios | ${[...allAR].join(', ')} |\n`;
      if (allRes.size) md += `| Resolutions | ${[...allRes].join(', ')} |\n`;
      if (allDur.size) {
        const durs = [...allDur].sort((a, b) => a - b);
        if (durs.length > 3 && durs[durs.length - 1] - durs[0] === durs.length - 1) {
          md += `| Duration | ${durs[0]}-${durs[durs.length - 1]}s |\n`;
        } else {
          md += `| Duration | ${durs.join(', ')}s |\n`;
        }
      }
    }

    if (data.defaults) {
      const defs = Object.entries(data.defaults).map(([k, v]) => `${k}=${v}`).join(', ');
      md += `| Defaults | ${defs} |\n`;
    }
    if (data.supports_auto !== undefined) {
      md += `| Supports Auto | ${data.supports_auto ? 'yes' : 'no'} |\n`;
    }
    if (data.hidden_controls?.length) {
      md += `| Hidden Controls | ${data.hidden_controls.join(', ')} |\n`;
    }
    if (data.pricing?.default) {
      md += `| Base Price | ${data.pricing.default} credits |\n`;
    }
    if (data.pricing?.unit) {
      md += `| Pricing Unit | ${data.pricing.unit} |\n`;
    }
    md += '\n';

    const modeDetails = formatAllowedByMode(data.allowed_by_mode);
    if (modeDetails) {
      md += 'Per-mode constraints:\n' + modeDetails + '\n\n';
    }

    // Per-mode limits (max_reference_images, derived_parameters, etc.)
    const modeLimits = formatModeLimits(data.modes);
    if (modeLimits) {
      md += modeLimits + '\n\n';
    }

    if (data.parameters) {
      md += 'Special Parameters:\n';
      for (const [pName, pDef] of Object.entries(data.parameters)) {
        const flag = `--${pName.replace(/_/g, '-')}`;
        if (pDef.values) {
          const defStr = pDef.default !== undefined ? ` Default: ${pDef.default}.` : '';
          const reqStr = pDef.required ? ' **Required.**' : '';
          md += `- \`${flag} <${pDef.values.join('|')}>\` — ${pDef.description}${defStr}${reqStr}\n`;
        } else if (pDef.type === 'boolean') {
          md += `- \`${flag}\` — ${pDef.description} Default: ${pDef.default}.\n`;
        } else if (pDef.type === 'array') {
          md += `- \`${flag} <json>\` — ${pDef.description}\n`;
        }
      }
      md += '\n';
    }

    if (data.constraints) {
      md += 'Input Constraints:\n';
      for (const [cName, cDef] of Object.entries(data.constraints)) {
        md += formatConstraint(cName, cDef) + '\n';
      }
      md += '\n';
    }

    // Pricing details
    if (data.pricing && (data.pricing.rules?.length || data.pricing.surcharges?.length || data.pricing.unit)) {
      md += 'Pricing:\n' + formatPricing(data.pricing) + '\n\n';
    }

    // Provider routes (with per-route restrictions)
    const routeInfo = formatProviderRoutes(data.provider_routes);
    if (routeInfo) {
      md += routeInfo + '\n\n';
    }

    // Validation rules
    const valRules = formatValidationRules(data.validation_rules);
    if (valRules) {
      md += valRules + '\n\n';
    }

    const noteContent = existingNotes[name] || '<!-- Add hand-written tips and best practices here -->\n';
    md += `<!-- NOTES:${name} -->\n${noteContent}<!-- NOTES:END -->\n\n---\n\n`;
  }

  return md.trimEnd() + '\n';
}

const imageModels = [];
const videoModels = [];

for (const [name, data] of Object.entries(manifest)) {
  if (name === 'mock' || name === 'mock-image') continue;
  if (data.kind === 'image') imageModels.push([name, data]);
  else if (data.kind === 'video') videoModels.push([name, data]);
}

const imageFile = path.join(outDir, 'image-models.md');
const videoFile = path.join(outDir, 'video-models.md');

const existingImageNotes = fs.existsSync(imageFile) ? extractNotes(fs.readFileSync(imageFile, 'utf8')) : {};
const existingVideoNotes = fs.existsSync(videoFile) ? extractNotes(fs.readFileSync(videoFile, 'utf8')) : {};

const expectedImage = generateImageModels(imageModels, existingImageNotes);
const expectedVideo = generateVideoModels(videoModels, existingVideoNotes);

if (process.argv.includes('--check')) {
  let drift = false;
  const currentImage = fs.existsSync(imageFile) ? fs.readFileSync(imageFile, 'utf8') : '';
  const currentVideo = fs.existsSync(videoFile) ? fs.readFileSync(videoFile, 'utf8') : '';
  if (currentImage !== expectedImage) {
    console.error(`DRIFT: ${imageFile} is out of date.`);
    drift = true;
  }
  if (currentVideo !== expectedVideo) {
    console.error(`DRIFT: ${videoFile} is out of date.`);
    drift = true;
  }
  if (drift) {
    console.error('Run without --check to regenerate.');
    process.exit(1);
  }
  console.log('Model docs are up to date.');
  process.exit(0);
}

fs.writeFileSync(imageFile, expectedImage);
fs.writeFileSync(videoFile, expectedVideo);

console.log(`Generated ${imageModels.length} image models → ${imageFile}`);
console.log(`Generated ${videoModels.length} video models → ${videoFile}`);
