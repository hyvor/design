import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export type Language = {
	code: string;
	name: string;
};

export type TranslatableSpec = {
	// path relative to the config file's directory, may use `**` (any depth)
	// and a single `*` wildcard inside the last segment (e.g. `*.md`)
	source: string;
	// same shape as `source`, with `{lang}` substituted for the target language code
	target: string;
	// short identifier used with --only / --force (e.g. "app", "docs")
	shortname: string;
};

export type TranslatorConfig = {
	languages: Language[];
	translatables: TranslatableSpec[];
	// glob patterns (matched against the source path, relative to the config
	// file's directory) to always skip, e.g. "**/*.draft.md"
	ignore: string[];
	// overrides the default model; can also be set via ANTHROPIC_MODEL
	model?: string;
};

export type LoadedConfig = {
	config: TranslatorConfig;
	configPath: string;
	// directory containing the config file; all source/target paths are relative to this
	root: string;
};

/**
 * Strips `//` line comments outside of strings, so a translator.config.json
 * can be annotated even though JSON itself has no comment syntax.
 */
function stripJsonComments(input: string): string {
	return input.replace(/("(?:\\.|[^"\\])*")|\/\/.*$/gm, (_match, str) => (str ? str : ''));
}

export function loadConfig(configPathArg: string): LoadedConfig {
	const configPath = path.resolve(process.cwd(), configPathArg);

	if (!existsSync(configPath)) {
		throw new Error(
			`Config file not found at ${configPath}. Create a translator.config.json, or pass --config <path>.`
		);
	}

	const raw = readFileSync(configPath, 'utf-8');
	let parsed: unknown;
	try {
		parsed = JSON.parse(stripJsonComments(raw));
	} catch (err) {
		throw new Error(`Failed to parse ${configPath}: ${err instanceof Error ? err.message : err}`);
	}

	return {
		config: validate(parsed, configPath),
		configPath,
		root: path.dirname(configPath)
	};
}

function validate(parsed: unknown, configPath: string): TranslatorConfig {
	if (typeof parsed !== 'object' || parsed === null) {
		throw new Error(`${configPath} must contain a JSON object.`);
	}
	const obj = parsed as Record<string, unknown>;

	if (!Array.isArray(obj.languages) || obj.languages.length === 0) {
		throw new Error(`${configPath}: "languages" must be a non-empty array of { code, name }.`);
	}
	const languages: Language[] = obj.languages.map((l, i) => {
		const lang = l as Record<string, unknown>;
		if (
			typeof lang !== 'object' ||
			lang === null ||
			typeof lang.code !== 'string' ||
			typeof lang.name !== 'string'
		) {
			throw new Error(`${configPath}: languages[${i}] must be { code: string, name: string }.`);
		}
		return { code: lang.code, name: lang.name };
	});

	if (!Array.isArray(obj.translatables) || obj.translatables.length === 0) {
		throw new Error(`${configPath}: "translatables" must be a non-empty array.`);
	}
	const seenShortnames = new Set<string>();
	const translatables: TranslatableSpec[] = obj.translatables.map((t, i) => {
		const spec = t as Record<string, unknown>;
		if (
			typeof spec !== 'object' ||
			spec === null ||
			typeof spec.source !== 'string' ||
			typeof spec.target !== 'string' ||
			typeof spec.shortname !== 'string'
		) {
			throw new Error(
				`${configPath}: translatables[${i}] must be { source: string, target: string, shortname: string }.`
			);
		}
		if (!spec.target.includes('{lang}')) {
			throw new Error(
				`${configPath}: translatables[${i}].target must contain the "{lang}" placeholder.`
			);
		}
		if (spec.shortname.includes('/')) {
			throw new Error(`${configPath}: translatables[${i}].shortname must not contain "/".`);
		}
		if (seenShortnames.has(spec.shortname)) {
			throw new Error(`${configPath}: duplicate shortname "${spec.shortname}" in translatables.`);
		}
		seenShortnames.add(spec.shortname);
		return { source: spec.source, target: spec.target, shortname: spec.shortname };
	});

	const ignore = Array.isArray(obj.ignore)
		? obj.ignore.filter((i): i is string => typeof i === 'string')
		: [];

	const model = typeof obj.model === 'string' ? obj.model : undefined;

	return { languages, translatables, ignore, model };
}
