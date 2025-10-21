<script>
import Base from '$lib/components/Base/Base.svelte';
import Header from '$lib/marketing/Header/Header.svelte';
import logo from '../img/logo/hyvor.svg';
import Button from '../../lib/components/Button/Button.svelte';
import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
import IconGithub from '@hyvor/icons/IconGithub';
</script>

<svelte:head>
    <title>Test Page - HDS</title>
</svelte:head>

<Header {logo} name="HYVOR" subName="Design System">
    {#snippet end()}
        <Button size="small" as="a" href="https://hyvor.com" variant="invisible">HYVOR</Button>
        <Button as="a" size="small" href="https://github.com/hyvor/design" target="_blank">
            {#snippet start()}
                <IconGithub size={14} />
            {/snippet}
            Github {#snippet end()}
            <IconBoxArrowUpRight size={11} />
        {/snippet}
        </Button>
    {/snippet}
</Header>

<Base>
    <div class="hds-container-max">
        <h1>This is a test page</h1>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo <consequat class="">   </consequat>
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </div>
</Base>
