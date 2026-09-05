<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface ComponentProps {
		children: Snippet;
	}

	type Props = ComponentProps & HTMLAttributes<HTMLDivElement>;

	let { children, ...rest }: Props = $props();

	const { head } = getContext<{ head: boolean }>('table-row');
</script>

<div role={head ? 'columnheader' : 'cell'} {...rest}>
	{@render children()}
</div>
