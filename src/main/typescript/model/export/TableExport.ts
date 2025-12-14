
export class TableExport implements ExportableTable {
    readonly type: "table" = "table"

    readonly types: ColumnType[]
    readonly head: ExportableCell[][]
    readonly body: ExportableCell[][]
    readonly foot: ExportableCell[][]

    constructor(
        readonly title: string,
        table: Table
    ) {
        this.types = table.types.filter(type => !!type)
        this.head  = table.head.content
        this.body  = this.buildBody(table)
        this.foot  = this.buildFoot(table)
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
            else if (content.type === "chunk")
                content.content.forEach(collectRows)
        }
        const body: ExportableCell[][] = []

        table.pages.forEach(page => {
            page.content.forEach(collectRows)
        })

        return body
    }

    buildFoot(table: Table): typeof this.foot {
        return [table.total.cells.filter(cell => !!cell.type).map(cell => {
            return {
                value: String(cell.value)
            }
        })]
    }
}