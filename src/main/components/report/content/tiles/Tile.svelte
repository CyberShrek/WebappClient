

<style>
    .tile-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: var(--indent);
    }
    .tile-wrapper > .actions {
        display: flex;
        justify-content: space-between;
    }
    .tile-wrapper > p {
        margin: 0;
    }
    .tile-wrapper > .actions {
        display: flex;
    }


    .tile {
        display: flex;
        align-items: center;
        min-height: 100px;
        padding: var(--indent);
        gap: var(--indent);
        border-radius: var(--border-radius);
    }


    .tile *{
        color: inherit;
    }
</style>