<script>
	import OrgMembersSearch from '$lib/cloud/OrgMembers/OrgMembersSearch.svelte';
	import Base from '$lib/components/Base/Base.svelte';
	import HyvorBar from '$lib/components/HyvorBar/HyvorBar.svelte';
</script>

<HyvorBar product="core" cloud={true} instance="https://hyvor.localhost" />

<Base>
	<div class="wrap">
		<div class="inner hds-box">
			<OrgMembersSearch />
		</div>
	</div>
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
