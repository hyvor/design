<script>
	import ResourceCreator from '$lib/cloud/ResourceCreator/ResourceCreator.svelte';
	import HyvorBar from '$lib/components/HyvorBar/HyvorBar.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import toast from '$lib/components/Toast/toast';
</script>

<HyvorBar
	product="core"
	cloud={false}
	authOverride={{
		user: {
			name: 'Test User',
			// picture_url: 'https://picsum.photos/60/60',
			picture_url: null,
			email: 'test@hyvor.com',
			current_organization: null
		},
		logoutUrl: 'https://logout.com'
	}}
	onOrganizationSwitch={(org) => {
		toast.info('Switched to organization:' + org.name);
	}}
/>

<ResourceCreator
	onback={() => alert('Going back')}
	steps={['Creating the blog', 'Copying the theme', 'Seeding data']}
>
	<SplitControl label="Name" noHorizonalPadding caption="A name for your blog">
		<TextInput block />
	</SplitControl>
	<SplitControl label="Subdomain" noHorizonalPadding caption="Only a-z, 0-9, and hyphens (-)">
		<TextInput block />
	</SplitControl>
</ResourceCreator>
