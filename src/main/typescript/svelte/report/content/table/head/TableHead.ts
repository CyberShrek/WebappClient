const splitter = "|"

export class ConcreteTableHead implements TableHead {
    
    public content: TableHead["content"]
    
    constructor(
        private head: Matrix["head"],
        public table: Table
    ) {
        this.content = this.buildContent()
    }

    findColIndex(name: string): number {
        return this.head.findIndex(cell => cell.includes(name))
    }
    findColName(index: number): string {
        return this.head[index]
    }

    private buildContent(): TableHead["content"] {
        const separatedHead: typeof this.head[] = this.head.filter((_, index) =>
            !!this.table.types[index]).map(cell => cell.split(splitter))
        const content: typeof this.content = []

        // Вставка пустых строк
        separatedHead.forEach(cells => {
            while (content.length < cells.length)
                content.push([])
        })

        // Первичное заполнение с вертикальной группировкой
        separatedHead.forEach((cells, i) => {
            cells.forEach((cell, j) => {
                content[j].push({
                    value: cell,
                    rowspan: 1 + (j === cells.length - 1 ? content.length - cells.length : 0),
                    colspan: 1
                })
            })
        })

        // Горизонтальная группировка. Лишние ячейки удаляются
        content.forEach(row => {
            const cellsToDelete: number[] = []
            let targetCell: typeof row[number] | null = null
            row.forEach((cell, i) => {
                if (targetCell == null || targetCell.value !== cell.value) {
                    targetCell = cell
                    return
                }
                if (targetCell.value === cell.value && targetCell.rowspan === cell.rowspan){
                    targetCell.colspan++
                    cellsToDelete.push(i)
                }
            })
            cellsToDelete.reverse().forEach(i => row.splice(i, 1))
        })

        return content
    }
}