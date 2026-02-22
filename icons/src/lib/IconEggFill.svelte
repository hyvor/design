<script lang="ts">
  interface Props {
    size?: number;
    [key: string]: any
  }

  let { size = 16, ...rest }: Props = $props();
</script>
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width={size} height={size} {...rest}><path d="M14 10a6 6 0 0 1-12 0C2 5.686 5 0 8 0s6 5.686 6 10"/></svg>