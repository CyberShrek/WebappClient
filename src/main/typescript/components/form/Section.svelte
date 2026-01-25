<script lang="ts">

    import Grid from "../misc/Grid.svelte"

    export let
        title: string = '',
        area: number = 4

</script>

<div class="section">

    <div class="header">
        <p class="title">
            {title}
        </p>
    </div>

    <Grid {area}>
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

    .section > .header {
        display: flex;
        gap: var(--strong-indent);
        align-items: center;
        font-size: large;
        font-weight: bold;
        margin: var(--strong-indent) 0 0;
    }

    .section > .header > p {
        min-width: var(--default-field-width);
        font-size: x-large;
        font-weight: normal;
    }
</style>