#!/usr/bin/env node
import { run } from './run.js';

run(process.argv.slice(2)).catch((err) => {
	console.error(err instanceof Error ? err.message : err);
	process.exit(1);
});
