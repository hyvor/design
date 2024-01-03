<script lang="ts">
	import Modal from './Modal.svelte';
	import { confirmStore } from './confirm.js';
    import Button from './../Button/Button.svelte';
    import ButtonGroup from './../Button/ButtonGroup.svelte';

    let show = true;

    function handleCancel() {
        $confirmStore!.onCancel();
    }

    function handleConfirm() {
        $confirmStore!.onConfirm();
    }

    $: {
        if (!show) {
            handleCancel();
        }
    }

</script>

{#if $confirmStore}

    <Modal
        title={$confirmStore.title}
        show={true}
        size="small"
    >

        {#if typeof $confirmStore.content === "string"}
            {$confirmStore.content}
        {:else}
            <svelte:component this={$confirmStore.content} />
        {/if}

        <svelte:fragment slot="footer">
            <ButtonGroup>
                <Button
                    variant="invisible"
                    on:click={handleCancel}
                >
                    {$confirmStore.cancelText || "Cancel"}
                </Button>
                <Button 
                    color={$confirmStore.danger ? "red" : "accent"}
                    on:click={handleConfirm}
                >
                    {$confirmStore.confirmText || "Confirm"}
                </Button>
            </ButtonGroup>
        </svelte:fragment>

    </Modal>

{/if}