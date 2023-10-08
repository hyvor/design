<script lang="ts">
	import Container from './../Container/Container.svelte';
    import DarkToggle from "../../components/Dark/DarkToggle.svelte";
    import IconButton from "../../components/IconButton/IconButton.svelte";
    import Dropdown from "../../components/Dropdown/Dropdown.svelte";
    import { IconList } from "@hyvor/icons";

    export let logo : string;
    export let name : string = "HYVOR";
	export let subName : undefined | string = undefined;
	export let darkToggle : boolean = true;

</script>

<header>

	<Container as="nav">

		<div class="nav-start">
            <a class="nav-brand" href="/">
                <img src={logo} alt="Hyvor Logo" width="30" height="30" />
				<span class="brand-product">
					<span class="brand">{name}</span>
					{#if subName}
						<span class="product">{subName}</span>
					{/if}
				</span>
            </a>
        </div>

		<div class="nav-center">
			<slot name="center" />
		</div>

		<div class="nav-end">
			<slot name="end" />
		</div>

		<div class="dark-mobile">

			{#if darkToggle}
				<span class="dark-toggle-wrap">
					<DarkToggle />
				</span>
			{/if}

			<span class="mobile-nav-wrap">
				<Dropdown align="end" width={300}>
					<IconButton 
						color="invisible" 
						slot="trigger"
					>
						<IconList size={18} />
					</IconButton>
					<div slot="content" class="mobile-content">
						<div class="mobile-inner center">
							<slot name="center" />
						</div>
						<div class="mobile-inner end">
							<slot name="end" />
						</div>
					</div>
				</Dropdown>
			</span>

		</div>

	</Container>

</header>

<div class="header-space" />

<style lang="scss">

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
		line-height: inherit;
		white-space: nowrap;
		color: inherit;
		text-decoration: none;
		font-weight: 600;
	}
	.nav-brand img {
		vertical-align: middle;
	}

	.brand-product {
		vertical-align: middle;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		line-height: 14px;
	}
	.brand-product .brand {
		font-size: 14px;
	}
	.brand-product .product {
		font-size: 12px;
		font-weight: normal;
		color: var(--text-light);
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
	.dark-toggle-wrap {
		margin-left: 8px;
	}

	.mobile-nav-wrap {
		display: none;
	}

	@media screen and (max-width: 992px) {
		.nav-center {
			display: none;
		}
		.nav-end {
			display: none;
		}
		.mobile-nav-wrap {
			display: inline-block;
		}
		.dark-mobile {
			flex: 1;
			text-align: right;
		}
	}

	.mobile-content, .mobile-inner {
		display: flex;
		flex-direction: column;
	}
	.mobile-content {
		gap: 10px;
	}

	.mobile-content :global(.button) {
		display: flex;
	}

</style>
