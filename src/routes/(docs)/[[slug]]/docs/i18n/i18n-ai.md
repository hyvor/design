# AI Translations

Install the following package:

```bash
npm install @hyvor/translator -g
```

Then, set up a JSON config file (recommended to add this to the project root):

`translator.config.json`

```json
{
    "translatables": [
        {
            "source": "frontend/src/locales/en.json",
            "target": "frontend/src/locales/{lang}.json",
            "shortname": "app",
        },
        {
            "source": "frontend/src/docs/en/*.md",
            "target": "frontend/src/docs/{lang}/*.md",
            "shortname": "docs"
        }
    ],
    "ignore": [
        // any files or directories to ignore always:
    ]
}
```

Then, run the following command to translate your files:

```bash
export ANTHROPIC_API_KEY=your_api_key_here

# translate all files
hyvor-translator

# only specify languages
hyvor-translator --langs fr,es

# only translate specific files
hyvor-translator --only app
hyvor-translator --only docs/api-console.md

# force translation even if it's already translated (cached)
hyvor-translator --force app

# force all files to be translated
hyvor-translator --force-all
```