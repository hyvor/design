<script lang="ts">
    export let name: string;
</script>
<div class="nav-category">
    <div class="name">{name}</div>
    <div class="nav-items">
        <slot />
    </div>
</div>

<style>

    .nav-category {
        margin-bottom: 20px;
    }

    .name {
        font-weight: 600;
        padding: 10px 25px;
    }

</style>