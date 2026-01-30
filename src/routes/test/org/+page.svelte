<script lang="ts">
	import CloudContext from '$lib/cloud/CloudContext/CloudContext.svelte';
	import HyvorBar from '$lib/cloud/HyvorBar/HyvorBar.svelte';
	import Base from '$lib/components/Base/Base.svelte';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import {
		type CloudContextOrganization,
		type CloudContext as CloudContextType
	} from '$lib/cloud/CloudContext/cloudContext.svelte.js';
	import { onMount } from 'svelte';

	let loading = $state(true);
	let cloudContext: CloudContextType = $state({} as CloudContextType);

	async function init() {
		loading = true;

		const response = await fetch('https://hyvor.localhost/api/v2/local/bar', {
			credentials: 'include'
		});

		const json: CloudContextType = await response.json();

		cloudContext = json;
		loading = false;
	}

	function onOrganizationSwitch(switcher: Promise<CloudContextOrganization>) {
		loading = true;

		switcher
			.then((org) => {
				init();
			})
			.catch(() => {
				loading = false;
			});
	}

	onMount(init);
</script>

<Base>
	<div class="wrap">
		{#if loading}
			<Loader full />
		{:else}
			<CloudContext
				context={{
					...cloudContext,
					callbacks: {
						onOrganizationSwitch: onOrganizationSwitch
					}
				}}
			>
				<HyvorBar url="/test/org" />

				<!-- <div class="wrap">
			<div class="inner hds-box">
				<OrgMembersSearch />
			</div>
		</div> -->
			</CloudContext>
		{/if}
	</div>
</Base>

<style>
	.wrap {
		height: 100vh;
	}
</style>
