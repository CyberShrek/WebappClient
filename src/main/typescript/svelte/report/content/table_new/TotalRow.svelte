<script lang="ts">

    import Decimal from "decimal.js-light";

    export let
        rows: TableRow[],
        nesting: number = -1,
        collapsed: boolean = false

    let totalRow: (string | number)[] = []

    $: totalRow = rows?.length > 1 ? calculateTotalRow() : []


    function calculateTotalRow(): (string | number)[] {
        const result: (string | number)[] = rows[0]?.cells.map((cell, index) => {
            switch (cell.type) {
                case "string" : return index === nesting ? String(rows[0]?.cells[index]?.value) : index === nesting + 1 ? "Итого" : ""
                case "number" : return 0
                case "boolean": return ""
            }
        })
        rows.forEach(row => {
            row.cells.forEach((cell, index) => {
                    if (index > nesting && cell.type === "number") {
                        const sum = new Decimal(result[index] as number)
                        result[index] = sum.add(Number(cell)).toNumber()
                    }
                }
            )
        })

        return result
    }

</script>

{#if rows.length > 1}
    <tr class:collapsed>
        {#each totalRow as value, columnIndex}
            <td>
                {#if columnIndex > nesting}
                    <slot name="cell" {columnIndex}
                          row={totalRow}
                          {value}
                          type={types[columnIndex]}/>
                {/if}
            </td>
        {/each}
    </tr>
{/if}