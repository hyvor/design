<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		value?: string;
		options?: Option[];
		state?: 'default' | 'error' | 'success' | 'warning';
		placeholder?: string;
		size?: 'small' | 'medium' | 'large' | 'x-small';
		children?: Snippet;
		start?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		block?: boolean;
		disabled?: boolean;
	}

	export interface Option {
		value: string;
		label: string;
	}

	let {
		value = $bindable(''),
		options = [],
		state = 'default',
		placeholder,
		size = 'medium',
		children,
		start,
		end,
		block = true,
		disabled = false,
		...rest
	}: Props = $props();
</script>

<div class="input-wrap state-{state} size-{size}" class:block class:disabled>
	{#if start}
		<span class="slot start">
			{@render start?.()}
		</span>
	{/if}
	<select bind:value {disabled} {...rest}>
		{#if children}
			{@render children()}
		{:else}
			{#if placeholder}
				<option value="" disabled selected={!value}>{placeholder}</option>
			{/if}

			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		{/if}
	</select>
	{#if end}
		<span class="slot end">
			{@render end?.()}
		</span>
	{/if}
</div>

<style>
	.input-wrap {
		display: inline-flex;
		align-items: center;
		height: 30px;
		padding: 0 15px;
		border-radius: 20px;
		background: var(--input);
		transition: 0.2s box-shadow;
		font-size: 14px;
		--local-shadow-size: 2px;
	}

	.input-wrap:focus-within {
		outline: 0;
		box-shadow: 0 0 0 var(--local-shadow-size) var(--accent-light);
	}

	select {
		flex: 1;
		width: 100%;
		border: none;
		font-family: inherit;
		font-size: inherit;
		background: transparent;
		padding: 0;
		margin: 0;
		color: inherit;
		height: 100%;
		cursor: pointer;
	}
	select:focus {
		outline: none;
	}

	/* Sizes for Select */
	.input-wrap.size-small {
		height: 26px;
		font-size: 12px;
		--local-shadow-size: 1px;
	}

	.input-wrap.size-large {
		height: 36px;
		font-size: 16px;
	}

	.input-wrap.size-x-small {
		height: 20px;
		font-size: 12px;
		--local-shadow-size: 1px;
	}

	.input-wrap.size-medium {
		height: 30px;
		font-size: 14px;
	}

	/*  styles for states */
	.input-wrap.state-error {
		box-shadow: 0 0 0 var(--local-shadow-size) var(--red-light);
	}

	.input-wrap.state-error:focus-within {
		box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--red-light);
	}

	.input-wrap.state-success {
		box-shadow: 0 0 0 2px var(--green-light);
	}

	.input-wrap.state-success:focus-within {
		box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--green-light);
	}

	.input-wrap.state-warning {
		box-shadow: 0 0 0 2px var(--orange-light);
	}

	.input-wrap.state-warning:focus-within {
		box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--orange-light);
	}

	.input-wrap.block {
		display: flex;
		width: 100%;
	}

	.slot {
		display: inline-flex;
		align-items: center;
		color: var(--text-light);
	}

	.slot.start {
		margin-right: 8px;
	}

	.slot.end {
		margin-left: 8px;
	}

	.input-wrap.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.input-wrap.disabled select {
		cursor: not-allowed;
		/* pointer-events: none; */
	}
</style>
