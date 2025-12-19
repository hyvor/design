<script lang="ts">
	import ActionList from '../ActionList/ActionList.svelte';
	import ActionListItem from '../ActionList/ActionListItem.svelte';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import BarUserPreview from './BarUserPreview.svelte';
	import BarUserPicture from './BarUserPicture.svelte';

	interface Props {
		instance: string;
		logoutUrl?: string;
		cloud: boolean;
	}

	let { instance, logoutUrl = `${instance}/account/logout`, cloud }: Props = $props();
</script>

<div class="wrap">
	<Dropdown align="end" width={325}>
		{#snippet trigger()}
			<button class="user-wrap">
				<BarUserPicture />
			</button>
		{/snippet}

		{#snippet content()}
			<ActionList>
				<BarUserPreview />

				{#if cloud}
					<a href="{instance}/account" target="_blank">
						<ActionListItem>
							Manage Account
							{#snippet end()}
								<IconBoxArrowUpRight size={12} />
							{/snippet}
						</ActionListItem>
					</a>
				{/if}

				<a href={logoutUrl}>
					<ActionListItem>Logout</ActionListItem>
				</a>
			</ActionList>
		{/snippet}
	</Dropdown>
</div>

<style>
	.wrap,
	.wrap :global(.dropdown),
	.wrap :global(.dropdown > .trigger) {
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
</style>
