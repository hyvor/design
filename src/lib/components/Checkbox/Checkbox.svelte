<script lang="ts">
	import { createBubbler, handlers } from 'svelte/legacy';

	const bubble = createBubbler();

	interface Props {
		checked?: boolean | undefined;
		group?: (number | string)[];
		value?: string | number;
		disabled?: boolean;
		input?: HTMLInputElement;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		checked = $bindable(undefined),
		group = $bindable([]),
		value = 'on',
		disabled = false,
		input = $bindable({} as HTMLInputElement),
		children,
		...rest
	}: Props = $props();

	/*
	 * From https://github.com/themesberg/flowbite-svelte/blob/main/src/lib/forms/Checkbox.svelte
	 */
	function handleChange() {
		if (disabled) return;
		const index = group.indexOf(value);
		if (checked === undefined) checked = index >= 0;
		if (checked) {
			if (index < 0) {
				group.push(value);
				group = group;
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1);
				group = group;
			}
		}
	}
</script>

<span class="checkbox-wrap">
	<label>
		<input
			type="checkbox"
			bind:checked
			bind:this={input}
			{disabled}
			onkeyup={bubble('keyup')}
			onkeydown={bubble('keydown')}
			onkeypress={bubble('keypress')}
			onfocus={bubble('focus')}
			onblur={bubble('blur')}
			onclick={bubble('click')}
			onmouseover={bubble('mouseover')}
			onmouseenter={bubble('mouseenter')}
			onmouseleave={bubble('mouseleave')}
			onchange={handlers(bubble('change'), handleChange)}
			{...rest}
		/>
		<span class="placeholder"></span>
		{#if children}
			<span class="label">
				{@render children?.()}
			</span>
		{/if}
	</label>
</span>

<style>
	.label {
		margin-left: 8px;
	}

	.checkbox-wrap {
		position: relative;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
	}

	.checkbox-wrap label {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}

	input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	span.placeholder {
		display: inline-block;
		width: 16px;
		height: 16px;
		background-color: var(--input);
		border-radius: 2px;
		outline: 1px solid var(--accent);
		position: relative;
	}

	span.placeholder:focus-visible {
		box-shadow: 0 0 0 4px var(--accent-light);
	}

	/* the check icon */
	span.placeholder:after {
		content: '';
		position: absolute;
		display: none;

		/* check icon */
		left: 4.5px;
		top: 1px;
		width: 4px;
		height: 9px;
		border: solid var(--accent-text);
		border-width: 0 3px 3px 0;
		transform: rotate(45deg);
		transition: 0.2s box-shadow;
	}

	.checkbox-wrap:hover span.placeholder {
		box-shadow: 0 0 0 3px var(--accent-light);
	}

	input:checked ~ span.placeholder {
		background-color: var(--accent) !important;
	}

	input:focus ~ span.placeholder {
		box-shadow: 0 0 0 4px var(--accent-light);
	}

	input:checked ~ span.placeholder:after {
		display: block;
	}

	/* disabled styles */
	input:disabled ~ span.placeholder {
		background-color: var(--accent-light);
		border: none !important;
		opacity: 0.2;
		cursor: not-allowed;
		box-shadow: none !important;
	}

	input:disabled:checked ~ span.placeholder:after {
		display: none;
		pointer-events: none;
	}
</style>
