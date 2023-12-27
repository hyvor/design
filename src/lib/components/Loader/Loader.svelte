<script lang="ts">
    import { 
        IconCheckCircleFill, IconXCircleFill 
    } from '@hyvor/icons';

    export let block : boolean = false;
    export let full: boolean = false;
    export let padding : 'none' | 'small' | 'medium' | 'large' | number = 'medium';

    export let size : 'small' | 'medium' | 'large' | number = 'medium';

    export let state : 'loading' | 'success' | 'error' | 'none' = 'loading';

    export let duration : number = 2000;

    $: {

        if (state === 'success' || state === 'error') {
            setTimeout(() => {
                state = 'none';
            }, duration);
        }

    }

    
    export let color : string = 'var(--accent)';
    export let colorTrack = 'var(--accent-lightest)';

    export let invert : boolean = false;

    if (invert) {
        const colorCopy = color;
        color = colorTrack;
        colorTrack = colorCopy;
    }


    const sizes = {
        small: 16,
        medium: 24,
        large: 32
    }

    size = typeof size === 'number' ? size : sizes[size];
    
    const strokeWidth = size >= 32 ? 5 :
                        size >= 24 ? 4 :
                        size >= 16 ? 3 : 2;
    const r = size / 2 - strokeWidth / 2;
    const strokeDashArray = 2 * Math.PI * r;
    const strokeDashOffset = strokeDashArray - (strokeDashArray * 0.25);


    const paddings = {
        none: 0,
        small: 60,
        medium: 150,
        large: 250
    }
    padding = typeof padding === 'number' ? padding : paddings[padding];

</script>

<div 
    class="loader"
    class:block
    class:full
    class:success={state === 'success'}
    class:error={state === 'error'}
    

    style:--local-size={size + "px"}
    style:padding={block ? padding + "px" : undefined}
    {...$$restProps}
>


    {#if state !== 'none'}
        <span class="loader-wrap">

            {#if state === 'loading'}
                <svg>
                    <circle 
                        class="track"
                        cx="50%"
                        cy="50%"
                        r={r + "px"}
                        fill="none"
                        stroke-width={strokeWidth}
                        stroke={colorTrack}
                    ></circle>
                    <circle 
                        class="progress"
                        cx="50%"
                        cy="50%"
                        r={r + "px"}
                        fill="none"
                        stroke-width={strokeWidth}
                        stroke={color}
                        stroke-linecap="round"
                        stroke-dasharray={strokeDashArray}
                        stroke-dashoffset={strokeDashOffset}
                    ></circle>
                </svg>
            {:else if state === 'success'}
                <span class="success-icon">
                    <IconCheckCircleFill  color="var(--green)" width={size} height={size} />
                </span>
            {:else if state === 'error'}
                <span class="error-icon">
                    <IconXCircleFill color="var(--red)" width={size} height={size} />
                </span>
            {/if}

        </span>

    {/if}
        

    {#if $$slots.default}
        <div class="message">
            <slot></slot>
        </div>
    {/if}
    
</div>



<style lang="scss">

    .loader {
        display: inline-flex;
        align-items: center;
        .message {
            margin-left: 10px;
        }
    }

    .loader.block {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .message {
            margin-top: 10px;
        }
    }

    .loader.full {
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .message {
            margin-top: 10px;
        }
    }

    .loader-wrap {
        display: inline-flex;
        width: var(--local-size);
        height: var(--local-size);
        border-radius: var(--local-size);
        position: relative;
    }

    .success-icon, .error-icon {
        animation: scale 0.2s ease-in-out;
    }

    svg {
        width: inherit;
        height: inherit;
        display: inherit;
        box-sizing: inherit;
        position: absolute;
        top: 0;
        left: 0;
    }

    circle.progress {
        transform: rotate(-90deg);
        transform-origin: center;
        animation: 0.8s linear 0s infinite normal none running rotate;
    }

    @keyframes rotate {
        0% {
            transform: rotate(-90deg);
        }
        100% {
            transform: rotate(270deg);
        }
    }

    @keyframes scale {
        0% {
            transform: scale(0.5);
            opacity: 0.4;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }


</style>