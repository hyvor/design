<script lang="ts">
	import PricingLink from './stringComponents/PricingLink.svelte';
    import T from '$lib/components/Internationalization/T.svelte';
    import ChangeButton from "./ChangeButton.svelte";
</script>

<ChangeButton />

<div style="margin-top:20px;">
    <!-- <div>
        <T key="welcome" />
    </div>
    <div>
        <T key="by" params={{name: 'Supun'}} />
    </div> -->
    <div>
        <T key="advanced" params={{
            a: (chunks) => {
                return PricingLink;
                return 'hi!';
            }
        }} />
    </div>
</div>
