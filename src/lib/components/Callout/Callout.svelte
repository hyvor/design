<script lang="ts">
	import type { Snippet } from "svelte";

	const { type = 'soft', title = undefined, children = undefined, text = undefined, icon = undefined, ...rest } : {
		type: 'info' | 'success' | 'warning' | 'danger' | 'soft';
		title: string | Snippet | undefined;
		icon: Snippet | undefined;
		text: string | Snippet | undefined;
		children: Snippet | undefined;
		[key: string]: any;
	} = $props();
</script>

<div class={'callout ' + type} {...rest}>

	{#if typeof title === 'string'}
		<div class="title-wrap">
			{#if icon}
				<span
					class="title-icon
		">
			{@render icon()}
		</span
				>
			{/if}
			<div class="title">{title}</div>
		</div>
	{:else}
	<div class="title-wrap">
		{#if icon}
			<span class="title-icon">{@render icon()}</span>
		{/if}

		<div class="title">{@render title?.()}</div>
	</div>
	{/if}

	<div class="text-wrap">
		{#if icon && !title}
			<span class="icon">{@render icon()}</span>
		{/if}

		<div class="text">
			{#if children}
				{@render children()}
			{/if}
			{#if typeof text === 'string'}
				{text}
			{:else}
				{@render text?.()}
			{/if}
		</div>
	</div>
</div>

<style>
	.callout {
		padding: 15px 25px;
		border-radius: var(--box-radius);
		/* line-height: var(--line-height-content); */
	}

	.callout.soft {
		background-color: var(--accent-light);
	}

	.callout.info {
		background-color: var(--blue-light);
		color: var(--blue-dark);
	}

	.callout.warning {
		background-color: var(--orange-light);
		color: var(--orange-dark);
	}

	.callout.danger {
		background-color: var(--red-light);
		color: var(--red-dark);
	}

	.callout.success {
		background-color: var(--green-light);
		color: var(--green-dark);
	}

	.title-wrap {
		margin-bottom: 4px;
		display: flex;
		align-items: center;
		font-weight: 600;
		font-size: 18px;
	}

	.title-icon {
		vertical-align: middle;
		margin-right: 8px;
	}

	.text-wrap {
		display: flex;
		align-items: flex-start;
	}

	.icon {
		margin-right: 8px;
		font-size: 18px;
	}
</style>
