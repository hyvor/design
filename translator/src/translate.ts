import Anthropic from '@anthropic-ai/sdk';
import path from 'node:path';

export const DEFAULT_MODEL = 'claude-sonnet-5';

function buildSystemPrompt(ext: string, langName: string, langCode: string): string {
	const shared = `You are a professional translator working on the source files of a software project. Translate the given file from English into ${langName} (${langCode}).

Rules:
- Translate only human-facing text: prose, headings, list items, labels, titles, descriptions, and attributes meant to be read by users (e.g. "title", "alt", "placeholder", "aria-label").
- Never translate or alter: object/property keys, code, HTML/component tag names, attribute names (only some attribute values), class names, ids, URLs, file paths, import statements, variable/prop names, i18n or translation keys, or anything inside code blocks, <code>, <pre>, or template literals meant to show code to the reader (e.g. a CodeBlock's "code" prop).
- Preserve short inline pseudo-tags exactly as-is (e.g. <marker>...</marker>, <hl>...</hl>) — translate only the text between them, never the tag names.
- Preserve the exact file structure, syntax, formatting, indentation, and whitespace of the original. The output must remain a syntactically valid file of the same type.
- Do not add, remove, or reorder keys/elements/attributes. Do not add comments, notes, or explanations of your own.
- Output ONLY the fully translated file content and nothing else: no markdown code fences, no preamble, no trailing remarks.`;

	const hints: Record<string, string> = {
		'.json': `This is a JSON file of UI strings used for i18n. Translate every string VALUE naturally and idiomatically. Never translate, rename, add, or remove JSON keys. Keep the same nesting.`,
		'.svelte': `This is a Svelte component. Translate the visible text content (paragraphs, headings, list items, link text, callouts, and human-facing attribute values like "title" or "alt"). Do NOT translate: the <script> block, Svelte syntax (e.g. {#if}, {#each}, {@html}, {expression}), component and prop names, class/style/href/id attribute values, and code shown to the reader inside <code>, <pre>, or a CodeBlock's "code" prop.`,
		'.md': `This is a Markdown file. Translate the prose, headings, list items, and link text. Do NOT translate: code fences and inline code, URLs, and Markdown syntax itself. If there is YAML front-matter, only translate string values meant for display (e.g. "title", "description"), never the keys.`,
		'.mdx': `This is an MDX file (Markdown with embedded JSX). Translate the prose the same way as Markdown. Do NOT translate JSX component/prop names, code fences, inline code, or URLs.`
	};

	return [shared, hints[ext]].filter(Boolean).join('\n\n');
}

// ---------------------------------------------------------------------------
// Live preview: shows the last few lines of streamed output in-place,
// scrolling like a tiny "terminal within the terminal" instead of dumping
// every token to the log.
// ---------------------------------------------------------------------------

const PREVIEW_ROWS = 6;

class LivePreview {
	private drawn = false;
	private readonly enabled = process.stdout.isTTY === true;

	update(text: string) {
		if (!this.enabled) return;

		const width = Math.max((process.stdout.columns || 80) - 2, 10);
		const lines = text.split('\n').slice(-PREVIEW_ROWS);
		while (lines.length < PREVIEW_ROWS) lines.unshift('');

		if (this.drawn) {
			process.stdout.write(`\x1b[${PREVIEW_ROWS}A`);
		}
		for (const line of lines) {
			const clipped = line.length > width ? line.slice(0, width - 1) + '…' : line;
			process.stdout.write(`\x1b[2K${clipped}\n`);
		}
		this.drawn = true;
	}

	clear() {
		if (!this.enabled || !this.drawn) return;
		process.stdout.write(`\x1b[${PREVIEW_ROWS}A`);
		for (let i = 0; i < PREVIEW_ROWS; i++) {
			process.stdout.write('\x1b[2K\n');
		}
		process.stdout.write(`\x1b[${PREVIEW_ROWS}A`);
		this.drawn = false;
	}
}

function stripCodeFence(text: string): string {
	const trimmed = text.trim();
	const lines = trimmed.split('\n');
	const firstLine = lines[0];
	const lastLine = lines[lines.length - 1];
	if (
		lines.length >= 2 &&
		firstLine !== undefined &&
		/^```/.test(firstLine) &&
		lastLine?.trim() === '```'
	) {
		return lines.slice(1, -1).join('\n');
	}
	return trimmed;
}

export async function translateContent(
	anthropic: Anthropic,
	model: string,
	filePath: string,
	langName: string,
	langCode: string,
	content: string
): Promise<string> {
	const ext = path.extname(filePath);
	const system = buildSystemPrompt(ext, langName, langCode);

	const maxAttempts = 3;

	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		const preview = new LivePreview();
		try {
			// Streaming is required by the API once max_tokens is high enough
			// that a response could plausibly take longer than 10 minutes to
			// generate; it also lets us show live progress below.
			const stream = anthropic.messages.stream({
				model,
				max_tokens: 64000,
				//temperature: 0,
				system,
				messages: [{ role: 'user', content }]
			});

			stream.on('text', (_delta, snapshot) => preview.update(snapshot));

			const text = await stream.finalText();
			preview.clear();

			const translated = stripCodeFence(text);
			return translated + (content.endsWith('\n') && !translated.endsWith('\n') ? '\n' : '');
		} catch (err) {
			preview.clear();
			const status = err instanceof Anthropic.APIError ? err.status : undefined;
			const retryable = status === undefined || status === 429 || status >= 500;
			if (!retryable || attempt >= maxAttempts) {
				throw err;
			}
			await new Promise((r) => setTimeout(r, attempt * 1000));
		}
	}

	throw new Error('unreachable');
}
