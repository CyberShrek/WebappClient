<script lang="ts">

    export let
        value: "asc" | "desc" | null = null

</script>

<button class="sort {value ?? ''}"
        title="Сортировка"
        on:click={() => value = value == null ? "asc" : value === "asc" ? "desc" : null}>
    {#if value === "asc"}
        ↑
    {:else if value === "desc"}
        ↓
    {:else}
        ⇅
    {/if}
</button>

<style>
    .sort {
        position: absolute;
        right: 0;
        cursor: pointer;
        opacity: 0.5;
        height: 17px;
        width: 17px;
        padding: 0;
        transform: translateX(calc(0px - var(--indent))) translateY(calc(-20px - var(--indent)));
        border-radius: 100px;
        border: none;
    }
    .sort:is(:hover, .asc, .desc) {
        opacity: 1;
    }
</style>