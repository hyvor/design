<script lang="ts">
    interface Props {
        name: string;
    }

    let { name }: Props = $props();

    async function getSvg() {
        try {
            const svgModule = await import(`./icons/${name}.svg?raw`);
            return svgModule.default;
        } catch (e) {
            return '[?]';
        }
    }

    const svg = await getSvg();
</script>

{@html svg}
