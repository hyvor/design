<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
	import ModalFooter from './ModalFooter.svelte';
	import type { Footer } from './modal-types.js';
	import IconX from '@hyvor/icons/IconX';
	import IconButton from './../IconButton/IconButton.svelte';
	import { fade, scale } from 'svelte/transition';
	import { onMount, tick, type Snippet } from 'svelte';
	import Loader from '../Loader/Loader.svelte';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		show?: boolean;
		title?: string | Snippet;
		size?: 'small' | 'medium' | 'large';
		id?: string;
		role?: 'dialog' | 'alertdialog';
		closeOnOutsideClick?: boolean;
		closeOnEscape?: boolean;
		loading?: boolean | string;

		footer?: Footer | Snippet;
		children?: Snippet;
	}

	let {
		show = $bindable(false),
		title,
		size = 'medium',
		id = 'modal',
		role = 'alertdialog',
		closeOnOutsideClick = true,
		closeOnEscape = true,
		loading = false,
		footer,
		children
	}: Props = $props();

	const dispatch = createEventDispatcher();

	const titleId = id + '-title';
	const descId = id + '-desc';

	let wrapEl: HTMLDivElement | undefined = $state();
	let innerEl: HTMLDivElement | undefined = $state();

	function handleCancel() {
		show = false;
		dispatch('cancel');
	}

	async function setFlex() {
		await tick();
		if (!wrapEl || !innerEl) return;
		if (innerEl.offsetHeight > wrapEl.offsetHeight - 60) {
			wrapEl.style.alignItems = 'flex-start';
		} else {
			wrapEl.style.alignItems = 'center';
		}
	}

	onMount(setFlex);

	$effect(() => {
		show;
		setFlex();
	});

	function handleClose(e: MouseEvent) {
		// close only when clicking directy on backdrop (not inner content)
		if (closeOnOutsideClick && !loading && e.target === e.currentTarget) {
			handleCancel();
		}
	}
</script>

<svelte:window
	on:keyup={(e) => {
		if (e.key === 'Escape' && show && closeOnEscape && !loading) {
			show = false;
		}
	}}
/>

{#if show}
	<div
		aria-hidden="true"
		role="presentation"
		class="wrap"
		bind:this={wrapEl}
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
		onclick={(e) => handleClose(e)}
	>
		<div
			class="inner {size}"
			in:scale={{ duration: 100, start: 0.9, opacity: 0.9 }}
			out:scale={{ duration: 100, start: 0.9, opacity: 0.9 }}
			bind:this={innerEl}
			{role}
			aria-modal="true"
			aria-labelledby={titleId}
			aria-describedby={descId}
		>
			<div class="header">
				<div class="title" id={titleId}>
					{#if typeof title === 'string'}
						<span>{title}</span>
					{:else}
						{@render title?.()}
					{/if}
				</div>

				<div class="close-wrap">
					<IconButton variant="invisible" on:click={handleCancel} aria-label="Close modal">
						<IconX size={25} />
					</IconButton>
				</div>
			</div>

			<div class="content" id={descId}>
				{@render children?.()}
			</div>

			{#if footer}
				<div class="footer">
					{#if typeof footer === 'object'}
						<ModalFooter {footer} bind:show on:cancel on:confirm />
					{:else}
						{@render footer()}
					{/if}
				</div>
			{/if}

			{#if loading}
				<div class="loading" in:fade={{ duration: 100 }}>
					<Loader full>
						{#if typeof loading === 'string'}
							{loading}
						{/if}
					</Loader>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.loading {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background-color: var(--box-background);
		border-radius: var(--box-radius);
		box-shadow: var(--box-shadow);
	}

	.wrap {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10000000;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30px;
		overflow: auto;
	}

	.inner {
		background: var(--box-background);
		border-radius: var(--box-radius);
		box-shadow: var(--box-shadow);
		width: 650px;
		max-width: 100%;
		position: relative;
	}

	.inner.small {
		width: 425px;
	}
	.inner.large {
		width: 800px;
	}

	.header {
		padding: 20px 25px;
		display: flex;
		align-items: center;
	}

	.title {
		flex: 1;
	}
	.title span {
		font-size: 1.2em;
		font-weight: 600;
	}

	.content {
		padding: 20px 25px;
	}

	.footer {
		padding: 20px 25px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.footer :global(button:not(:last-child)) {
		margin-right: 2px;
	}
</style>
