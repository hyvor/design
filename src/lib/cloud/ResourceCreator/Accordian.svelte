<script lang="ts">
	import { Button, Loader } from '$lib/components/index.js';
	import { type Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	type Props = {
		show: boolean;
		title: string;
		belowTitle?: Snippet | string;
		buttonText: string;
		buttonDisabled?: boolean;
		children: Snippet;
		onButtonClick: () => void;
		onToggle: () => void;
		toggleLocked?: boolean;
		complete?: boolean;
		footer?: boolean;
		loading?: boolean;
	};

	let {
		show = false,
		title,
		children,
		buttonText,
		buttonDisabled,
		onButtonClick,
		onToggle,
		toggleLocked = false,
		complete,
		belowTitle,
		footer = true,
		loading = $bindable(false)
	}: Props = $props();

	let contentEl: HTMLElement;

	let heightAutoTimeout: ReturnType<typeof setTimeout>;

	function setHeight(show: boolean) {
		if (!contentEl) return;
		if (show) {
			contentEl.style.height = contentEl.scrollHeight + 'px';
		} else {
			contentEl.style.height = contentEl.scrollHeight + 'px';
			setTimeout(() => {
				contentEl.style.height = '0px';
			}, 0);
		}

		clearTimeout(heightAutoTimeout);
		heightAutoTimeout = setTimeout(() => {
			if (show) {
				contentEl.style.height = 'auto';
			}
		}, 300);
	}

	function toggle() {
		if (toggleLocked) return;
		const showBefore = show;
		onToggle();
		if (showBefore === show) return;
		setHeight(show);
	}

	$effect(() => {
		setHeight(show);
	});
</script>

<div class="accordian" class:show class:complete>
	<button class="title-wrap" onclick={toggle}>
		<div class="left">
			<div class="title">
				{title}
			</div>
			{#if belowTitle}
				{#if typeof belowTitle === 'string'}
					{belowTitle}
				{:else}
					{@render belowTitle()}
				{/if}
			{/if}
		</div>
		<!-- <Dot {complete} /> -->
	</button>
	<div class="content" bind:this={contentEl} transition:slide={{ axis: 'y' }}>
		{@render children()}

		{#if footer}
			<div class="footer">
				<div class="button-wrap">
					{#if loading}
						<Loader size="small" />
					{/if}
					<Button
						size="large"
						onclick={onButtonClick}
						disabled={loading || buttonDisabled}>{buttonText}</Button
					>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.accordian {
		border: 1px solid #eee;
		border-radius: 20px;
	}
	.title-wrap {
		display: flex;
		text-align: left;
		align-items: center;
		padding: 15px 20px;
		border-radius: 20px 20px 0 0;
		cursor: pointer;
		width: 100%;
	}
	.title-wrap .left {
		flex: 1;
	}
	.title {
		font-weight: 600;
	}
	.show .title-wrap {
		background-color: var(--hover);
		border-bottom: 1px solid #eee;
	}

	.content {
		overflow: hidden;
		height: 0;
		transition: height 0.3s;
	}
	.footer {
		padding: 10px 20px;
		border-top: 1px solid #eee;
	}

	.button-wrap {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 10px;
	}
</style>
