<script lang="ts">

    import Decimal from "decimal.js-light";

    export let
        data: (string | number | boolean | null)[][],
        types: ("string" | "number" | "boolean")[],
        nesting: number = -1

    let totalRow: typeof data[number] = []

    $: totalRow = data?.length > 1 ? calculateTotalRow(data) : []


    function calculateTotalRow(rows: typeof data): typeof data[number] {
        const result: typeof data[number] = types.map((type, index) => {
            switch (type) {
                case "string" : return index === nesting ? rows[0][index] : types[index + 1] === "string" ? "" : "Итого"
                case "number" : return 0
                case "boolean": return ""
            }
        })
        rows.forEach(row => {
            row.forEach((cell, index) => {
                    if (index > nesting && types[index] === "number") {
                        const sum = new Decimal(result[index] as number)
                        result[index] = sum.add(Number(cell)).toNumber()
                    }
                }
            )
        })

        return result
    }

</script>

{#if data.length > 1}
    <tr>
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