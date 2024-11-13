<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();

	interface Props {
		value?: any;
		block?: boolean;
		rows?: number;
		cols?: number;
		state?: 'default' | 'success' | 'warning' | 'error';
		textarea?: HTMLTextAreaElement;
		start?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		value = $bindable(undefined),
		block = false,
		rows = 5,
		cols = 40,
		state = 'default',
		textarea = $bindable({} as HTMLTextAreaElement),
		start,
		end,
		...rest
	}: Props = $props();
</script>

<span
	class="input-wrap state-{state}"
	class:block
	onclick={() => textarea.focus()}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			textarea.focus();
		}
	}}
	role="textbox"
	tabindex="0"
>
	{#if start}
		<span class="slot start">
			{@render start?.()}
		</span>
	{/if}

	<textarea
		bind:value
		bind:this={textarea}
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
		{rows}
		{cols}
		{...rest}
	></textarea>

	{#if end}
		<span class="slot end">
			{@render end?.()}
		</span>
	{/if}
</span>

<style lang="scss">
	.input-wrap {
		padding: 10px 15px;
		background-color: var(--input);
		transition: 0.2s box-shadow;
		font-family: inherit;
		font-size: 14px;
		border-radius: 20px;
		border: none;
		transition: 0.2s box-shadow;
		max-width: 100%;
		color: inherit;

		display: inline-flex;
		resize: vertical;
		overflow: auto;
		align-items: flex-start;
		justify-content: center;

		&:focus-within {
			outline: 0;
			box-shadow: 0 0 0 var(--local-shadow-size) var(--accent-light);
		}

		--local-shadow-size: 2px;
	}

	.input-wrap.block {
		display: block;
		width: 100%;
		resize: vertical;
	}

	.input-wrap:focus-visible {
		outline: 0;
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

	.input-wrap .slot {
		padding: 0 10px;
	}

	.input-wrap .slot.start {
		margin-right: 10px;
	}

	.input-wrap .slot.end {
		margin-left: 10px;
	}

	.input-wrap textarea {
		flex: 1;
		width: 100%;
		border: none;
		font-family: inherit;
		font-size: inherit;
		background: transparent;
		padding: 0;
		margin: 0;
		&:focus {
			outline: none;
		}
		resize: none;
	}
</style>
