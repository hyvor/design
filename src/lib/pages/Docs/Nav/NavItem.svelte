<script lang="ts">
	import { page } from "$app/stores";

    export let href: string;
</script>


<a 
    href={href}
    class:active={href === $page.url.pathname}
>
    <slot />
</a>

<style>

    a {
        display: block;
        padding: 4px 25px;
        color: var(--text-light);
        font-size: 0.9rem;
        letter-spacing: .3px;
        border-left: 3px solid transparent;
    }

    a:hover {
        background-color: var(--hover);
    }

    a.active {
        background-color: var(--accent-lightest);
        border-left: 3px solid var(--accent);
    }

</style>