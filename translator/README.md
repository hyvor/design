# @hyvor/translator

A CLI that translates a project's source files (JSON, Markdown, Svelte, ...)
into other languages using the Anthropic API, driven by a small config file
in the project's root.

## Install

```bash
npm install @hyvor/translator -g
```

## Configure

Add a `translator.config.json` file to the root of the project you want to
translate:

```json
{
	"languages": [
		{ "code": "fr", "name": "French" },
		{ "code": "es", "name": "Spanish" }
	],
	"translatables": [
		{
			"source": "frontend/src/locales/en.json",
			"target": "frontend/src/locales/{lang}.json",
			"shortname": "app"
		},
		{
			"source": "frontend/src/docs/en/*.md",
			"target": "frontend/src/docs/{lang}/*.md",
			"shortname": "docs"
		}
	],
	"ignore": []
}
```

- `languages` — every language to translate into. `code` is used to fill in
  `{lang}` and is what you pass to `--langs`; `name` (e.g. `"French"`) is
  given to the model so it knows what to translate into.
- `translatables` — each entry maps a `source` path to a `target` path
  pattern containing the `{lang}` placeholder. `source`/`target` support a
  single `*` wildcard in the last segment (e.g. `en/*.md`) and `**` for any
  depth of nested directories (e.g. `en/**/*.svelte`). `shortname` is a short
  id used with `--only`/`--force`.
- `ignore` — glob patterns (matched against the source path, relative to the
  config file) to always skip, e.g. `"**/*.draft.md"`.
- `model` (optional) — overrides the default model (`claude-sonnet-5`). Can
  also be set via the `ANTHROPIC_MODEL` env var, which takes precedence.

Lines can be commented out with `//` even though it's technically a JSON
file, e.g. to temporarily disable a translatable.

## Run

```bash
export ANTHROPIC_API_KEY=your_api_key_here

# translate everything
hyvor-translator

# only specific languages
hyvor-translator --langs fr,es

# only a translatable (by shortname), or one file within it
hyvor-translator --only app
hyvor-translator --only docs/api-console.md

# same selector syntax, but skip the cache
hyvor-translator --force app
hyvor-translator --force-all

# use a config file that isn't ./translator.config.json
hyvor-translator --config path/to/translator.config.json
```

Run `hyvor-translator --help` for the full list of options.

### Caching

Each translated file is hashed and recorded in a `.translator-cache.json`
file next to `translator.config.json`. On the next run, a source file is
skipped for a given language if it hasn't changed since it was last
translated and the target file still exists — so re-running the command
only translates what's new or edited. Commit this file (or not) depending on
whether you'd rather have collaborators/CI re-translate unchanged files, or
share the cache and its avoided API cost.

### Incremental updates

When a target file already exists (e.g. `fr.json`, or after `--force`), its
current content is sent to the model alongside the updated English source,
with instructions to make minimal edits — keeping existing wording wherever
the English didn't meaningfully change, and only updating the parts that
did. This keeps re-translations close to the previous version instead of
rephrasing the whole file from scratch every time.

## Local development

To work on the translator itself (in this `translator/` directory):

```bash
npm install

# run it directly against the fixtures/config in the current directory,
# without building — uses tsx, which (unlike Node's native TypeScript
# support) correctly resolves the `.js` import specifiers in src/ back to
# their `.ts` source files, matching what `tsc`'s NodeNext build expects
npm run dev -- --help
```

`npm run dev` runs `src/cli.ts` directly, so edits take effect immediately
without a build step. Stay in this directory and point `--config` at a real
project's config file to test against real files (paths in the config
resolve relative to the config file itself, not the current directory):

```bash
ANTHROPIC_API_KEY=... npm run dev -- --config /path/to/some-project/translator.config.json --only app --langs fr
```

### Testing the global command end-to-end

To test it exactly as a real (global) install would behave — i.e. via the
compiled `dist/cli.js` and the `hyvor-translator` bin name — build it and
`npm link` it:

```bash
npm run build
npm link          # registers `hyvor-translator` globally, pointing at dist/

cd /path/to/some/project/with/translator.config.json
hyvor-translator --only app --langs fr
```

Since `npm link` symlinks the package, any subsequent `npm run build` in
`translator/` is picked up immediately by the linked `hyvor-translator`
command — no need to re-link. Run `npm unlink -g @hyvor/translator` when
you're done.

### Tests and type-checking

```bash
npm run test    # vitest
npm run check   # tsc --noEmit, then the test suite — what CI runs
```
