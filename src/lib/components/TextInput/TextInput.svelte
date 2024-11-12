<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();

	interface Props {
		state?: 'default' | 'error' | 'success' | 'warning';
		size?: 'small' | 'medium' | 'large' | 'x-small';
		block?: boolean;
		value?: any;
		input?: HTMLInputElement;
		start?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		state = 'default',
		size = 'medium',
		block = false,
		value = $bindable(undefined),
		input = $bindable({} as HTMLInputElement),
		start,
		end,
		...rest
	}: Props = $props();
</script>

<label class="input-wrap state-{state} size-{size}" class:block>
	{#if start}
		<span class="slot start">
			{@render start?.()}
		</span>
	{/if}

	<input
		{...rest}
		bind:value
		bind:this={input}
		onkeyup={bubble('keyup')}
		onkeydown={bubble('keydown')}
		onkeypress={bubble('keypress')}
		onfocus={bubble('focus')}
		onblur={bubble('blur')}
		onclick={bubble('click')}
		onmouseover={bubble('mouseover')}
		onmouseenter={bubble('mouseenter')}
		onmouseleave={bubble('mouseleave')}
		onchange={bubble('change')}
		oninput={bubble('input')}
	/>

	{#if end}
		<span class="slot end">
			{@render end?.()}
		</span>
	{/if}
</label>

<style lang="scss">
	.slot {
		display: inline-flex;
		align-items: center;
		color: var(--text-light);
		&.start {
			margin-right: 8px;
		}
		&.end {
			margin-left: 8px;
		}
	}

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
		&:focus-within {
			outline: 0;
			box-shadow: 0 0 0 var(--local-shadow-size) var(--accent-light);
		}
	}

	.input-wrap.block {
		display: flex;
		width: 100%;
	}

	input {
		flex: 1;
		width: 100%;
		border: none;
		font-family: inherit;
		font-size: inherit;
		background: transparent;
		padding: 0;
		margin: 0;
		color: inherit;

		&:focus {
			outline: none;
		}
	}

	.input-wrap.size-x-small {
		padding: 0 15px;
		height: 20px;
		font-size: 12px;
		--local-shadow-size: 1px;
	}

	.input-wrap.size-small {
		padding: 0 15px;
		height: 26px;
		font-size: 12px;
		--local-shadow-size: 1px;
	}

	.input-wrap.size-large {
		padding: 0 20px;
		height: 36px;
		font-size: 16px;
	}

	.input-wrap.state-error {
		box-shadow: 0 0 0 var(--local-shadow-size) var(--red-light);
		&:focus-within {
			box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--red-light);
		}
	}
	.input-wrap.state-success {
		box-shadow: 0 0 0 2px var(--green-light);
		&:focus-within {
			box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--green-light);
		}
	}
	.input-wrap.state-warning {
		box-shadow: 0 0 0 2px var(--orange-light);
		&:focus-within {
			box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--orange-light);
		}
	}
</style>
