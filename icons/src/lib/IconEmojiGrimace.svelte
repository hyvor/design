<script lang="ts">
  interface Props {
    size?: number;
    [key: string]: any
  }

  let { size = 16, ...rest }: Props = $props();
</script>
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width={size} height={size} {...rest}><path d="M7 6.25c0 .69-.448 1.25-1 1.25s-1-.56-1-1.25S5.448 5 6 5s1 .56 1 1.25Zm3 1.25c.552 0 1-.56 1-1.25S10.552 5 10 5s-1 .56-1 1.25.448 1.25 1 1.25Zm2.98 3.25A1.5 1.5 0 0 1 11.5 12h-7a1.5 1.5 0 0 1-1.48-1.747v-.003A1.5 1.5 0 0 1 4.5 9h7a1.5 1.5 0 0 1 1.48 1.747v.003Zm-8.48.75h.25v-.75H3.531a1 1 0 0 0 .969.75Zm7 0a1 1 0 0 0 .969-.75H11.25v.75h.25Zm.969-1.25a1 1 0 0 0-.969-.75h-.25v.75h1.219ZM4.5 9.5a1 1 0 0 0-.969.75H4.75V9.5H4.5Zm1.75 2v-.75h-1v.75h1Zm.5 0h1v-.75h-1v.75Zm1.5 0h1v-.75h-1v.75Zm1.5 0h1v-.75h-1v.75Zm1-2h-1v.75h1V9.5Zm-1.5 0h-1v.75h1V9.5Zm-1.5 0h-1v.75h1V9.5Zm-1.5 0h-1v.75h1V9.5Z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14Z"/></svg>