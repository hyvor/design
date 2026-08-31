import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { hashContent, loadCache, saveCache } from './cache.js';

describe('cache', () => {
	let dir: string;

	beforeEach(() => {
		dir = mkdtempSync(path.join(tmpdir(), 'translator-cache-'));
	});

	afterEach(() => {
		rmSync(dir, { recursive: true, force: true });
	});

	it('hashes content deterministically, and differently for different content', () => {
		expect(hashContent('hello')).toBe(hashContent('hello'));
		expect(hashContent('hello')).not.toBe(hashContent('world'));
	});

	it('returns an empty cache when the file does not exist yet', () => {
		expect(loadCache(path.join(dir, '.translator-cache.json'))).toEqual({});
	});

	it('round-trips a saved cache', () => {
		const cacheFile = path.join(dir, '.translator-cache.json');
		const cache = { 'locales/en.json': { fr: hashContent('hello') } };

		saveCache(cacheFile, cache);

		expect(existsSync(cacheFile)).toBe(true);
		expect(loadCache(cacheFile)).toEqual(cache);
	});
});
