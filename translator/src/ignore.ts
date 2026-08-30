import { minimatch } from 'minimatch';

export function isIgnored(relPath: string, patterns: string[]): boolean {
	return patterns.some((pattern) => minimatch(relPath, pattern, { dot: true }));
}
