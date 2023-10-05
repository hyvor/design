<script lang="ts">
    export let type : 'info' | 'success' | 'warning' | 'danger' | 'soft' = 'soft'; 
</script>


<div class={"callout " + type} {...$$restProps}>

    {#if $$slots.title}

        <div class="title-wrap">

            {#if $$slots.icon}
                <span class="title-icon"><slot name="icon" /></span>
            {/if}

            <div class="title"><slot name="title" /></div>

        </div>

    {/if}

    <div class="text-wrap">
        {#if $$slots.icon && !$$slots.title}
            <span class="icon"><slot name="icon" /></span>
        {/if}

        <div class="text">
            {#if $$slots.default}
                <slot />
            {/if}
            <slot name="text" />
        </div>
    </div>

</div>


<style>

    .callout {
        padding: 15px 25px;
        border-radius: var(--box-radius);    
        line-height: var(--line-height-content);
    }

    .callout.soft {
        background-color: var(--accent-light);
    }

    .callout.info {
        background-color: var(--blue-light);
        color: var(--blue-dark);
    }

    .callout.warning {
        background-color: var(--orange-light);
        color: var(--orange-dark)
    }

    .callout.danger {
        background-color: var(--red-light);
        color: var(--red-dark);
    }

    .callout.success {
        background-color: var(--green-light);
        color: var(--green-dark);
    }

    .title-wrap {
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 18px;
    }

    .title-icon {
        vertical-align: middle;
        margin-right: 8px;
    }

    .text-wrap {
        display: flex;
        align-items: flex-start;
    }

    .icon {
        margin-right: 8px;
        font-size: 18px;
    }

    .title {
    }

</style>