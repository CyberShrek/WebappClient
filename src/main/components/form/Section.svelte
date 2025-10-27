<script lang="ts">

    import {fade} from "svelte/transition"
    import Grid from "../misc/Grid.svelte"

    export let
        title: string = '',
        size: number = 4

</script>

<div class="section"
     transition:fade>

    <Grid className="fields"
          {title}
          {size}>

        <slot/>

    </Grid>
</div>

<style>
    .section {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        /*     padding-bottom: var(--indent); */
        gap: var(--indent);
    }

    .section .grid-wrapper > .header {
        display: flex;
        gap: var(--strong-indent);
        align-items: center;
        /*     font-size: 22px; */
        font-weight: bold;
        margin: 0;
    }

    .section > .header > p {
        min-width: var(--default-field-width);
    }
</style>