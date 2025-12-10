<script lang="ts">
	import ResourceCreator from '$lib/cloud/ResourceCreator/ResourceCreator.svelte';
	import Base from '$lib/components/Base/Base.svelte';
	import HyvorBar from '$lib/components/HyvorBar/HyvorBar.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import toast from '$lib/components/Toast/toast.js';

	async function handleCreate() {
		const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
		await delay(300);
	}

	function handleFinish() {
		console.log('finish');
		toast.success('Blog created');
	}
</script>

<HyvorBar
	product="core"
	cloud={true}
	instance="https://hyvor.localhost"
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
/>

<Base>
	<ResourceCreator
		onback={() => alert('Going back')}
		oncreate={handleCreate}
		onfinish={handleFinish}
		title="Create a blog"
		steps={['Creating the blog', 'Copying the theme', 'Seeding data']}
	>
		<SplitControl label="Name" noHorizonalPadding caption="A name for your blog">
			<TextInput block />
		</SplitControl>
		<SplitControl label="Subdomain" noHorizonalPadding caption="Only a-z, 0-9, and hyphens (-)">
			<TextInput block />
		</SplitControl>
	</ResourceCreator>
</Base>
