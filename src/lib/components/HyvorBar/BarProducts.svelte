<script module>
	const PRODUCTS = {
		talk: {
			name: 'Hyvor Talk',
			logo: LogoTalk,
			url: 'talk.hyvor.com',
			description: 'Comments, Newsletters, Memberships'
		},
		blogs: {
			name: 'Hyvor Blogs',
			logo: LogoBlogs,
			url: 'blogs.hyvor.com',
			description: 'Blogging Platform'
		},
		fortguard: {
			name: 'FortGuard',
			logo: LogoFortguard,
			url: 'fortguard.io',
			description: 'Spam Detection API'
		}
	};
	export { PRODUCTS };
</script>

<script lang="ts">
	import LogoBlogs from '$lib/marketing/Logo/LogoBlogs.svelte';
	import LogoFortguard from '$lib/marketing/Logo/LogoFortguard.svelte';
	import LogoTalk from '$lib/marketing/Logo/LogoTalk.svelte';
	import { ActionList, ActionListItem, Button, Dropdown } from '../index.js';
	import { IconCaretDownFill, IconBoxArrowUpRight } from '@hyvor/icons';

	interface Props {
		mobile?: boolean;
	}

	let { mobile = false }: Props = $props();
</script>

<Dropdown align={mobile ? 'center' : 'end'} width={325}>
	{#snippet trigger()}
		<Button  variant="invisible" color="input" size="small">
			Products
			{#snippet end()}
				<IconCaretDownFill size={10}  />
			{/snippet}
		</Button>
	{/snippet}
	{#snippet content()}
		<ActionList >
			{#each Object.entries(PRODUCTS) as [key, product]}
				<a href={`https://${product.url}`} target="_blank">
					<ActionListItem>
						{product.name}
						{#snippet description()}
										<div >
								{product.description}
							</div>
									{/snippet}
						{#snippet start()}
										<product.logo size={20}  />
									{/snippet}
						{#snippet end()}
										<IconBoxArrowUpRight  size={12} />
									{/snippet}
					</ActionListItem>
				</a>
			{/each}
		</ActionList>
	{/snippet}
</Dropdown>
