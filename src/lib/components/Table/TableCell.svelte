<script lang="ts">
	import { getContext, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		[key: string]: any;
	}

	let { children, ...rest }: Props = $props();

	const { head } = getContext<{ head: boolean }>('table-row');
</script>

<div role={head ? 'columnheader' : 'cell'} {...rest}>
	{@render children()}
</div>
