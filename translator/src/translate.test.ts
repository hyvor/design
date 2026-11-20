import { describe, expect, it } from 'vitest';
import { applyEdits } from './translate.js';

const prev = 'a\nb\nc\nd\n';

describe('applyEdits', () => {
	it('replaces, deletes and inserts lines', () => {
		const res = [
			'<edit start="2" end="2">\nB2\n</edit>',
			'<edit start="3" end="3">\n</edit>',
			'<edit start="5" end="4">\ne\n</edit>'
		].join('\n');
		expect(applyEdits(prev, res)).toBe('a\nB2\nd\ne\n');
	});

	it('returns the previous content for no_changes', () => {
		expect(applyEdits(prev, '<no_changes/>')).toBe(prev);
	});

	it('throws on out-of-bounds, overlapping or missing edits', () => {
		expect(() => applyEdits(prev, '<edit start="9" end="9">\nx\n</edit>')).toThrow();
		expect(() =>
			applyEdits(prev, '<edit start="1" end="2">\nx\n</edit><edit start="2" end="2">\ny\n</edit>')
		).toThrow();
		expect(() => applyEdits(prev, 'whatever')).toThrow();
	});
});
