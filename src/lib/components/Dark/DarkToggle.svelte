<script lang="ts">
	import { dark } from './../../stores/dark.ts';
    
    function handleClick() {
        dark.update((value) => !value);
    }
</script>

<button on:click={handleClick}>
    Toggle
</button>