import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { resolvePairs } from './glob.js';

describe('resolvePairs', () => {
	let root: string;

	beforeEach(() => {
		root = mkdtempSync(path.join(tmpdir(), 'translator-glob-'));
	});

	afterEach(() => {
		rmSync(root, { recursive: true, force: true });
	});

	it('resolves a literal source/target pair, substituting {lang}', () => {
		mkdirSync(path.join(root, 'locales'), { recursive: true });
		writeFileSync(path.join(root, 'locales/en.json'), '{}');

		const pairs = resolvePairs(
			{ source: 'locales/en.json', target: 'locales/{lang}.json', shortname: 'app' },
			root,
			'fr'
		);

		expect(pairs).toHaveLength(1);
		expect(pairs[0]?.source).toBe(path.join(root, 'locales/en.json'));
		expect(pairs[0]?.target).toBe(path.join(root, 'locales/fr.json'));
		expect(pairs[0]?.nested).toBe(false);
	});

	it('resolves a single "*" wildcard in the last segment', () => {
		mkdirSync(path.join(root, 'docs/en'), { recursive: true });
		writeFileSync(path.join(root, 'docs/en/a.md'), '# A');
		writeFileSync(path.join(root, 'docs/en/b.md'), '# B');
		writeFileSync(path.join(root, 'docs/en/c.txt'), 'not markdown');

		const pairs = resolvePairs(
			{ source: 'docs/en/*.md', target: 'docs/{lang}/*.md', shortname: 'docs' },
			root,
			'es'
		);

		const targets = pairs.map((p) => path.relative(root, p.target)).sort();
		expect(targets).toEqual(['docs/es/a.md', 'docs/es/b.md']);
	});

	it('resolves nested directories with "**"', () => {
		mkdirSync(path.join(root, 'docs/en/nested'), { recursive: true });
		writeFileSync(path.join(root, 'docs/en/top.svelte'), 'top');
		writeFileSync(path.join(root, 'docs/en/nested/child.svelte'), 'child');

		const pairs = resolvePairs(
			{ source: 'docs/en/**/*.svelte', target: 'docs/{lang}/**/*.svelte', shortname: 'pages' },
			root,
			'fr'
		);

		const targets = pairs.map((p) => path.relative(root, p.target)).sort();
		expect(targets).toEqual(['docs/fr/nested/child.svelte', 'docs/fr/top.svelte']);
		expect(pairs.every((p) => p.nested)).toBe(true);
	});
});
