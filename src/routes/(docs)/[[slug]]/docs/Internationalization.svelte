<script>
  import Callout from "$lib/components/Callout/Callout.svelte";
  import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
</script>

<h1>i18n</h1>

<p>HDS comes with a built-in internationalization (i18n) system.</p>

<h2 id="app">App Internationalization</h2>

<p>
  "App Internationalization" means that the app is translated at the runtime.
  This is the method to be used in dynamic apps such as the Console.
</p>

<h3 id="json">Step 1: Add JSON Files</h3>

<p>
  First, add the strings in JSON files, preferable in a <code>locales</code>
  directory. Set the file name to the language code (ex:
  <code>en.json</code>).
</p>

<CodeBlock
  code={`
    {
        "home": {
            "title": "Welcome to HDS",
            "subtitle": "This is a subtitle",
            "welcome": "Welcome, {name}!"
        },
        "footer": {
            "about": "About us",
            "contact": "Contact us"
        }
    }
`}
  language="json"
></CodeBlock>

<h3 id="provider">Step 2: Add the InternationalizationProvider</h3>

<p>
  Next, add the <code>InternationalizationProvider</code> to the
  <code>+layout.svelte</code> file (highest level possible) and set up the languages
  you want to support within the provider.
</p>

<CodeBlock
  code={`
    <` +
    `script>
        import InternationalizationProvider from "@hyvor/design/components";
        import en from './locale/en.json';
    </` +
    `script>

    <InternationalizationProvider
        languages={[
            {
                code: 'en',
                flag: '🇺🇸',
                name: 'English',
                region: 'United States',
                strings: en,
                default: true,
            },
            {
                code: 'fr',
                flag: '🇫🇷',
                name: 'Français',
                region: 'France',
                loader: () => import('./locale/fr.json')
            }
        ]}
    >
        <slot />
    </InternationalizationProvider>
`}
  language="svelte"
></CodeBlock>

<ul>
  <li>
    The default language <code>strings</code> should be imported statically.
    Also, set the <code>default</code> property to <code>true</code>.
  </li>
  <li>
    The other languages can be loaded dynamically using the <code>loader</code> property.
  </li>
</ul>

<h3 id="setup">Step 3: Set up an export</h3>

<p>
  To avoid repitition and enfore type safety, set up an export in a <code
    >i18n.ts</code
  > file. Use the type of the default language JSON file.
</p>

<CodeBlock
  code={`
import type { InternationalizationService } from "@hyvor/design/components";
import { getContext } from "svelte";
import type enJson from "../locale/en.json";

type I18nType = InternationalizationService<typeof enJson>;

export function getI18n() {
    return getContext<I18nType>("i18n");
}
`}
  language="ts"
/>

<h3 id="use">Step 4: Use the Strings</h3>

<p>
  Now, you can use the strings in your components using the helper method and
  the <code>t</code> function and the <code>T</code> component.
</p>

<CodeBlock
  code={`
<` +
    `script>
    import { getI18n } from '$lib/i18n';
    const I18n = getI18n();
</` +
    `script>

{I18n.t('home.title')}
{I18n.t('welcome', { name: 'John' })}
<I18n.T key="home.title" />
<I18n.T key="welcome" params={{ name: 'John' }} />
`}
  language="svelte"
></CodeBlock>

<h2 id="strings">Strings</h2>

<p>
  HDS uses the <a
    href="https://unicode-org.github.io/icu/userguide/format_parse/messages/"
  >
    ICU MessageFormat
  </a>
  for string formatting. Strings are parsed using the
  <a href="https://formatjs.io/docs/intl-messageformat"> intl-messageformat </a>
  library. Here are some examples:
</p>

<h3 id="variables">Variables</h3>

<p>You can use variables in the strings.</p>

<CodeBlock
  code={`
    {
        "welcome": "Welcome, {name}!"
    }
`}
  language="json"
></CodeBlock>

<p>
  Then, you can pass the value using the <code>params</code> prop.
</p>

<CodeBlock
  code={`
    {I18n.t('welcome', { name: 'John' })}
    <!-- or -->
    <I18n.T key="welcome" params={{ name: 'John' }} />
`}
  language="svelte"
></CodeBlock>

<p>You can also set the value to a reactive variable.</p>

<CodeBlock
  code={`
    {I18n.t('welcome', { name: myName })}
    <!-- or -->
    <I18n.T key="welcome" params={{ name: myName }} />
`}
  language="svelte"
></CodeBlock>

<h3 id="nested">Nested keys</h3>

<p>You can use nested keys to organize the strings.</p>

<CodeBlock
  code={`
    {
        "home": {
            "title": "Welcome to HDS",
            "subtitle": "This is a subtitle"
        }
    }
`}
  language="json"
></CodeBlock>

<p>Then, use dot notation to access the nested keys.</p>

<CodeBlock
  code={`
    <I18n.T key="home.title" />
`}
  language="svelte"
></CodeBlock>

<h3 id="formatting">Formatting</h3>

<h4 id="dates">Dates</h4>

<CodeBlock
  code={`
    {
        "start": "Starts on {startDate, date, long}"
    }
`}
  language="json"
></CodeBlock>

<p>Then, pass the date as a parameter.</p>

<CodeBlock
  code={`
    <I18n.T key="start" params={{ startDate: new Date() }} />
`}
  language="svelte"
></CodeBlock>

<h4 id="numbers">Numbers</h4>

