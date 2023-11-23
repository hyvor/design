<script lang="ts">
    export let color : string = 'var(--accent-lightest)';
    export let height : number = 1;
    export let width : number = 100;
    export let margin : number = 0;
    export let align: 'start' | 'center' | 'end' = 'center';
</script>
<!-- <div 
    class="line"
    style="
        background-color: {color};
        height: {height}px;
        width: {width}%;
        margin: {margin}px 0;
        align: {align};
    "
/>

<style>
   
</style> -->

<!-- <div 
    class="line"
    style="
        background-color: {color};
        height: {height}px;
        width: {width}%;
        margin-top: {margin}px;
        margin-bottom: {margin}px;
        margin-left: {align === 'end' ? 'auto' : '0'};
        margin-right: {align === 'start' ? 'auto' : '0'};
    "
/> -->

<div
    class="line"
    style="
    background-color: {color};
        height: {height}px;
        width: {width}%;
        margin-top: {margin}px;
        margin-bottom: {margin}px;
        margin-left: {align === 'center' || align === 'end' ? 'auto' : 0};
        margin-right: {align === 'center' ? 'auto' : 0};
        display: flex;
    "
/>

<style>
    .line {
        display: block;
    }
</style>