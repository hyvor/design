<script lang="ts">
	import Container from './../Container/Container.svelte';
	import Button from '$lib/components/Button/Button.svelte';
    import DarkToggle from "../../components/Dark/DarkToggle.svelte";

    export let logo : string;
    export let name : string;

	export let darkToggle : boolean = true;

</script>

<header>

	<Container as="nav">

		<div class="nav-start">
            <a class="nav-brand" href="/">
                <img src={logo} alt="Hyvor Logo" width="30" height="30" />
                <span class="brand-name">{name}</span>
            </a>
        </div>

		<div class="nav-center">
			<slot name="center" />
		</div>

		<div class="nav-end">

            <slot name="end" />

			{#if darkToggle}
				<DarkToggle />
			{/if}

			<!-- <a href="/find">
				<Button active={$page.url.pathname === '/find'}>
					Find Feed
				</Button>
			</a>

			<a href="/learn" class="learn-button">
				<Button active={$page.url.pathname.startsWith('/learn')}>
					Learn RSS
				</Button>
			</a>

			<a href="/app">
				<Button>
					Log in
				</Button>
			</a>
			<a href="/app?signup">
				<Button accent>
					Sign up for FREE
				</Button>
			</a> -->
		</div>

	</Container>

</header>

<div class="header-space" />

<style>

    .header-space {
        height: var(--header-height);
    }

	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		background-color: var(--background, var(--accent-lightest));
		border-bottom: 1px solid var(--border);
		height: var(--header-height);
		display: flex;
		align-items: center;
	}

    header :global(nav) {
		display: flex;
        align-items: center;
	}
	.nav-brand {
		display: inline-block;
		font-size: 1.25rem;
		line-height: inherit;
		white-space: nowrap;
		color: inherit;
		text-decoration: none;
		font-weight: 600;
	}
	.nav-brand img {
		vertical-align: middle;
	}
	.brand-name {
		vertical-align: middle;
	}

	.nav-left {
		
	}

	.nav-center {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 6px;
		justify-content: center;
	}

	.nav-end {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.learn-button {
		margin-right: 10px;
	}
</style>
