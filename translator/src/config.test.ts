import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadConfig } from './config.js';

describe('loadConfig', () => {
	let dir: string;

	beforeEach(() => {
		dir = mkdtempSync(path.join(tmpdir(), 'translator-config-'));
	});

	afterEach(() => {
		rmSync(dir, { recursive: true, force: true });
	});

	it('loads a valid config, stripping // comments', () => {
		const configPath = path.join(dir, 'translator.config.json');
		writeFileSync(
			configPath,
			`{
				// languages to translate into
				"languages": [{ "code": "fr", "name": "French" }],
				"translatables": [
					{ "source": "en.json", "target": "{lang}.json", "shortname": "app" }
				],
				"ignore": []
			}`
		);

		const { config, root } = loadConfig(configPath);

		expect(root).toBe(dir);
		expect(config.languages).toEqual([{ code: 'fr', name: 'French' }]);
		expect(config.translatables[0]?.shortname).toBe('app');
	});

	it('throws a clear error when the file does not exist', () => {
		expect(() => loadConfig(path.join(dir, 'missing.json'))).toThrow(/not found/);
	});

	it('throws when a target is missing the {lang} placeholder', () => {
		const configPath = path.join(dir, 'translator.config.json');
		writeFileSync(
			configPath,
			JSON.stringify({
				languages: [{ code: 'fr', name: 'French' }],
				translatables: [{ source: 'en.json', target: 'fr.json', shortname: 'app' }]
			})
		);

		expect(() => loadConfig(configPath)).toThrow(/\{lang\}/);
	});

	it('throws on duplicate shortnames', () => {
		const configPath = path.join(dir, 'translator.config.json');
		writeFileSync(
			configPath,
			JSON.stringify({
				languages: [{ code: 'fr', name: 'French' }],
				translatables: [
					{ source: 'a/en.json', target: 'a/{lang}.json', shortname: 'app' },
					{ source: 'b/en.json', target: 'b/{lang}.json', shortname: 'app' }
				]
			})
		);

		expect(() => loadConfig(configPath)).toThrow(/duplicate shortname/);
	});
});
