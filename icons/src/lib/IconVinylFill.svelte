<script lang="ts">
  interface Props {
    size?: number;
    [key: string]: any
  }

  let { size = 16, ...rest }: Props = $props();
</script>
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width={size} height={size} {...rest}><path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/></svg>