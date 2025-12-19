type TableConfig = {
    chunking?: ChunkingType
    pagination?:     number
    addOperations?: boolean
    addTotal?:      boolean
    addCheckboxes?: boolean
    headAliases?: {
        [columnName: string]: string
    }
}

interface Table {
    config:  TableConfig
    head:    TableHead
    columns: TableColumn[]
    pages:   TableBodyChunk[]
    total:   TableRow

    processOperations(operations: ColumnOperation[]): void
}

interface TableHead {
    content: ({value: string, rowspan?: number, colspan?: number} | null)[][]
    table: Table
}

interface TableBodyChunk {
    type:        "chunk"
    columns: TableColumn[]
    content: (TableRow | TableBodyChunk)[]
    head:      TableRow,
    total:     TableRow
    table:        Table
    nesting:     number
    rowspan:     number
    collapsed?: boolean
}
interface TableRow {
    type: "row"
    cells: TableCells
    chunk: TableBodyChunk
    checked?:   boolean
    collapsed?: boolean
}
type TableCells = {
    [columnName: string]: TableCell
}
interface TableCell {
    index: number
    value: string | number | boolean | null
    hidden?: boolean

    column: TableColumn
    row: TableRow
}

interface TableColumn {
    name: string
    type: ColumnType
    // cells: TableCell[]
}
type ColumnType = "string" | "number" | "boolean" | null

type ColumnOperation = {
    filter: string
    sort: "asc" | "desc" | null
}

type ChunkingType = "simple" | "totals" | "collapsable" | "full" | null