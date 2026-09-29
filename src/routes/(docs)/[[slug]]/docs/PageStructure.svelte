<h1>Page Structure</h1>

<p>
	Landing page sections (hero, feature splits, testimonials, FAQ, footer, etc.) live with the
	marketing site in <a href="https://github.com/hyvor/core">hyvor/core</a>, not in this library.
	This library only ships the parts product apps need to render their docs:
</p>

<ul>
	<li>
		<a href="/header"><code>{'<Header>'}</code></a>: the site header, before
		<code>{'<Base>'}</code>.
	</li>
	<li>
		<a href="/docs"><code>{'<Docs>'}</code></a>: the docs layout with navigation and table of
		contents.
	</li>
	<li>
		<a href="/details-accordion">Details Accordion</a>: a standalone expand/collapse component,
		usable anywhere on the page.
	</li>
</ul>

<p>See the header on a real page at <a href="/test">/test</a>.</p>
