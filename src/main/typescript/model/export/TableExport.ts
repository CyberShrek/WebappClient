
export class TableExport implements ExportableTable {
    readonly type: "table" = "table"

    readonly types: ColumnType[]
    readonly head: ExportableCell[][]
    readonly body: ExportableCell[][]

    constructor(
        readonly title: string,
        table: Table
    ) {
        this.types = table.types.filter(type => !!type)
        this.head  = table.head.content
        this.body  = buildBody(table.pages)
    }

    private
}

function buildBody(pages: TableBodyChunk[]): ExportableCell[][] {
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

    pages.forEach(page => {
        page.content.forEach(collectRows)
    })

    return body
}