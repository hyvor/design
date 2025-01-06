<script lang="ts">
	import ActionList from '../ActionList/ActionList.svelte';
	import ActionListItem from '../ActionList/ActionListItem.svelte';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import { barUser } from './bar.js';
	import BarUserPreview from './BarUserPreview.svelte';

	interface Props {
		instance: string;
	}

	let { instance }: Props = $props();
</script>

<div class="wrap">
	<Dropdown align="end" width={325}>
		{#snippet trigger()}
			<button class="user-wrap">
				{#if $barUser}
					<img class="user-picture" src={$barUser?.picture_url} alt={$barUser?.name} />
				{/if}
			</button>
		{/snippet}

		{#snippet content()}
			<ActionList>
				<BarUserPreview />

				<a href="{instance}/account" target="_blank">
					<ActionListItem>
						Manage Account
						{#snippet end()}
							<IconBoxArrowUpRight size={12} />
						{/snippet}
					</ActionListItem>
				</a>
				<a href="{instance}/account/logout">
					<ActionListItem>Logout</ActionListItem>
				</a>
			</ActionList>
		{/snippet}
	</Dropdown>
</div>

<style>
	.wrap,
	.wrap :global(.dropdown),
	:global(.dropdown > .trigger) {
		display: inline-flex;
		align-items: center;
	}
	.user-wrap {
		display: inline-flex;
		align-items: center;
		margin-left: 5px;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		overflow: hidden;
		transition: 0.3s box-shadow;
		cursor: pointer;
		background-color: var(--input);
	}
	.user-wrap:hover {
		box-shadow: 0 0 0 4px var(--input);
	}
	img {
		width: 100%;
		height: 100%;
	}
</style>
