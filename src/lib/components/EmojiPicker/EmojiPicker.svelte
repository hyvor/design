<script lang="ts">
	import { onMount } from "svelte";
	import { getData } from "./emoji.js";

    onMount(() => {

        getData().then((data) => {
            console.log(data);
        });

    });

</script>


<div class="picker hds-box">

    // 

</div>

