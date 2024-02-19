<script lang="ts">
	import { InternationalizationService } from './../../lib/components/Internationalization/i18n.js';
    import { onMount, getContext } from 'svelte';
	import PricingLink from './stringComponents/PricingLink.svelte';
    import T from '$lib/components/Internationalization/T.svelte';
    import { t } from '$lib/components/Internationalization/t.js';
    import ChangeButton from "./ChangeButton.svelte";
    import LanguageToggle from "../../lib/components/Internationalization/LanguageToggle.svelte";
    import TextInput from "../../lib/components/TextInput/TextInput.svelte";
    import enJson from './locale/en.json';

    let name = 'Supun';
    let dynamicValue = '';
    let dynamicValue2 = '';

    const i18n = getContext<InternationalizationService>('i18n');
    const Intl = getContext<InternationalizationService<typeof enJson>>('i18n');

    onMount(() => {
        dynamicValue = 'Loading...';
        dynamicValue2 = 'Loading...';
        setTimeout(() => {
            dynamicValue = t('welcome', {}, i18n);
            dynamicValue2 = i18n.t('welcome')
        }, 1000);
    });

</script>

<ChangeButton />

<TextInput 
    bind:value={name}
/>

<div style="margin-top:20px;">
    <div>
        <Intl.T key="welcome" /> <br />
        <T key="welcome" /> <br />
        { t('welcome') } <br />
        {dynamicValue} <br />
        {dynamicValue2}
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
    <div>
        <T key="element" params={{b: {element: 'b'}}} />
    </div>
</div>

<div style="padding: 200px;">
    <LanguageToggle align="center" size="small" />
</div>