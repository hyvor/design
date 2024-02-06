<script lang="ts">
	import PricingLink from './stringComponents/PricingLink.svelte';
    import T from '$lib/components/Internationalization/T.svelte';
    import ChangeButton from "./ChangeButton.svelte";
    import LanguageToggle from "../../lib/components/Internationalization/LanguageToggle.svelte";
  import TextInput from "../../lib/components/TextInput/TextInput.svelte";

    let name = 'Supun';
</script>

<ChangeButton />

<TextInput 
    bind:value={name}
/>

<div style="margin-top:20px;">
    <div>
        <T key="welcome" />
    </div>
    <div>
        <T key="by" params={{name}} />
    </div>
    <div>
        <T key="advanced" params={{
            a: {component: PricingLink}
        }} />
    </div>
    <div>
        <T key="dates.start" params={{
            date: new Date()
        }} />
    </div>
    <div>
        <T key="price" params={{ price: 100 }} />
    </div>
    <div>
        <T key="users" params={{ count: 10 }} />
        <T key="users" params={{ count: 1 }} />
    </div>
</div>

<div style="padding: 200px;">
    <LanguageToggle align="center" size="small" />
</div>