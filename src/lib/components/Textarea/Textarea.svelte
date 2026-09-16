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
		[key: string]: any;
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

<div class="textarea-container" class:block>
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
		class="state-{state}"
		{rows}
		{cols}
		{...rest}
	></textarea>

	{#if end}
		<span class="slot end">
			{@render end?.()}
		</span>
	{/if}
</div>

<style>
	.textarea-container {
		position: relative;
		display: inline-block;
		max-width: 100%;

		&.block {
			display: block;
			width: 100%;
		}
	}

	textarea {
		padding: 10px 15px;
		background-color: var(--input);
		font-family: inherit;
		font-size: 14px;
		border-radius: 20px;
		border-bottom-right-radius: 0;
		border: none;
		transition: 0.2s box-shadow;
		width: 100%;
		color: inherit;
		resize: vertical;
		box-sizing: border-box;

		&:focus {
			outline: 0;
			box-shadow: 0 0 0 var(--local-shadow-size) var(--accent-light);
		}

		--local-shadow-size: 2px;

		&.state-error {
			box-shadow: 0 0 0 var(--local-shadow-size) var(--red-light);
			&:focus {
				box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--red-light);
			}
		}

		&.state-success {
			box-shadow: 0 0 0 2px var(--green-light);
			&:focus {
				box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--green-light);
			}
		}

		&.state-warning {
			box-shadow: 0 0 0 2px var(--orange-light);
			&:focus {
				box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--orange-light);
			}
		}
	}

	.start ~ textarea {
		padding-left: 45px;
	}

	.end ~ textarea {
		padding-right: 45px;
	}

	.slot {
		position: absolute;
		top: 10px;
		pointer-events: none;
		display: flex;
		align-items: center;
		z-index: 1;

		&.start {
			left: 15px;
		}

		&.end {
			right: 15px;
		}
	}
</style>
