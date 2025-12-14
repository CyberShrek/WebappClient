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

        const filteredHead:  typeof this.head   = this.head.filter((_, index) => !!this.table.types[index])
        const separatedHead: typeof this.head[] = filteredHead.map(cell => cell.split(splitter))
        const content: typeof this.content = []

        // Вставка пустых строк
        separatedHead.forEach(cells => {
            while (content.length < cells.length)
                content.push(filteredHead.map(_ => null))
        })

        // Первичное заполнение с вертикальной группировкой
        separatedHead.forEach((cells, i) => {
            cells.forEach((cell, j) => {
                content[j][i] = {
                    value: cell,
                    rowspan: 1 + (j === cells.length - 1 ? content.length - cells.length : 0),
                    colspan: 1
                }
            })
        })

        // Горизонтальная группировка. Лишние ячейки удаляются
        content.forEach(row => {
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


        console.log("head content", content)

        return content
    }
}