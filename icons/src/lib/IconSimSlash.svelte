<script lang="ts">
    interface Props {
        size?: number;
        [key: string]: any
    }

    let { size = 16, ...rest }: Props = $props();
</script>
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width={size} height={size} {...rest}><path d="m11.646.44.897.896-.707.707-.897-.897A.5.5 0 0 0 10.586 1H3.5a.5.5 0 0 0-.5.5v9.379l-1 1V1.5A1.5 1.5 0 0 1 3.5 0h7.086a1.5 1.5 0 0 1 1.06.44ZM10.5 3c.117 0 .23.013.34.039L9.879 4H8.5v1.379L6.879 7H5v1.879l-1 1V4.5A1.5 1.5 0 0 1 5.5 3h5ZM12 6.121l-1 1V9H9.121L7.5 10.621V12H6.121l-.961.961c.11.026.223.039.34.039h5a1.5 1.5 0 0 0 1.5-1.5V6.121ZM3.5 15a.498.498 0 0 1-.288-.091l-.71.71c.265.237.615.381.998.381h9a1.5 1.5 0 0 0 1.5-1.5V4.121l-1 1V14.5a.5.5 0 0 1-.5.5h-9Zm2-11a.5.5 0 0 0-.5.5V6h2.5V4h-2Zm5.5 6v1.5a.5.5 0 0 1-.5.5h-2v-2H11Zm3.854-8.146a.5.5 0 0 0-.708-.708l-13 13a.5.5 0 0 0 .708.708l13-13Z"/></svg>