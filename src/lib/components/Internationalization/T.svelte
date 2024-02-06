<script lang="ts">
    import { getContext, type ComponentType, onMount, tick, afterUpdate } from "svelte";
	import { getStringByKey, i18nService } from './i18n.js';
    import { IntlMessageFormat, type PrimitiveType } from 'intl-messageformat'
  import { browser } from "$app/environment";

    type ComponentDeclaration = {
        component: ComponentType,
        props?: Record<string, any>
    }
    type InputParams = Record<string, PrimitiveType | ComponentDeclaration>;
    type ParamValue = PrimitiveType | ((chunks: string | string[]) => string);

    export let key: string;
    export let params: InputParams = {};

    let hasComponentParams = false;

    /**
     * In backend processing (SSR), we only render the strings inside it
     * The components are not rendered.
     * However, if components are found, we set hasComponentParams to true
     * so that we can render the components in the frontend later.
     */
    function getParamsForBackend() {
        let retParams: Record<string, ParamValue> = {};

        for (let [key, value] of Object.entries(params)) {
            let newValue: ParamValue;
            if (
                typeof value === 'object' &&
                value !== null &&
                value.hasOwnProperty('component')
            ) {
                newValue = (chunks: string | string[]) => {
                    const children = typeof chunks === 'string' ? chunks : chunks.join('');
                    return children;
                }
                hasComponentParams = true;
            } else {
                newValue = value as PrimitiveType;
            }
            retParams[key] = newValue;
        }

        return retParams;
    }


    /**
     * In frontend processing, we render the components
     */
    interface ComponentBinding {
        component: ComponentType,
        props: Record<string, any>
    }
    const componentBindings = new Map<string, ComponentBinding>();
    function getParamsForFrontend() {

        let retParams: Record<string, ParamValue> = {};

        for (let [key, value] of Object.entries(params)) {
            let newValue: ParamValue;
            if (
                typeof value === 'object' &&
                value !== null &&
                value.hasOwnProperty('component')
            ) {
                const { component, props } = value as ComponentDeclaration;

                newValue = (chunks: string | string[]) => {
                    const children = typeof chunks === 'string' ? chunks : chunks.join('');
                    const id = key + '-' +
                        Math.random().toString(36).substring(7) + '-' +
                        Date.now().toString();
                    componentBindings.set(id, {
                        component,
                        props: {
                            ...props,
                            children
                        }
                    });
                    return '<span id="' + id + '">' + children + '</span>';
                }
            } else {
                newValue = value as PrimitiveType;
            }
            retParams[key] = newValue;
        }

        return retParams;

    }

    const i18n = getContext<i18nService>('i18n');
    const locale = i18n.locale;
    const strings = i18n.strings;

    let message = getMessage(getParamsForBackend());

    function getMessage(processedParams: Record<string, ParamValue>) {
        const string = getStringByKey($strings, key);
        if (string) {
            const formatter = new IntlMessageFormat(string, $locale);
            return formatter.format(processedParams) as string;
        }
        return '';
    }
    

    function bindComponents() {
        for (let [id, binding] of componentBindings) {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = '';
                new binding.component({
                    target: el,
                    hydrate: true,
                    props: binding.props
                });
            }
        }
    }

    async function renderFrontend() {
        message = getMessage(getParamsForFrontend());
        await tick();
        if (hasComponentParams) bindComponents();
    }

    let mounted = false;

    $: {
        if ($locale || $strings) {
            if (browser && mounted) {
                renderFrontend();
            }
        }
    }

    onMount(async () => {

        mounted = true;

        /**
         * If there are components,
         * we wait for the tick, then bind the components
         */
        if (hasComponentParams) {
            renderFrontend();
        }

    })
    
</script>

{@html message}