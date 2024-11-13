<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	

	interface Props {
		/* for whatever reason simply passing value with rest props doesn't work */
		value?: number | string;
		group?: number | string;
		disabled?: boolean;
		input?: any;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		value = '',
		group = $bindable(''),
		disabled = false,
		input = $bindable({} as HTMLInputElement),
		children,
		...rest
	}: Props = $props();
</script>

<label class:disabled>
	<input
		type="radio"
		{disabled}
		bind:group
		bind:this={input}
		{value}
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
		{...rest}
	/>

	<span class="checkmark"></span>

	{@render children?.()}
</label>

<style lang="scss">
	label {
		position: relative;
		padding-left: 30px;
		cursor: pointer;
		user-select: none;
		height: 20px;
		display: flex;
		align-items: center;
	}

	label.disabled {
		cursor: not-allowed;
		opacity: 0.5;
		.checkmark {
			box-shadow: none !important;
		}
	}

	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 20px;
		width: 20px;
		background-color: var(--input);
		border-radius: 50%;
		transition: 0.4s;
	}

	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent-text);
	}

	label:hover input ~ .checkmark {
		box-shadow: 0 0 0 3px var(--accent-light);
	}

	label:active input ~ .checkmark {
		box-shadow: 0 0 0 4px var(--accent-light);
	}

	label input:focus-visible ~ .checkmark {
		box-shadow: 0 0 0 3px var(--accent-light);
	}

	label input:checked ~ .checkmark {
		background-color: var(--accent);
	}

	input:checked ~ .checkmark:after {
		display: block;
	}
</style>
