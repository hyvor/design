import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// relative source path -> lang code -> sha256 of the source content that
// was last translated for that language
export type Cache = Record<string, Record<string, string>>;

export function loadCache(cacheFile: string): Cache {
	if (!existsSync(cacheFile)) return {};
	try {
		return JSON.parse(readFileSync(cacheFile, 'utf-8'));
	} catch {
		console.warn(`Could not parse ${cacheFile}, starting with an empty cache.`);
		return {};
	}
}

export function saveCache(cacheFile: string, cache: Cache) {
	writeFileSync(cacheFile, JSON.stringify(cache, null, '\t') + '\n', 'utf-8');
}

export function hashContent(content: string): string {
	return createHash('sha256').update(content).digest('hex');
}
