import { describe, it, expect } from 'vitest';
import { isIgnored } from './ignore.js';

describe('isIgnored', () => {
	it('matches a glob pattern against the relative path', () => {
		expect(isIgnored('docs/en/notes.md', ['**/*.draft.md'])).toBe(false);
		expect(isIgnored('docs/en/notes.draft.md', ['**/*.draft.md'])).toBe(true);
	});

	it('returns false when there are no patterns', () => {
		expect(isIgnored('anything.md', [])).toBe(false);
	});
});
