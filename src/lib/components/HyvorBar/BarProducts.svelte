<script module>
	const PRODUCTS = {
		talk: {
			name: 'Hyvor Talk',
			logo: undefined,
			url: 'talk.hyvor.com',
			description: 'Commenting Platform'
		},
		blogs: {
			name: 'Hyvor Blogs',
			logo: undefined,
			url: 'blogs.hyvor.com',
			description: 'Blogging Platform'
		},
		post: {
			name: 'Hyvor Post',
			url: 'post.hyvor.com',
			logo: undefined,
			description: 'Newsletter Platform'
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
	import LogoFortguard from '$lib/marketing/Logo/LogoFortguard.svelte';
	import { ActionList, ActionListItem, Button, Dropdown } from '../index.js';
	import IconCaretDownFill from '@hyvor/icons/IconCaretDownFill';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';

	interface Props {
		mobile?: boolean;
		instance: string;
	}

	let { mobile = false, instance }: Props = $props();
</script>

<Dropdown align={mobile ? 'center' : 'end'} width={325}>
	{#snippet trigger()}
		<Button variant="invisible" color="input" size="small">
			Products
			{#snippet end()}
				<IconCaretDownFill size={10} />
			{/snippet}
		</Button>
	{/snippet}
	{#snippet content()}
		<ActionList>
			{#each Object.entries(PRODUCTS) as [key, product]}
				<a href={`https://${product.url}`} target="_blank">
					<ActionListItem>
						{product.name}
						{#snippet description()}
							<div>
								{product.description}
							</div>
						{/snippet}
						{#snippet start()}
							{#if product.logo}
								<product.logo size={20} />
							{:else}
								<img
									src={instance + '/api/public/logo/' + key + '.svg'}
									alt={product.name}
									width="20"
									height="20"
								/>
							{/if}
						{/snippet}
						{#snippet end()}
							<IconBoxArrowUpRight size={12} />
						{/snippet}
					</ActionListItem>
				</a>
			{/each}
		</ActionList>
	{/snippet}
</Dropdown>
