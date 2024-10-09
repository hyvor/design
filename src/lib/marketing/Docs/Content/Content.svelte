<script lang="ts">
  import Box from "$lib/components/Box/Box.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  function linkifyHeadings() {
    var hs = document.querySelectorAll("h2[id],h3[id],h4[id]");
    for (var i = 0; i < hs.length; i++) {
      var h = hs[i];

      var icon = document.createElement("a");
      icon.className = "heading-anchor-link";
      icon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>';
      icon.tabIndex = -1;
      h.appendChild(icon);

      var id = h.getAttribute("id");
      var link = document.createElement("a");
      link.className = "heading-anchor";
      link.setAttribute("href", "#" + id);
      link.innerHTML = h.innerHTML;
      h.innerHTML = link.outerHTML;
    }
  }

  onMount(() => {
    const unsubscribe = page.subscribe(() => {
      linkifyHeadings();
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<div class="content-wrap">
  <Box>
    <content>
      <slot />
    </content>
  </Box>
</div>

<style lang="scss">
  .content-wrap {
    flex: 1;
    padding: 25px 0;
    margin: 0 15px;
    min-width: 0;
  }
  content {
    display: block;
    padding: 30px 50px;
  }

  content :global(p),
  content :global(li) {
    line-height: var(--line-height-content);
  }

  content :global(h1:first-child) {
    margin-top: 0;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: -0.03em;
    margin: 0 0 30px;
    position: relative;
    display: table;
    &:after {
      position: absolute;
      content: "";
      bottom: -13px;
      left: 0px;
      width: 30%;
      height: 3px;
      background: var(--accent);
      margin-top: 10px;
    }
  }
  content :global(a:not(.no-link-color a)) {
    color: var(--link);
    text-decoration: underline;
  }
  content :global(li) {
    margin-bottom: 8px;
  }

  content :global(.table) {
    margin: 20px 0;
  }

  content :global(code) {
    font-size: 14px;
    padding: 0.2em 0.4em;
    display: inline-block;
    background-color: #f4f2f0;
    color: #905;
    font-family: inherit;
    border-radius: 4px;
    line-height: normal;
    font-weight: 400;
  }
  :global(:root.dark) content :global(code) {
    background-color: #282c34;
    color: #e06c75;
  }

  content :global(a.heading-anchor-link) {
    position: absolute;
    right: 100%;
    margin-right: 7px;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
  }

  content {
    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      position: relative;
      margin: 20px 0;
    }

    :global(h1) {
      font-size: 2em;
    }
    :global(h2) {
      font-size: 1.5em;
    }
    :global(h3) {
      font-size: 1.3em;
    }
    :global(h4) {
      font-size: 1.2em;
    }
    :global(h5) {
      font-size: 1.1em;
    }
    :global(h6) {
      font-size: 1em;
    }
  }

  content {
    :global(.heading-anchor:hover + .heading-anchor-link) {
      opacity: 1;
    }

    :global(h2 a:not(.heading-anchor-link)),
    :global(h3 a:not(.heading-anchor-link)),
    :global(h4 a:not(.heading-anchor-link)),
    :global(h5 a:not(.heading-anchor-link)),
    :global(h6 a:not(.heading-anchor-link)) {
      text-decoration: none;
      color: inherit;
    }
  }

  @media (max-width: 992px) {
    .content-wrap {
      padding-top: 0;
      order: 2;
    }
    content {
      padding: 20px 25px;
    }
  }
</style>
