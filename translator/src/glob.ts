import { existsSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import type { TranslatableSpec } from './config.js';

// ---------------------------------------------------------------------------
// Minimal glob-free path matcher.
//
// Route folders in Hyvor projects use literal `[[bracket]]` names, which a
// real glob engine (`[...]` = character class) would misinterpret. We only
// ever need `**` (any depth) and a single `*` wildcard within one filename
// segment, so we walk the filesystem by hand instead of pulling in a glob
// dependency for `source`/`target` resolution.
// ---------------------------------------------------------------------------

function splitStaticAndGlob(pattern: string) {
	const segments = pattern.split('/');
	const idx = segments.findIndex((seg) => seg.includes('*'));
	if (idx === -1) {
		return { staticSegments: segments, globSegments: [] as string[] };
	}
	return { staticSegments: segments.slice(0, idx), globSegments: segments.slice(idx) };
}

function segmentToRegex(segment: string): RegExp {
	const escaped = segment.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
	return new RegExp(`^${escaped}$`);
}

/** Returns paths (posix-joined, relative to `baseDir`) of files matching `globSegments`. */
function walkMatch(baseDir: string, globSegments: string[]): string[] {
	if (globSegments.length === 0) {
		return existsSync(baseDir) ? [''] : [];
	}

	const segment = globSegments[0]!;
	const rest = globSegments.slice(1);

	if (segment === '**') {
		const results: string[] = [];
		const recurse = (dir: string, relPrefix: string) => {
			if (!existsSync(dir)) return;
			for (const rel of walkMatch(dir, rest)) {
				results.push(relPrefix && rel ? `${relPrefix}/${rel}` : relPrefix || rel);
			}
			for (const entry of readdirSync(dir, { withFileTypes: true })) {
				if (entry.isDirectory()) {
					recurse(
						path.join(dir, entry.name),
						relPrefix ? `${relPrefix}/${entry.name}` : entry.name
					);
				}
			}
		};
		recurse(baseDir, '');
		return results;
	}

	if (!existsSync(baseDir)) return [];

	const regex = segmentToRegex(segment);
	const results: string[] = [];
	for (const entry of readdirSync(baseDir, { withFileTypes: true })) {
		if (!regex.test(entry.name)) continue;
		if (rest.length === 0) {
			if (entry.isFile()) results.push(entry.name);
		} else if (entry.isDirectory()) {
			for (const rel of walkMatch(path.join(baseDir, entry.name), rest)) {
				results.push(`${entry.name}/${rel}`);
			}
		}
	}
	return results;
}

export type ResolvedPair = { source: string; target: string; nested: boolean };

export function resolvePairs(
	spec: TranslatableSpec,
	root: string,
	langCode: string
): ResolvedPair[] {
	const targetPattern = spec.target.replaceAll('{lang}', langCode);

	const src = splitStaticAndGlob(spec.source);
	const tgt = splitStaticAndGlob(targetPattern);

	const srcBaseDir = path.join(root, ...src.staticSegments);
	const tgtBaseDir = path.join(root, ...tgt.staticSegments);

	const relMatches = walkMatch(srcBaseDir, src.globSegments);
	const nested = src.globSegments[0] === '**';

	return relMatches.map((rel) => ({
		source: src.globSegments.length === 0 ? srcBaseDir : path.join(srcBaseDir, rel),
		target: tgt.globSegments.length === 0 ? tgtBaseDir : path.join(tgtBaseDir, rel),
		nested
	}));
}

/**
 * Directory-based translatables (source using `**`) often keep non-source
 * assets (images, gifs) next to the file, imported with relative paths.
 * Copy those siblings into the translated directory too, otherwise the
 * translated file fails to build/render.
 */
export function copySiblingAssets(sourceFile: string, targetFile: string) {
	const srcDir = path.dirname(sourceFile);
	const tgtDir = path.dirname(targetFile);
	const translatedExt = path.extname(sourceFile);

	if (!existsSync(srcDir)) return;

	for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
		if (!entry.isFile() || path.extname(entry.name) === translatedExt) continue;

		const destPath = path.join(tgtDir, entry.name);
		if (!existsSync(destPath)) {
			mkdirSync(tgtDir, { recursive: true });
			copyFileSync(path.join(srcDir, entry.name), destPath);
		}
	}
}
