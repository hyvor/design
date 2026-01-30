<script lang="ts">
	import LogoCore from "$lib/marketing/Logo/LogoCore.svelte";
	import { onMount } from "svelte";
    import anime from 'animejs';

    interface Props {
        logo?: typeof LogoCore;
        size?: number;
    }

    let { logo = LogoCore, size = 100 }: Props = $props();

    onMount(() => {
        const icon = document.querySelector('.hyvor-icon') as HTMLElement;
        const shadow = document.querySelector('.shadow') as HTMLElement;

    anime({
    targets: icon,
    translateY: [
        { value: -24, duration: 400, easing: 'easeOutQuad' },
        { value: 0, duration: 500, easing: 'easeInQuad' }
    ],
    loop: true,
    });

   anime({
    targets: shadow,
    scale: [
        { value: 1.3, duration: 400, easing: 'easeOutQuad' },
        { value: 1.2, duration: 500, easing: 'easeInQuad' }
    ],
    loop: true,
    });

});
</script>


<div class="loader">
  <div class="hyvor-icon">
     <svelte:component this={logo} size={size} />
  </div>
  <div class="shadow-wrap">
    <div class="shadow"></div>
  </div>
</div>


<style>
.loader {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
    justify-content: center;
    height: 100vh;

}

.shadow-wrap {
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.shadow {
  width: 60px;
  height: 12px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  filter: blur(8px);
  will-change: transform, opacity;
}

</style>