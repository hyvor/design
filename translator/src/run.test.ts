import { describe, it, expect } from 'vitest';
import { matchesSelector } from './run.js';

describe('matchesSelector', () => {
	const root = '/project';
	const relSource = 'frontend/src/docs/en/api-console.md';
	const absSource = '/project/frontend/src/docs/en/api-console.md';

	it('matches the bare shortname, selecting the whole translatable', () => {
		expect(matchesSelector(['docs'], 'docs', relSource, absSource, root)).toBe(true);
		expect(matchesSelector(['app'], 'docs', relSource, absSource, root)).toBe(false);
	});

	it('matches "shortname/relative/path" to one file within it', () => {
		expect(matchesSelector(['docs/api-console.md'], 'docs', relSource, absSource, root)).toBe(true);
		expect(matchesSelector(['docs/other.md'], 'docs', relSource, absSource, root)).toBe(false);
	});

	it('falls back to matching a raw path against the resolved source', () => {
		expect(
			matchesSelector(['frontend/src/docs/en/api-console.md'], 'docs', relSource, absSource, root)
		).toBe(true);
		expect(
			matchesSelector(['frontend/src/docs/en/other.md'], 'docs', relSource, absSource, root)
		).toBe(false);
	});
});
