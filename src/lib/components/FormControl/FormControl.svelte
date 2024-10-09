<div class="form-control" {...$$restProps}>
  <slot />
</div>

<style>
  .form-control {
    display: flex;
    flex-direction: column;
  }

  .form-control :global(.caption) {
    margin-bottom: 8px;
  }

  .form-control > :global(label) {
    margin-bottom: 8px;
    font-weight: 600;
  }

  .form-control :global(label + .caption) {
    margin-top: -8px;
  }

  .form-control :global(.validation) {
    margin-top: 8px;
  }
</style>
