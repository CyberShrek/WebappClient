<script lang="ts">

    export let head: string[]

</script>

<tr>
    {#each head as header}
        <th>{header}</th>
    {/each}
</tr>
