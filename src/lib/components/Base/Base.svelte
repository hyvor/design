<script lang="ts">
	import fontsCss from './fonts.css?inline';
	import DarkProvider from './../Dark/DarkProvider.svelte';
	import { toastStore } from '../Toast/toast.js';
	import { confirmStore } from '../Modal/confirm.js';
	import { fileUploaderConfig } from '../FileUploader/file-uploader.js';

	interface Props {
		dark?: boolean;
		children?: import('svelte').Snippet;
		marketing?: boolean;
	}

	let { dark = false, children, marketing = false }: Props = $props();

	let needsToast = $state(false);
	let needsConfirm = $state(false);
	let needsFileUploader = $state(false);

	$effect(() => {
		if ($toastStore.length > 0) needsToast = true;
	});
	$effect(() => {
		if ($confirmStore !== null) needsConfirm = true;
	});
	$effect(() => {
		if ($fileUploaderConfig !== null) needsFileUploader = true;
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://media.hyvor.com" />
	<link rel="preconnect" href="https://media.hyvor.com" crossorigin="" />

	{@html '<style>' + fontsCss + '</style>'}

	{#if marketing}
		<link
			rel="preload"
			href="https://media.hyvor.com/fonts/source-serif-4-latin-600-normal.DouSKlru.woff2"
			as="font"
			type="font/woff2"
			crossorigin=""
		/>
		<link
			rel="preload"
			href="https://media.hyvor.com/fonts/source-serif-4-latin-400-normal.DJ5YJwmz.woff2"
			as="font"
			type="font/woff2"
			crossorigin=""
		/>
		<style>
			:root {
				font-family: var(--font-serif) !important;
			}
		</style>
	{/if}
</svelte:head>

<div id="hds-base">
	{@render children?.()}
</div>

{#if dark}
	<DarkProvider />
{/if}

{#if needsToast}
	{#await import('../Toast/ToastProvider.svelte') then m}
		<m.default />
	{/await}
{/if}

{#if needsConfirm}
	{#await import('../Modal/ConfirmModalProvider.svelte') then m}
		<m.default />
	{/await}
{/if}

{#if needsFileUploader}
	{#await import('../FileUploader/FileUploaderProvider.svelte') then m}
		<m.default />
	{/await}
{/if}

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
		--text-light: #545454;
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
