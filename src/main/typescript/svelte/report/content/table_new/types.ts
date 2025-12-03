type TableConfig = {
    chunking?: ChunkingType
    addOperations?: boolean
    addTotal?:      boolean
    addCheckboxes?: boolean
}

interface Table {
    config: TableConfig
    head: TableHead
    body: BodyChunk
    types: ColumnType[]

    processOperations(operations: ColumnOperation[]): void
}

interface TableHead {
    content: {name: string, rowspan: number, colspan: number}[][]
    table: Table

    findColIndex(name: string): number
}

interface BodyChunk {
    rows:     TableRow[]
    totalRow: TableRow
    table: Table

    childChunks: BodyChunk[]
    nesting: number

    collapsed?: boolean
}
interface TableRow {
    index: number
    cells: TableCell[]

    chunk: BodyChunk

    checked?: boolean

    findCellByColName(name: string): TableCell | null
}
interface TableCell {
    index: number
    value: string | number | boolean | null
    type: ColumnType

    row: TableRow
}

type ColumnType = "string" | "number" | "boolean"

type ColumnOperation = {
    filter: string
    sort: "asc" | "desc" | null
}

type ChunkingType = "simple" | "totals" | "collapsable" | "full" | null