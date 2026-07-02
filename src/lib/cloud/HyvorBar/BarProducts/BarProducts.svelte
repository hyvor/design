<script lang="ts">
	import { ActionList, ActionListItem, Dropdown } from '$lib/components/index.js';
	import IconGrid from '@hyvor/icons/IconGrid';
	import { getCloudContext } from '../../CloudContext/cloudContextState.svelte.js';
	import { getProductsGroupedBySuite, getSuiteName } from './products.js';
	import IconButton from '$lib/components/IconButton/IconButton.svelte';
	import ActionListGroup from '$lib/components/ActionList/ActionListGroup.svelte';

	interface Props {
		mobile?: boolean;
	}

	const { instance } = $derived(getCloudContext());

	let { mobile = false }: Props = $props();

	const groupedProducts = getProductsGroupedBySuite();
</script>

<span class="wrap">
	<Dropdown align={mobile ? 'center' : 'start'} width={325}>
		{#snippet trigger()}
			<IconButton variant="invisible" color="input">
				<IconGrid />
			</IconButton>
		{/snippet}
		{#snippet content()}
			<div class="content-wrap">
				<ActionList>
					{#each Object.entries(groupedProducts) as [suite, products]}
						<ActionListGroup title={getSuiteName(suite as any)}>
							{#each products as product}
								<a href={`https://${product.url}`} target="_blank">
									<ActionListItem>
										{product.name}
										{#snippet description()}
											<div>
												{product.description}
											</div>
										{/snippet}
										{#snippet start()}
											{#if product.logo}
												<product.logo size={20} />
											{:else}
												<img
													src={instance + '/api/public/logo/' + product.component + '.svg'}
													alt={product.name}
													width="20"
													height="20"
												/>
											{/if}
										{/snippet}
										{#snippet end()}
											<!-- <IconBoxArrowUpRight size={12} /> -->
										{/snippet}
									</ActionListItem>
								</a>
							{/each}
						</ActionListGroup>
					{/each}
				</ActionList>
			</div>
		{/snippet}
	</Dropdown>
</span>

<style>
	.wrap {
		margin: 0 12px;
	}

	.content-wrap {
		padding: 10px 0;
	}
</style>
