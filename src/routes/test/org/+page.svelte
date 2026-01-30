<script>
	import CloudContext from '$lib/cloud/CloudContext/CloudContext.svelte';
	import HyvorBar from '$lib/cloud/HyvorBar/HyvorBar.svelte';
	import Base from '$lib/components/Base/Base.svelte';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import { onMount } from 'svelte';

	let loading = $state(true);

	onMount(() => {
		setTimeout(() => {
			loading = false;
		}, 1000);
	});
</script>

<Base>
	<div class="wrap">
		{#if loading}
			<Loader full />
		{:else}
			<CloudContext
				context={{
					component: 'core',
					deployment: 'cloud',
					instance: 'https://hyvor.localhost',
					user: {
						id: 1,
						name: 'Supun Wimalasena',
						username: 'supun',
						email: 'supun@hyvor.com',
						picture_url: null
					},
					organization: {
						id: 1,
						name: 'HYVOR',
						role: 'admin'
					},

					callbacks: {
						onOrganizationSwitch: (switcher) => {
							loading = true;

							switcher()
								.then((org) => {
									console.log(org);

									setTimeout(() => {
										loading = false;
									}, 2000);
								})
								.catch(() => {
									loading = false;
								});
						}
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
