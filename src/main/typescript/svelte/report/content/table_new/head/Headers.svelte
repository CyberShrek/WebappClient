<script lang="ts">

    export let
        head: string[],
        splitter = "|"

    function prepareHead(): {name: string, rowspan: number, colspan: number}[][] {
        const separatedHead: typeof head[] = head.map(cell => cell.split(splitter))
        const result: {name: string, rowspan: number, colspan: number}[][] = []

        // Вставка пустых строк
        separatedHead.forEach(cells => {
            while (result.length < cells.length)
                result.push([])
        })

        // Первичное заполнение с вертикальной группировкой
        separatedHead.forEach((cells, i) => {
            cells.forEach((cell, j) => {
                result[j].push({
                    name: cell,
                    rowspan: 1 + (j === cells.length - 1 ? result.length - cells.length : 0),
                    colspan: 1
                })
            })
        })

        // Горизонтальная группировка. Лишние ячейки удаляются
        result.forEach(row => {
            const cellsToDelete: number[] = []
            let targetCell: typeof row[number] | null = null
            row.forEach((cell, i) => {
                if (targetCell == null || targetCell.name !== cell.name) {
                    targetCell = cell
                    return
                }
                if (targetCell.name === cell.name && targetCell.rowspan === cell.rowspan){
                    targetCell.colspan++
                    cellsToDelete.push(i)
                }
            })
            cellsToDelete.reverse().forEach(i => row.splice(i, 1))
        })

        return result
    }

</script>

{#each prepareHead() as row, i}
    <tr>
        {#each row as cell}
            <th rowspan={cell.rowspan}
                colspan={cell.colspan}>
                {cell.name}
            </th>
        {/each}
    </tr>
{/each}