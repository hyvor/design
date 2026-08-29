<script>
	import Base from '$lib/components/Base/Base.svelte';
	import NavLink from '$lib/components/NavLink/NavLink.svelte';
	import NavLinkGroup from '$lib/components/NavLink/NavLinkGroup.svelte';
	import { onMount } from 'svelte';

	let active = $state(1);
	let show = $state(false);

	onMount(() => {
		setTimeout(() => {
			show = true;
		}, 1000);
	});
</script>

<Base>
	<main>
		<nav>
			<NavLinkGroup>
				{#if show}
					<NavLink href="#" active={active === 1} onclick={() => (active = 1)}
						>Link 1</NavLink
					>
					<NavLink href="#" active={active === 2} onclick={() => (active = 2)}
						>Link 2</NavLink
					>
					<NavLink href="#" active={active === 3} onclick={() => (active = 3)}
						>Link 3</NavLink
					>
				{/if}
			</NavLinkGroup>
		</nav>
		<content>
			<iframe src="https://example.com" title="Example Website"></iframe>
		</content>
	</main>
</Base>

<style>
	main {
		display: flex;
		flex-direction: row;
		height: 100vh;
	}

	nav {
		width: 200px;
		padding: 1rem;
	}

	content {
		flex-grow: 1;
		padding: 1rem;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
