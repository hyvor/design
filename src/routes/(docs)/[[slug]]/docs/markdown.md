# Markdown (mdsvex)

HDS already comes with `mdsvex` plugin pre-installed. You need the following updates to your `svelte.config.js` file to use it.

```js
import { markdownPlugin } from '@hyvor/design/components';

const config = {
	extensions: ['.svelte', '.md'], // add .md here
	preprocess: [markdownPlugin()],
    ...
};

export default config;
```
