<script>
  import Toc from "../Toc.svelte";
</script>

<div class="sidebar">
  <Toc />
</div>

<style>
  .sidebar {
    width: 220px;
    top: var(--header-height, 0);
    padding: 25px 0;
    position: sticky;
    flex-shrink: 0;
    align-self: flex-start;
  }

  @media (max-width: 992px) {
    .sidebar {
      order: 1;
      position: relative;
      top: initial;
      padding: 0 15px;
      margin-bottom: 20px;
      width: 100%;
    }
  }
</style>
