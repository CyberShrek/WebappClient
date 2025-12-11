
export class TableExport implements ExportableTable {
    readonly type: "table" = "table"

    readonly types: ColumnType[]      = this.table.types.filter(type => !!type)
    readonly head: ExportableCell[][] = this.table.head.content
    readonly body: ExportableCell[][] = this.buildBody()

    constructor(
        readonly title: string,
        private table: Table
    ) {}

    private buildBody(): ExportableCell[][] {
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

        this.table.pages.forEach(page => {
            page.content.forEach(collectRows)
        })

        return body
    }
}