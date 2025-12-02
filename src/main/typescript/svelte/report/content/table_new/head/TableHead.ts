const splitter = "|"

export class TableHead {
    
    public content: {name: string, rowspan: number, colspan: number}[][]
    
    constructor(
        private head: string[],
        public types: string[]
    ) {
        this.content = this.buildContent()
    }

    private buildContent(): {name: string, rowspan: number, colspan: number}[][] {
        const separatedHead: typeof separatedHead[] = this.head.map(cell => cell.split(splitter))
        const content: typeof this.content[] = []

        // Вставка пустых строк
        separatedHead.forEach(cells => {
            while (content.length < cells.length)
                content.push([])
        })

        // Первичное заполнение с вертикальной группировкой
        separatedHead.forEach((cells, i) => {
            cells.forEach((cell, j) => {
                content[j].push({
                    name: cell,
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

        return content
    }
}