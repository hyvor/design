export type Args = {
	config: string;
	forceFiles: string[];
	forceAll: boolean;
	only: string[];
	langs: string[] | null;
};

const DEFAULT_CONFIG = 'translator.config.json';

export function parseArgs(argv: string[]): Args {
	const args: Args = {
		config: DEFAULT_CONFIG,
		forceFiles: [],
		forceAll: false,
		only: [],
		langs: null
	};

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--config') {
			args.config = requireValue(argv, ++i, '--config');
		} else if (arg === '--force') {
			args.forceFiles.push(requireValue(argv, ++i, '--force'));
		} else if (arg === '--force-all') {
			args.forceAll = true;
		} else if (arg === '--only') {
			args.only.push(requireValue(argv, ++i, '--only'));
		} else if (arg === '--langs') {
			args.langs = requireValue(argv, ++i, '--langs')
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean);
		} else if (arg === '--help' || arg === '-h') {
			printHelp();
			process.exit(0);
		} else {
			throw new Error(`Unknown argument: ${arg}`);
		}
	}

	return args;
}

function requireValue(argv: string[], i: number, flag: string): string {
	const value = argv[i];
	if (!value) throw new Error(`${flag} requires a value`);
	return value;
}

export function printHelp() {
	console.log(`hyvor-translator - AI-powered translation for Hyvor projects

Usage:
  hyvor-translator [options]

Options:
  --config <path>      Path to the config file (default: ./translator.config.json)
  --langs <a,b,c>       Only translate into these language codes
  --only <selector>      Only translate matching files. <selector> is a shortname
                           (e.g. "app"), or "shortname/relative/path" to target one file
  --force <selector>     Same selector syntax as --only, but ignores the cache
  --force-all             Ignore the cache and re-translate everything
  -h, --help              Show this help message

Examples:
  hyvor-translator
  hyvor-translator --langs fr,es
  hyvor-translator --only app
  hyvor-translator --only docs/api-console.md
  hyvor-translator --force app
  hyvor-translator --force-all
`);
}
