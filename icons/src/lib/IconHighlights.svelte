<script lang="ts">
    interface Props {
        size?: number;
        [key: string]: any
    }

    let { size = 16, ...rest }: Props = $props();
</script>
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width={size} height={size} {...rest}><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0Zm-8 5v1H4.5a.502.502 0 0 0-.093.009A7.029 7.029 0 0 1 3.1 13H8Zm0-1H2.255a6.998 6.998 0 0 1-.581-1H8v1Zm-6.71-2a6.96 6.96 0 0 1-.22-1H8v1H1.29ZM1 8c0-.34.024-.673.07-1H8v1H1Zm.29-2c.103-.345.231-.68.384-1H8v1H1.29Zm.965-2c.25-.36.534-.694.846-1H8v1H2.255Zm2.137-2A6.967 6.967 0 0 1 8 1v1H4.392Z"/></svg>