import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { loadConfig } from './config.js';
import { parseArgs, printHelp } from './args.js';
import { resolvePairs, copySiblingAssets } from './glob.js';
import { isIgnored } from './ignore.js';
import { loadCache, saveCache, hashContent } from './cache.js';
import { translateContent, DEFAULT_MODEL } from './translate.js';

function relTo(root: string, absPath: string): string {
	return path.relative(root, absPath).split(path.sep).join('/');
}

/**
 * A selector (from --only/--force) matches either:
 *  - the shortname itself (the whole translatable), or
 *  - "shortname/relative/path" (one file within it), or
 *  - a raw path matching the source's path relative to the project root
 */
export function matchesSelector(
	selectors: string[],
	shortname: string,
	relSource: string,
	absSource: string,
	root: string
): boolean {
	return selectors.some((selector) => {
		if (selector === shortname) return true;

		const normalized = selector.split(path.sep).join('/');

		if (normalized.startsWith(`${shortname}/`)) {
			const suffix = normalized.slice(shortname.length + 1);
			return relSource === suffix || relSource.endsWith(`/${suffix}`);
		}

		return relSource === normalized || relSource.endsWith(`/${normalized}`) || path.resolve(root, selector) === absSource;
	});
}

export async function run(argv: string[]) {
	let args;
	try {
		args = parseArgs(argv);
	} catch (err) {
		console.error(err instanceof Error ? err.message : err);
		printHelp();
		process.exit(1);
	}

	if (!process.env.ANTHROPIC_API_KEY) {
		console.error('ANTHROPIC_API_KEY is not set.');
		process.exit(1);
	}

	const { config, root } = loadConfig(args.config);
	const model = process.env.ANTHROPIC_MODEL || config.model || DEFAULT_MODEL;
	const anthropic = new Anthropic();

	let languages = config.languages;
	if (args.langs) {
		const known = new Set(config.languages.map((l) => l.code));
		for (const code of args.langs) {
			if (!known.has(code)) {
				console.error(`Unknown language code "${code}". Known languages: ${[...known].join(', ')}`);
				process.exit(1);
			}
		}
		languages = config.languages.filter((l) => args.langs!.includes(l.code));
	}

	const cacheFile = path.join(root, '.translator-cache.json');
	const cache = loadCache(cacheFile);

	let translatedCount = 0;
	let skippedCount = 0;
	let ignoredCount = 0;
	let failedCount = 0;

	for (const spec of config.translatables) {
		for (const lang of languages) {
			const pairs = resolvePairs(spec, root, lang.code);

			for (const { source, target, nested } of pairs) {
				const relSource = relTo(root, source);

				if (isIgnored(relSource, config.ignore)) {
					ignoredCount++;
					continue;
				}

				if (args.only.length > 0 && !matchesSelector(args.only, spec.shortname, relSource, source, root)) {
					continue;
				}

				if (nested) {
					copySiblingAssets(source, target);
				}

				const content = readFileSync(source, 'utf-8');
				const hash = hashContent(content);

				const cached = cache[relSource]?.[lang.code];
				const targetExists = existsSync(target);
				const forced =
					args.forceAll || matchesSelector(args.forceFiles, spec.shortname, relSource, source, root);

				if (!forced && targetExists && cached === hash) {
					skippedCount++;
					continue;
				}

				console.log(`Translating ${relSource} -> ${lang.code} (${relTo(root, target)})`);

				const previousTranslation = targetExists ? readFileSync(target, 'utf-8') : undefined;

				try {
					const translated = await translateContent(
						anthropic,
						model,
						source,
						lang.name,
						lang.code,
						content,
						previousTranslation
					);
					mkdirSync(path.dirname(target), { recursive: true });
					writeFileSync(target, translated, 'utf-8');

					cache[relSource] ??= {};
					cache[relSource][lang.code] = hash;
					translatedCount++;
				} catch (err) {
					failedCount++;
					console.error(`Failed to translate ${relSource} -> ${lang.code}:`, err instanceof Error ? err.message : err);
				}
			}
		}
	}

	saveCache(cacheFile, cache);

	console.log(`Done. Translated ${translatedCount}, skipped ${skippedCount}, ignored ${ignoredCount}, failed ${failedCount}.`);
	if (failedCount > 0) process.exit(1);
}
