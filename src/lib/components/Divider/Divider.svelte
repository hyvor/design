<script lang="ts">
    export let color : string = 'var(--accent-lightest)';
    export let height : number = 1;
    export let width : number = 100;
    export let margin : number = 0;
</script>

<div 
    class="line"
    style="
        background-color: {color};
        height: {height}px;
        width: {width}%;
        margin: {margin}px 0;
    "
/>

<style>
   
</style>