import Anthropic from '@anthropic-ai/sdk';
import path from 'node:path';

export const DEFAULT_MODEL = 'claude-sonnet-5';

function buildSystemPrompt(
	ext: string,
	langName: string,
	langCode: string,
	isUpdate: boolean
): string {
	const shared = `You are a professional translator working on the source files of a software project. Translate the given file from English into ${langName} (${langCode}).

Rules:
- Translate only human-facing text: prose, headings, list items, labels, titles, descriptions, and attributes meant to be read by users (e.g. "title", "alt", "placeholder", "aria-label").
- Never translate or alter: object/property keys, code, HTML/component tag names, attribute names (only some attribute values), class names, ids, URLs, file paths, import statements, variable/prop names, i18n or translation keys, or anything inside code blocks, <code>, <pre>, or template literals meant to show code to the reader (e.g. a CodeBlock's "code" prop).
- Preserve short inline pseudo-tags exactly as-is (e.g. <marker>...</marker>, <hl>...</hl>) — translate only the text between them, never the tag names.
- Preserve the exact file structure, syntax, formatting, indentation, and whitespace of the original. The output must remain a syntactically valid file of the same type.
- Do not add, remove, or reorder keys/elements/attributes. Do not add comments, notes, or explanations of your own.
- Output ONLY the fully translated file content and nothing else: no markdown code fences, no preamble, no trailing remarks.`;

	const fullOutputRule = isUpdate ? shared.replace(/\n- Output ONLY[^\n]*$/, '') : shared;

	const updateHint = isUpdate
		? `You are updating an existing ${langName} translation to match an updated English source. You are given <existing_translation> (with line numbers in the form "12| text", the number and "| " are not part of the file) and <updated_source>. Make MINIMAL changes: keep the existing translation wherever the corresponding English text is unchanged in meaning, even if you would have translated it differently from scratch.

Do NOT output the whole file. Instead output only the edits needed, each as:

<edit start="N" end="M">
replacement lines (without line numbers)
</edit>

- start/end are inclusive line numbers of the existing translation to replace.
- To delete lines, leave the body empty.
- To insert without replacing, use end = start - 1 (insert before line "start"; to append at the end of the file, use start = last line + 1 and end = last line).
- Edits must not overlap. Keep each edit as small as possible and include only lines that change.
- The result after applying all edits must match the structure of <updated_source>.
- If nothing needs to change, output exactly <no_changes/>.
- Output nothing but the edit blocks (or <no_changes/>). This overrides the "output the fully translated file" rule above.`
		: undefined;

	const hints: Record<string, string> = {
		'.json': `This is a JSON file of UI strings used for i18n. Translate every string VALUE naturally and idiomatically. Never translate, rename, add, or remove JSON keys. Keep the same nesting.`,
		'.svelte': `This is a Svelte component. Translate the visible text content (paragraphs, headings, list items, link text, callouts, and human-facing attribute values like "title" or "alt"). Do NOT translate: the <script> block, Svelte syntax (e.g. {#if}, {#each}, {@html}, {expression}), component and prop names, class/style/href/id attribute values, and code shown to the reader inside <code>, <pre>, or a CodeBlock's "code" prop.`,
		'.md': `This is a Markdown file. Translate the prose, headings, list items, and link text. Do NOT translate: code fences and inline code, URLs, and Markdown syntax itself. If there is YAML front-matter, only translate string values meant for display (e.g. "title", "description"), never the keys.`,
		'.mdx': `This is an MDX file (Markdown with embedded JSX). Translate the prose the same way as Markdown. Do NOT translate JSX component/prop names, code fences, inline code, or URLs.`
	};

	return [fullOutputRule, updateHint, hints[ext]].filter(Boolean).join('\n\n');
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

async function callModel(
	anthropic: Anthropic,
	model: string,
	system: string,
	userContent: string
): Promise<string> {
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
				messages: [{ role: 'user', content: userContent }]
			});

			stream.on('text', (_delta, snapshot) => preview.update(snapshot));

			const text = await stream.finalText();
			preview.clear();
			return text;
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

function splitLines(text: string): { lines: string[]; trailingNewline: boolean } {
	const trailingNewline = text.endsWith('\n');
	const lines = (trailingNewline ? text.slice(0, -1) : text).split('\n');
	return { lines, trailingNewline };
}

/**
 * Applies <edit start end>...</edit> blocks (1-based, inclusive line ranges
 * of `previous`) and returns the new file. Throws if the response is malformed
 * so the caller can fall back to a full translation.
 */
export function applyEdits(previous: string, response: string): string {
	const { lines, trailingNewline } = splitLines(previous);

	if (/<no_changes\s*\/>/.test(response) && !/<edit\s/.test(response)) {
		return previous;
	}

	const edits: { start: number; end: number; body: string[] }[] = [];
	const re = /<edit start="(\d+)" end="(\d+)">\n?([\s\S]*?)\n?<\/edit>/g;
	let match: RegExpExecArray | null;
	while ((match = re.exec(response)) !== null) {
		const start = Number(match[1]);
		const end = Number(match[2]);
		const body = match[3] ?? '';
		if (start < 1 || start > lines.length + 1 || end < start - 1 || end > lines.length) {
			throw new Error(`Edit range ${start}-${end} is out of bounds`);
		}
		edits.push({ start, end, body: body === '' ? [] : body.split('\n') });
	}

	if (edits.length === 0) {
		throw new Error('No edits found in model response');
	}

	edits.sort((a, b) => a.start - b.start || a.end - b.end);
	for (let i = 1; i < edits.length; i++) {
		if (edits[i]!.start <= edits[i - 1]!.end) {
			throw new Error('Overlapping edits in model response');
		}
	}

	// apply bottom-up so earlier line numbers stay valid
	for (const { start, end, body } of edits.reverse()) {
		lines.splice(start - 1, end - start + 1, ...body);
	}

	return lines.join('\n') + (trailingNewline ? '\n' : '');
}

export async function translateContent(
	anthropic: Anthropic,
	model: string,
	filePath: string,
	langName: string,
	langCode: string,
	content: string,
	previousTranslation?: string
): Promise<string> {
	const ext = path.extname(filePath);

	const finish = (text: string) => {
		const translated = stripCodeFence(text);
		return translated + (content.endsWith('\n') && !translated.endsWith('\n') ? '\n' : '');
	};

	if (previousTranslation !== undefined) {
		const { lines } = splitLines(previousTranslation);
		const numbered = lines.map((line, i) => `${i + 1}| ${line}`).join('\n');
		const userContent = `<existing_translation lang="${langCode}">\n${numbered}\n</existing_translation>\n\n<updated_source lang="en">\n${content}\n</updated_source>`;

		try {
			const response = await callModel(
				anthropic,
				model,
				buildSystemPrompt(ext, langName, langCode, true),
				userContent
			);
			return applyEdits(previousTranslation, response);
		} catch (err) {
			if (err instanceof Anthropic.APIError) throw err;
			console.warn(
				`Could not apply incremental edits (${err instanceof Error ? err.message : err}); re-translating the whole file.`
			);
		}
	}

	const text = await callModel(
		anthropic,
		model,
		buildSystemPrompt(ext, langName, langCode, false),
		content
	);
	return finish(text);
}
