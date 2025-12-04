type TableConfig = {
    chunking?: ChunkingType
    addOperations?: boolean
    addTotal?:      boolean
    addCheckboxes?: boolean
}

interface Table {
    config: TableConfig
    head:     TableHead
    body:     TableBodyChunk
    types: ColumnType[]

    processOperations(operations: ColumnOperation[]): void
}

interface TableHead {
    content: {value: string, rowspan: number, colspan: number}[][]
    table: Table

    findColIndex(name: string): number
}

interface TableBodyChunk {
    rows:     TableRow[]
    totalRow: TableRow
    table:    Table

    childChunks: TableBodyChunk[]
    nesting:     number
    rowspan:      number

    collapsed?: boolean
}
interface TableRow {
    index: number
    cells: TableCell[]

    chunk: TableBodyChunk

    checked?: boolean

    findCellByColName(name: string): TableCell | null
}
interface TableCell {
    index: number
    value: string | number | boolean | null
    type: ColumnType

    spanned?: boolean

    row: TableRow
}

type ColumnType = "string" | "number" | "boolean"

type ColumnOperation = {
    filter: string
    sort: "asc" | "desc" | null
}

type ChunkingType = "simple" | "totals" | "collapsable" | "full" | null