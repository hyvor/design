<script context="module">
  const PRODUCTS = {
    talk: {
      name: "Hyvor Talk",
      logo: LogoTalk,
      url: "talk.hyvor.com",
      description: "Comments, Newsletters, Memberships",
    },
    blogs: {
      name: "Hyvor Blogs",
      logo: LogoBlogs,
      url: "blogs.hyvor.com",
      description: "Blogging Platform",
    },
    fortguard: {
      name: "FortGuard",
      logo: LogoFortguard,
      url: "fortguard.io",
      description: "Spam Detection API",
    },
  };
  export { PRODUCTS };
</script>

<script lang="ts">
  import LogoBlogs from "$lib/marketing/Logo/LogoBlogs.svelte";
  import LogoFortguard from "$lib/marketing/Logo/LogoFortguard.svelte";
  import LogoTalk from "$lib/marketing/Logo/LogoTalk.svelte";
  import { ActionList, ActionListItem, Button, Dropdown } from "../index.js";
  import { IconCaretDownFill, IconBoxArrowUpRight } from "@hyvor/icons";

  export let mobile = false;
</script>

<Dropdown align={mobile ? "center" : "end"} width={325}>
  <Button slot="trigger" variant="invisible" color="input" size="small">
    Products
    <IconCaretDownFill size={10} slot="end" />
  </Button>
  <ActionList slot="content">
    {#each Object.entries(PRODUCTS) as [key, product]}
      <a href={`https://${product.url}`} target="_blank">
        <ActionListItem>
          {product.name}
          <div slot="description">
            {product.description}
          </div>
          <svelte:component this={product.logo} size={20} slot="start" />
          <IconBoxArrowUpRight slot="end" size={12} />
        </ActionListItem>
      </a>
    {/each}
  </ActionList>
</Dropdown>
