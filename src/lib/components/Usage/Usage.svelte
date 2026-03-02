<script lang="ts">
	import { onMount } from 'svelte';
	// import byteFormatter from '../../../lib/helper/byte-formatter';

	interface Props {
		name: string;
		current: number;
		limit: number;
		bytes?: boolean;
		warningPercentage?: number;
		dangerPercentage?: number;
		notIncludedText?: string;
	}

	let {
		name,
		current,
		limit,
		bytes = false,
		warningPercentage = 85,
		dangerPercentage = 95,
		notIncludedText = 'Your license does not include this feature.'
	}: Props = $props();

	let width = $state('0%');
	let percentage = $derived(Math.min(limit === 0 ? 100 : (current / limit) * 100, 100));

	onMount(() => {
		setTimeout(() => {
			width = percentage + '%';
		}, 200);
	});

	function byteFormatter(bytes: number) {
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return '0 Bytes';
		const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1000))));
		return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
	}

	function getReadableValue(num: number) {
		if (bytes) {
			return byteFormatter(num);
		}
		return num.toLocaleString();
	}

	let color = $derived.by(() => {
		if (percentage >= dangerPercentage) {
			return 'var(--red-dark)';
		} else if (percentage >= warningPercentage) {
			return 'var(--orange-dark)';
		} else {
			return 'var(--accent)';
		}
	});
</script>

<div class="usage-bar">
	<div class="usage-bar-top">
		<div class="usage-name">
			{name}
		</div>
		{#if limit > 0}
			<div class="usage-number">
				<span class="usage-now" style:color={color === 'var(--accent)' ? 'var(--text)' : color}
					>{getReadableValue(current)}</span
				>
				<span class="usage-full">/ {getReadableValue(limit)}</span>
			</div>
		{/if}
	</div>

	{#if limit === 0}
		<div class="feature-not-included">{notIncludedText}</div>
	{:else}
		<div class="usage-bar-bar">
			<div class="usage-bar-fill" style:width style:background={color}></div>
		</div>
	{/if}
</div>

<style lang="scss">
	.usage-bar-top {
		display: flex;
	}

	.usage-name {
		flex: 1;
		font-size: 14px;
	}
	.usage-now {
		margin-right: 4px;
		font-weight: 600;
	}

	.usage-full {
		color: var(--text-light);
		font-size: 12px;
	}

	.usage-bar-bar {
		margin: 6px 0 15px;
		width: 100%;
		height: 15px;
		background: var(--accent-light);
		border-radius: 20px;
		position: relative;
		overflow: hidden;
	}
	.usage-bar-fill {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		background: var(--accent);
		border-radius: 20px;
		transition: 0.3s width ease-out;
	}

	.feature-not-included {
		color: var(--text-light);
		font-size: 12px;
		margin: 5px 0 15px;
	}
</style>
