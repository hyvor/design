<script lang="ts">
	import LogoCore from "$lib/marketing/Logo/LogoCore.svelte";
	import { onMount } from "svelte";
    import anime from 'animejs';

    onMount(() => {

        const icon = document.querySelector('.hyvor-icon') as HTMLElement;
        icon.style.transform = 'translateY(-60px)';

        const rightEye = document.querySelector('#path1007') as HTMLElement;

        const timeline = anime.timeline();

        timeline.add({
            targets: icon,
            translateY: 0,
            duration: 1000,
        });

        timeline.add({
            targets: rightEye,
            scaleY: 1.4,
            scaleX: 0.7,
            strokeWidth: 5,
            duration: 200,
            easing: 'easeInOutSine',
        }, '-=600');

        timeline.add({
            targets: rightEye,
            scaleY: 1,
            scaleX: 1,
            strokeWidth: 6,
            duration: 200,
            easing: 'easeInOutSine',
        }, '-=400');

        // anime({
        //     targets: rightEye,
        //     scaleY: 1,
        //     scaleX: 1,
        //     duration: 3000,
        // });

    });
</script>

<div class="wrap">
    <div class="hyvor-icon">
        <LogoCore size={100} />
    </div>
</div>

<style>
    .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    :global(#path1007) {
        transform-box: border-box;
        transform-origin: center;
    }
</style>