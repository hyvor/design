<script>
	import CloudContext from '$lib/cloud/CloudContext/CloudContext.svelte';
	import HyvorBar from '$lib/cloud/HyvorBar/HyvorBar.svelte';
	import OrgMembersSearch from '$lib/cloud/OrgMembers/OrgMembersSearch.svelte';
	import Base from '$lib/components/Base/Base.svelte';
</script>

<Base>
	<CloudContext>
		<HyvorBar product="core" cloud={true} instance="https://hyvor.localhost" />

		<div class="wrap">
			<div class="inner hds-box">
				<OrgMembersSearch />
			</div>
		</div>
	</CloudContext>
</Base>

<style>
	.wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(100vh - 80px);
	}
	.inner {
		padding: 25px 30px;
		width: 600px;
	}
</style>
