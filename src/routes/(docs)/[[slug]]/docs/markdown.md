# Markdown (mdsvex)

HDS already comes with `mdsvex` plugin pre-installed. You need the following updates to your `svelte.config.js` file to use it.

```js
import { markdownPlugin } from '@hyvor/design/dev';

const config = {
	extensions: ['.svelte', '.md'], // add .md here
	preprocess: [markdownPlugin()],
    ...
};

export default config;
```

Then, you can import markdown files directly into your Svelte components.

```svelte
<script>
	import Markdown from './markdown.md';
</script>

<Markdown />
```
