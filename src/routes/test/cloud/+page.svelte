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
	import ResourceCreator from '$lib/cloud/ResourceCreator/ResourceCreator.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import { toast } from '$lib/components/index.js';
	import { goto } from '$app/navigation';

	let loading = $state(true);
	let cloudContext: CloudContextType = $state({} as CloudContextType);

	let nameInput: HTMLInputElement;

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

	async function handleResourceCreate() {
		const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
		await delay(2000);
		goto('/');

		return true;
	}

	function handleResourceFinish() {
		console.log('finish');
		toast.success('Blog created');
	}

	onMount(init);
</script>

<Base>
	<div class="wrap">
		{#if loading}
			<div class="loader">
				<Loader full />
			</div>
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

				<div class="content">
					<div class="resource">
						<ResourceCreator
							onback={() => alert('Going back')}
							oncreate={handleResourceCreate}
							title="Create a blog"
							cta="Create Blog"
							resourceTitle="Blog"
							ondisplay={() => {
								nameInput.focus();
							}}
						>
							<SplitControl
								label="Name"
								noHorizonalPadding
								caption="A name for your blog"
							>
								<TextInput block bind:input={nameInput} />
							</SplitControl>
							<SplitControl
								label="Subdomain"
								noHorizonalPadding
								caption="Only a-z, 0-9, and hyphens (-)"
							>
								<TextInput block />
							</SplitControl>
						</ResourceCreator>
					</div>
				</div>
			</CloudContext>
		{/if}
	</div>
</Base>

<style>
	.wrap {
		height: 100vh;
	}

	.loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
