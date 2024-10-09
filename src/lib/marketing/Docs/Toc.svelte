<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import tocbot from 'tocbot';
	import Loader from '../../components/Loader/Loader.svelte';
	import { IconCaretDown, IconCaretRight } from '@hyvor/icons';
	import Button from '../../components/Button/Button.svelte';

	let tocElement: HTMLDivElement;

	onMount(() => {
		tocbot.init({
			// @ts-ignore
			tocElement: tocElement,
			contentSelector: '.docs .content-wrap',
			headingSelector: 'h2, h3, h4, h5, h6',
			orderedList: false,
			hasInnerContainers: true,
			headingsOffset: 75,
			scrollSmooth: true,
			scrollSmoothOffset: -75
		});
	});

	afterNavigate(() => {
		tocbot.refresh();
	});

	let mobileShown = false;

	function handleMobileClick(e: any) {
		e.stopPropagation();
		if (!mobileShown) {
			tocElement.style.display = 'block';
			mobileShown = true;
		} else {
			tocElement.style.display = 'none';
			mobileShown = false;
		}
	}
</script>

<div class="wrap hds-box">
	<div class="mobile">
		<Button color="input" on:click={handleMobileClick}>
			Table of Contents
			<svelte:fragment slot="end">
				{#if mobileShown}
					<IconCaretDown size={14} />
				{:else}
					<IconCaretRight size={14} />
				{/if}
			</svelte:fragment>
		</Button>
	</div>

	<div class="toc-wrap" bind:this={tocElement}>
		<Loader block padding={30} size="small" />
	</div>
</div>

<style lang="scss">
	.wrap {
		padding: 25px;
	}

	.toc-wrap {
		align-self: flex-start;
		overflow-y: auto;

		:global(&.toc) {
			overflow-y: auto;
		}

		:global(> .toc-list) {
			overflow: hidden;
			position: relative;
			overflow: hidden;
			position: relative;
			margin: 0;
			padding-left: 15px;
			:global(li) {
				list-style: none;
			}
		}

		:global(.js-toc) {
			overflow-y: hidden;
		}

		:global(.toc-list) {
			margin: 0;
			padding-left: 15px;
			:global(li) {
				list-style: none;
			}
		}

		:global(a.toc-link) {
			color: currentColor;
			height: 100%;
			display: inline-block;
			padding: 3px 0;
			&:hover {
				text-decoration: underline;
			}
		}

		:global(.is-collapsible) {
			max-height: 1000px;
			overflow: hidden;
			transition: all 300ms ease-in-out;
		}

		:global(.is-collapsed) {
			max-height: 0;
		}

		:global(.is-position-fixed) {
			position: fixed !important;
			top: 0;
		}

		:global(.is-active-link) {
			font-weight: 700;
		}

		:global(.toc-link::before) {
			background-color: #eee;
			content: ' ';
			display: inline-block;
			height: inherit;
			left: 0;
			margin-top: -1px;
			position: absolute;
			width: 2px;
		}

		:global(.is-active-link::before) {
			background-color: var(--accent);
		}
	}

	.mobile {
		display: none;
	}

	@media (max-width: 992px) {
		.wrap {
			padding: 10px 15px;
		}
		.mobile {
			display: block;
		}
		.toc-wrap {
			display: none;
			margin-top: 15px;
		}
		:global(.is-active-link) {
			font-weight: normal !important;
		}
		:global(.is-active-link::before) {
			background-color: #eee !important;
		}
	}
</style>
