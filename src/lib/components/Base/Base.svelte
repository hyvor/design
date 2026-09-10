<script lang="ts">
	import ConfirmModalProvider from './../Modal/ConfirmModalProvider.svelte';
	import DarkProvider from './../Dark/DarkProvider.svelte';
	import ToastProvider from '../Toast/ToastProvider.svelte';
	import FileUploaderProvider from '../FileUploader/FileUploaderProvider.svelte';
	import fontsCss from './fonts.css?inline';

	interface Props {
		dark?: boolean;
		children?: import('svelte').Snippet;
	}

	let { dark = false, children }: Props = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://media.hyvor.com" />
	{@html '<style>' + fontsCss + '</style>'}
</svelte:head>

<div id="hds-base">
	{@render children?.()}
</div>

{#if dark}
	<DarkProvider />
{/if}

<ToastProvider />
<ConfirmModalProvider />
<FileUploaderProvider />

<style>
	:global(:root) {
		/**
		 * Each app should have its own accent colors
		 * --accent should be usable with light text
		 * --accent-light and --accent-lightest should be usable with dark text
		 */
		--accent: #000;
		--accent-light: #bdbdbd;
		--accent-lightest: #fafafa;
		--accent-light-mid: #818181;
		--accent-text: #fff;

		--border: #e1e1e1;

		--text: #000;
		--text-light: #777;
		--text-white: #fff;

		/*
		 * Generally used colors
		 * In most cases, no need to extend these colors
		 */
		--green-light: #cadfca;
		--green: #4b874b;
		--green-dark: #335c33;

		--red-dark: #ab2525;
		--red: #c05959;
		--red-light: #ffdfdf;

		--blue-dark: #334b81;
		--blue: #5875b9;
		--blue-light: #dae5ff;

		--orange-dark: #8b5b04;
		--orange: #a98526;
		--orange-light: #efe3b4;

		--gray-light: #ddd;
		--gray: #999;
		--gray-dark: #555;

		--hover: #fafafa;
		--hover-dark: #f0f0f0;

		--link: #1d85d2;

		--input: #f3f3f3;
		--input-hover: #ccc;
		/* checkbox/radio */

		--box-shadow: 0 0 30px #0000000d;
		--box-shadow-light: 0 0 10px 6px rgba(0, 0, 0, 0.06);
		--box-radius: 20px;
		--box-background: #fff;

		--line-height-content: 28px;
		--header-height: 55px;

		--font-sans-serif: 'Readex Pro', Avenir, Inter, Helvetica, Arial, sans-serif;
		--font-serif: 'Source Serif 4', serif;
	}

	:global(:root.dark) {
		--background: #000;

		--text: #fff;
		--text-light: #999;
		--box-background: #1c1c1c;

		--accent-light: #555;
		--accent-lightest: #2d2d2d;

		--border: #4a4a4a;
		--link: #7cb6e1;
		--hover: #232323;

		--input: #333;
	}

	/**
	 * Global styles
	 */
	:global(:root) {
		font-family: var(--font-sans-serif);
		font-size: 16px;
		font-weight: 400;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100%;
	}

	:global(body) {
		background-color: var(--background, var(--accent-lightest));
		color: var(--text);
		margin: 0;
		padding: 0;
	}

	:global(button),
	:global(a) {
		background-color: transparent;
		border: none;
		color: inherit;
		appearance: none;
		padding: 0;
		text-decoration: none;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
	}

	:global(:focus-visible) {
		outline: 2px solid var(--accent-light);
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(.hds-box) {
		box-shadow: var(--box-shadow);
		border-radius: var(--box-radius);
		background-color: var(--box-background);
	}

	:global(.hds-container) {
		width: 1000px;
		max-width: 100%;
		padding: 0 15px;
		margin: auto;
	}

	:global(.hds-container-max) {
		width: 1400px;
		max-width: 100%;
		padding: 0 15px;
		margin: auto;
	}

	:global(.hds-link) {
		color: var(--link);
		text-decoration: underline;
	}

	/** code block styles */
	:global(.hds-code-block pre) {
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		overflow: auto;
		border-radius: 20px;
		padding: 20px;
		line-height: 1.2;
		background-color: #f4f2f0 !important;
	}

	:global(.hds-code-block pre code) {
		all: unset;
		font-size: 14px;
		line-height: 1.5 !important;
		tab-size: 4;
		hyphens: none;
	}

	:global(:root.dark .shiki) {
		background-color: var(--shiki-dark-bg) !important;
	}

	:global(:root.dark .shiki),
	:global(:root.dark .shiki span) {
		color: var(--shiki-dark) !important;
		font-style: var(--shiki-dark-font-style) !important;
		font-weight: var(--shiki-dark-font-weight) !important;
		text-decoration: var(--shiki-dark-text-decoration) !important;
	}

	:global(::selection) {
		background-color: var(--selection, var(--accent-light));
	}
</style>
