
export class TableExport implements ExportableTable {
    readonly type: "table" = "table"

    readonly types: ColumnType[]
    readonly head: ExportableCell[][]
    readonly body: ExportableCell[][]

    constructor(
        readonly title: string,
        table: Table
    ) {
        this.types = table.columnTypes.filter(type => !!type)
        this.head  = table.head.content
        this.body  = this.buildBody(table)
    }

    buildBody(table: Table): typeof this.body {
        function collectRow (row: TableRow)  {
            body.push(row.cells.filter(cell => !!cell.type).map(cell => {
                return {
                    value: String(cell.value)
                }
            }))
        }
        function collectRows (content: TableBodyChunk | TableRow) {
            if (content.type === "row")
                collectRow(content)
            else if (content.type === "chunk") {
                content.content.forEach(collectRows)
                if (table.config.chunking && table.config.chunking != "simple") {
                    collectRow(content.total)
                }
            }
        }

        const body: ExportableCell[][] = []

        table.pages.forEach(page => {
            page.content.forEach(collectRows)
        })

        if (table.config.chunking)
            this.groupBodyRows(body)

        if (table.config.addTotal)
            collectRow(table.total)

        return body
    }

    private groupBodyRows(body: ExportableCell[][]) {
        for (let columnIndex = 0;
             this.types[columnIndex + 1] === "string";
             columnIndex++) {
            let groupCell: ExportableCell = null
            body.forEach((cells) => {
                const cell = cells[columnIndex]
                if (groupCell != null &&
                    (cell == null || cell?.value == groupCell?.value || cell?.value == "" || cell?.value == null) &&
                    (columnIndex == 0 || cells[columnIndex - 1] == null)) {
                    groupCell.rowspan = (groupCell.rowspan || 1) + 1
                    cells[columnIndex] = null
                } else if (cell != null) {
                    groupCell = cell
                }
            })
        }
    }
}