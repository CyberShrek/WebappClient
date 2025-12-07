type TableConfig = {
    chunking?: ChunkingType
    pagination?:     number
    addOperations?: boolean
    addTotal?:      boolean
    addCheckboxes?: boolean
}

interface Table {
    config: TableConfig
    head:   TableHead
    pages:  TableBodyChunk[]
    types:  ColumnType[]
    total:  TableRow

    processOperations(operations: ColumnOperation[]): void
}

interface TableHead {
    content: {value: string, rowspan: number, colspan: number}[][]
    table: Table

    findColIndex(name: string): number
}

interface TableBodyChunk {
    type: "chunk"
    content: (TableRow | TableBodyChunk)[]
    total: TableRow
    table:    Table
    nesting:     number
    rowspan:     number

    collapsed?: boolean
}
interface TableRow {
    type: "row"
    cells: TableCell[]
    chunk: TableBodyChunk
    checked?: boolean
    collapsed?: boolean
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