<CodeBlock
  code={`
    {
        "price": "The price is {price, number, :: compact-short currency/EUR}"
    }
`}
  language="json"
></CodeBlock>

<p>Then, pass the number as a parameter.</p>

<CodeBlock
  code={`
    <I18n.T key="price" params={{ price: 100 }} />
`}
  language="svelte"
></CodeBlock>

<p>
  The result will be <code>The price is €100</code>.
</p>

<h4 id="plural">Plural</h4>

<p>
  The <code>plural</code> format is used to handle pluralization. The value is expected
  to be a number. These plural categories are supported:
</p>

<ul>
  <li><code>zero</code></li>
  <li><code>one</code></li>
  <li><code>two</code></li>
  <li><code>few</code></li>
  <li><code>many</code></li>
  <li><code>other</code></li>
  <li><code>=value</code></li>
</ul>

<p>Here is an example (both lines produce the same result):</p>

<CodeBlock
  code={`
    {
        "users": "{count} {count, plural, one {user} other {users}}",
        "usersShort": "{count, plural, one {# user} other {# users}}"
    }
`}
  language="json"
></CodeBlock>

<CodeBlock
  code={`
    <I18n.T key="users" params={{ count: 10 }} />
`}
  language="svelte"
></CodeBlock>

<p>
  See the <a href="https://formatjs.io/docs/core-concepts/icu-syntax"
    >Message Syntax</a
  > documentation on formatjs.io for more available formatting options.
</p>

<h3 id="components">Components</h3>

<p>
  You can pass components as parameters to the strings. In the following code, <code
    >{`<a></a>`}</code
  >
  is a placeholder for a component. The content within it ("this article") will be
  sent to the component as the <code>children</code> prop.
</p>

<CodeBlock
  code={`
    {
        "withComponent": "For advanced features, check out <a>this article</a>"
    }
`}
  language="json"
></CodeBlock>

<p>Then, pass the component as a parameter.</p>

<CodeBlock
  code={`
    <I18n.T key="withComponent" params={{ 
        a: {component: MyCustomLink} 
    }} />
`}
  language="svelte"
></CodeBlock>

<p>
  Your <code>MyCustomLink</code> component will look like this:
</p>

<CodeBlock
  code={`
    <` +
    `script lang="ts">
        export let children: string;
    <` +
    `/script>
    <a>
        {children} <SomeIcon />
    </a>
`}
  language="svelte"
></CodeBlock>

<p>You may pass additional to the component.</p>

<CodeBlock
  code={`
    <T key="withComponent" params={{ 
        a: {
            component: MyCustomLink, 
            props: {
                href: '/advanced'
            }
        } 
    }} />
`}
  language="svelte"
></CodeBlock>

<Callout type="warning">
  Components are rendered only when the frontend is hydrated. In SSR, only the
  strings are rendered.
</Callout>

<h3 id="elements">Elements</h3>

<p>Similar to components, you can also render HTML elements.</p>

<CodeBlock
  code={`
    {
        "withElement": "Please try again with a <b>different email</b>."
    }
`}
  language="json"
></CodeBlock>

<p>
  The following code maps the <code>{"<b>"}</code> in the string to a
  <code>{"<strong>"}</code> HTML element.
</p>

<CodeBlock
  code={`
    <I18n.T key="withElement" params={{b: {element: 'strong'}}} />
`}
  language="svelte"
></CodeBlock>

<!-- 
<h3 id="t">t Function</h3>

<p>
    There is also a <code>t</code> utility function that can be used to get translated
    strings in the code.
</p>

<CodeBlock
    code={`
    const title = t('home.title')
    const welcome = t('welcome', { name: 'John' })
`}
    language="ts"
></CodeBlock>

<p>
    The <code>t</code> function depends on the Svelte <code>getContext</code>
    function. So, it can only be used in Svelte Components or any typescript functions
    that are called in the component top-level. If you want to use it in other places,
    send the <code>i18n</code> context to the function.
</p>

<CodeBlock
    code={`
    import { getContext } from 'svelte';

    const i18n = getContext('i18n');

    onMount(() => {
        const title = t('home.title', {}, i18n)
        const welcome = t('welcome', { name: 'John' }, i18n)
    })

`}
    language="ts"
></CodeBlock>

<p>
    Or, you may use the <code>i18n.t()</code> function for convenience.
</p>

<CodeBlock
    code={`
    import { getContext } from 'svelte';

    const i18n = getContext('i18n');

    onMount(() => {
        const title = i18n.t('home.title')
        const welcome = i18n.t('welcome', { name: 'John' })
    })

`}
    language="ts"
></CodeBlock> -->

<!-- <h2 id="">
    Scenarios
</h2>

<p>
    HDS designs internationalization around the following two scenarios:
</p>

<ol>
    <li>
        <b>Landing Pages</b>: Translated statically. The language is determined by the URL prefix. 
        <ul>
            <li>
                <code>/</code> is <code>en-US</code>
            </li>
            <li>
                <code>/fr-FR</code> is <code>fr-FR</code>
            </li>
            <li>
                etc.
            </li>
        </ul>
    </li>
    <li>
        <b>Apps</b> (ex: Console): Translated at runtime. The language is initially determined by the user's browser settings and then saved as a user preference (in Svelte stores and Local Storage).
    </li>
</ol>

<h2 id="language-files">Language Files</h2>

<p>
    Translated texts are stored in <a href="#language-files">language files</a>.
</p>
 -->
