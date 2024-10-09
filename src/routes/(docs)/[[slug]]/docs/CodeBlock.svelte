<script>
  import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
</script>

<h1>Code Block</h1>

<p>
  Code blocks are used to display code snippets. The following languages are
  supported for syntax highlighting (via highlight.js):
</p>

<ul>
  <li><code>html</code></li>
  <li><code>css</code></li>
  <li><code>js</code></li>
  <li><code>ts</code></li>
  <li><code>svelte</code> (fallback to <code>html</code>)</li>
  <li><code>jsx</code> (fallback to <code>html</code>)</li>
  <li><code>yaml</code></li>
  <li><code>json</code></li>
</ul>

<h2 id="usage">Usage</h2>

<CodeBlock
  code={`
    <CodeBlock language="html" code={code} />
`}
/>

<h2 id="examples">Examples</h2>

<h3 id="html">HTML</h3>

<CodeBlock
  code={`
    <div class="container">
        <h1>Hello World</h1>
    </div>
`}
/>

<h3 id="css">CSS</h3>

<CodeBlock
  language="css"
  code={`
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`}
/>

<h3 id="js">Javascript</h3>

<CodeBlock
  language="js"
  code={`
    console.log('Hello World');
`}
/>

<h3 id="ts">Typescript</h3>

<CodeBlock
  language="ts"
  code={`
    type User {
        name: string;
        age: number;
    }
`}
/>

<h3 id="svelte">Svelte</h3>

<CodeBlock
  language="svelte"
  code={`
    <` +
    `script>
        let name = 'World';
    </script>

    <h1>Hello {name}</h1>
`}
/>

<h3 id="jsx">JSX</h3>

<CodeBlock
  language="jsx"
  code={`
    function App() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
`}
/>

<h3 id="yaml">YAML</h3>

<CodeBlock
  language="yaml"
  code={`
    product: Hyvor Blogs
    url: https://blogs.hyvor.com
    plans:
        - name: Starter
          price: $9
        - name: Growth
          price: $19
`}
/>

<h3 id="json">JSON</h3>

<CodeBlock
  language="json"
  code={`
    {
        "product": "Hyvor Blogs",
        "url": "https://blogs.hyvor.com",
        "plans": [
            {
                "name": "Starter",
                "price": "$9"
            },
            {
                "name": "Growth",
                "price": "$19"
            }
        ]
    }
`}
/>
