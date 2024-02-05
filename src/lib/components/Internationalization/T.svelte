<script lang="ts">
    import { getContext, type ComponentType, onMount } from "svelte";
	import { getStringByKey, i18nService } from './i18n.js';
    import { IntlMessageFormat, type PrimitiveType } from 'intl-messageformat'
    import { browser } from "$app/environment";

    type ComponentFunction = (children: string) => ComponentType;
    type InputParams = Record<string, PrimitiveType | ComponentFunction>;
    type ParamValue = PrimitiveType | ((chunks: string | string[]) => string);

    export let key: string;
    export let params: InputParams = {};

    interface ComponentBinding {
        component: ComponentType,
        children: string,
    }
    const componentBindings = {} as Record<string, ComponentBinding>;
    const componentId = 'i18n-component-';

    console.log(componentId, 'component id')

    function getProcessedParams() {

        let retParams: Record<string, ParamValue> = {};

        for (let [key, value] of Object.entries(params)) {
            let newValue: ParamValue;
            if (typeof value === 'function') {
                newValue = (chunks: string | string[]) => {
                    const children = typeof chunks === 'string' ? chunks : chunks.join('');
                    const component = (value as ComponentFunction)(children);
                    const id = componentId + key;
                    componentBindings[id] = {
                        component,
                        children,
                    };

                    console.log('generated id', id, '<span id="' + id + '"></span>');
                    return '<span id="' + id + '"></span>';
                }
            } else {
                newValue = value;
            }
            retParams[key] = newValue;
        }

        console.log('get processed params', retParams);

        return retParams;

    }

    const i18n = getContext<i18nService>('i18n');
    $: locale = i18n.locale;
    const strings = i18n.strings;

    let message = setValues();
    let mounted = false;

    function setValues() {
        const processedParams = getProcessedParams();
        const string = getStringByKey($strings, key);
        if (string) {
            const formatter = new IntlMessageFormat(string, $locale);
            console.log('message taken')
            return formatter.format(processedParams) as string;
        }
        return '';
    }

    // setValues();
    /* $: {
        params, $strings, $locale;
        setValues();
        // bindComponents();
    } */
    
    let el: HTMLElement;

    function bindComponents() {
        for (let [id, binding] of Object.entries(componentBindings)) {
            const el = document.getElementById(id);
            console.log(id, el, 'found');
            if (el) {
                el.innerHTML = '';
                new binding.component({
                    target: el,
                    hydrate: true,
                    props: {
                        children: binding.children
                    }
                });
            }
        }
    }

    onMount(() => {
        console.log('mounted', el.innerHTML)
        mounted = true;
        bindComponents();
    });
    
</script>

<span bind:this={el}>
    {@html message}
</span>