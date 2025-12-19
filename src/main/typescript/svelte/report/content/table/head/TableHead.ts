const splitter = "|"

export class ConcreteTableHead implements TableHead {
    
    public content: TableHead["content"] = []
    
    constructor(
        public table: Table
    ) {
        const separatedAliases: string[][] = table.columns
            .filter(column => column.type != null)
            .map(column => (table.config.headAliases?.[column.name] || column.name).split(splitter))

        // Вставка пустых строк
        separatedAliases.forEach(cells => {
            while (this.content.length < cells.length)
                this.content.push(table.columns.map(_ => null))
        })

        // Первичное заполнение с вертикальной группировкой
        separatedAliases.forEach((cells, i) => {
            cells.forEach((cell, j) => {
                this.content[j][i] = {
                    value: cell,
                    rowspan: 1 + (j === cells.length - 1 ? this.content.length - cells.length : 0),
                    colspan: 1
                }
            })
        })

        // Горизонтальная группировка. Лишние ячейки удаляются
        this.content.forEach(row => {
            const cellsToDelete: number[] = []
            let targetCell: typeof row[number] | null = null
            row.forEach((cell, i) => {
                if (targetCell == null || targetCell.value !== cell?.value) {
                    targetCell = cell
                    return
                }
                if (targetCell && targetCell.value === cell.value && targetCell.rowspan === cell.rowspan){
                    targetCell.colspan = Number(targetCell.colspan) + 1
                    row[i] = null
                }
            })
        })
    }
}