<script lang="ts">
  interface Props {
    size?: number;
    [key: string]: any
  }

  let { size = 16, ...rest }: Props = $props();
</script>
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width={size} height={size} {...rest}><path d="M5.5 0a.5.5 0 0 0 0 1H6v5.416a5 5 0 1 0 4 0V1h.5a.5.5 0 0 0 0-1zM9 2h-.5a.5.5 0 0 0 0 1H9v1h-.5a.5.5 0 0 0 0 1H9v1h-.5a.5.5 0 0 0 0 1h.564a.5.5 0 0 0 .27.227A4.002 4.002 0 0 1 8 15a4 4 0 0 1-1.333-7.773.5.5 0 0 0 .333-.47V1h2z"/></svg>