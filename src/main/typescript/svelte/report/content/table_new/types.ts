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
}

interface TableHead {
    content: {name: string, rowspan: number, colspan: number}[][]
    table: Table
}

interface BodyChunk {
    rows:     TableRow[]
    totalRow: TableRow
    table: Table

    childChunks: BodyChunk[]
    nesting: number
}
interface TableRow {
    index: number
    cells: TableCell[]

    findCellByColName(name: string): TableCell | null

    chunk: BodyChunk
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