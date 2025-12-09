<script lang="ts">
	interface Props {
		state?: 'default' | 'error' | 'success' | 'warning';
		size?: 'small' | 'medium' | 'large' | 'x-small';
		block?: boolean;
		value?: any;
		input?: HTMLInputElement;
		start?: import('svelte').Snippet;
		end?: import('svelte').Snippet;
		select?: boolean;
		selectInput?: HTMLSelectElement;
		[key: string]: any;

		onkeyup?: (event: KeyboardEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		onkeypress?: (event: KeyboardEvent) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onclick?: (event: MouseEvent) => void;
		onmouseover?: (event: MouseEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		onchange?: (event: Event) => void;
		oninput?: (event: Event) => void;
	}

	let {
		state = 'default',
		size = 'medium',
		block = false,
		value = $bindable(undefined),
		input = $bindable(),
		start,
		end,
		select = false,
		selectInput = $bindable({} as HTMLSelectElement),

		onkeyup,
		onkeydown,
		onkeypress,
		onfocus,
		onblur,
		onclick,
		onmouseover,
		onmouseenter,
		onmouseleave,
		onchange,
		oninput,

		...rest
	}: Props = $props();
</script>

<label class="input-wrap state-{state} size-{size}" class:block>
	{#if start}
		<span class="slot start">
			{@render start?.()}
		</span>
	{/if}

	{#if select}
		<select
			{...rest}
			bind:value
			bind:this={selectInput}
			{onkeyup}
			{onkeydown}
			{onkeypress}
			{onfocus}
			{onblur}
			{onclick}
			{onmouseover}
			{onmouseenter}
			{onmouseleave}
			{onchange}
			{oninput}
		>
			{@render rest?.children()}
		</select>
	{:else}
		<input
			{...rest}
			bind:value
			bind:this={input}
			{onkeyup}
			{onkeydown}
			{onkeypress}
			{onfocus}
			{onblur}
			{onclick}
			{onmouseover}
			{onmouseenter}
			{onmouseleave}
			{onchange}
			{oninput}
		/>
	{/if}

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

	input,
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

		&:focus {
			outline: none;
		}
	}

	select {
		min-width: 180px;
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
