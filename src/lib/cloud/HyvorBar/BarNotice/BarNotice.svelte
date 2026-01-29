<script lang="ts">
	import { barHasFailedInvoices } from '../bar.js';
	import { Tag, Tooltip } from '$lib/components/index.js';
	import IconExclamationCircle from '@hyvor/icons/IconExclamationCircle';
	import { getCloudContext } from '$lib/cloud/CloudContext/cloudContext.js';

	const cloudContext = getCloudContext();
</script>

{#if $barHasFailedInvoices}
	<Tooltip
		text="You have an unpaid invoice. Please settle to avoid service interruption."
		position="bottom"
	>
		<a href={cloudContext.instance + '/account/billing?pay-failed'}>
			<Tag color="orange">
				{#snippet start()}
					<IconExclamationCircle size={14} />
				{/snippet}
				Unpaid Invoice
			</Tag>
		</a>
	</Tooltip>
{/if}
