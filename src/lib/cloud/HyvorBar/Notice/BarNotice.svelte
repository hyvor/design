<script lang="ts">
	import { barHasFailedInvoices } from '../bar.js';
	import { Tag, Tooltip } from '$lib/components/index.js';
	import IconExclamationCircle from '@hyvor/icons/IconExclamationCircle';

	interface Props {
		instance?: string;
	}

	let { instance = 'https://hyvor.com' }: Props = $props();
</script>

{#if $barHasFailedInvoices}
	<Tooltip
		text="You have an unpaid invoice. Please settle to avoid service interruption."
		position="bottom"
	>
		<a href={instance + '/account/billing?pay-failed'}>
			<Tag color="orange">
				{#snippet start()}
					<IconExclamationCircle size={14} />
				{/snippet}
				Unpaid Invoice
			</Tag>
		</a>
	</Tooltip>
{/if}
