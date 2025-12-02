import {TableBody} from "./body/TableBody"
import {TableHead} from "./head/TableHead"

export class Table {

    public types: ColumnType[] = []
    public head:  TableHead
    public body:  TableBody

    constructor(private matrix: Matrix,
                public  config: TableConfig,
                public element: HTMLTableElement) {

        // Определение типов столбцов
        this.determineTypes()

    }

    // Группировка заголовков чанков по rowspan
    respan() {
        for (let nesting = 0; types[nesting + 1] === "string"; nesting++) {
            let chunkHead: HTMLTableCellElement | null = null
            for (let row of bodyElement.rows) {
                const cell = row.cells.item(nesting + (hasCheckboxes ? 1 : 0))
                if (cell == null)
                    continue

                if (cell.textContent?.trim() !== '') {
                    chunkHead = cell
                    chunkHead.style.display = ''
                    chunkHead.rowSpan = 1
                }
                else if (chunkHead != null) {
                    chunkHead.rowSpan++
                    cell.style.display = "none"
                    cell.rowSpan = 1
                }
            }
        }
    }

    private determineTypes() {
        this.types = this.matrix.head.map(() => "string")
        this.matrix.data.forEach(row => {
            row.forEach((cell, cellI) => {
                if (cell != null && typeof cell === "number")
                    this.types[cellI] = "number"
                else if (cell != null && typeof cell === "boolean")
                    this.types[cellI] = "boolean"
            })
        })
    }
}