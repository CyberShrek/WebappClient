type TableConfig = {
    chunking?: ChunkingType
    addOperations?: boolean
    addTotal?:      boolean
}

type TableRow = {
    index: number
    cells: TableCell[]
}
type TableCell = {
    value: string | number | boolean | null
    type: ColumnType
}

type ColumnType = "string" | "number" | "boolean"

type ColumnOperation = {
    filter: string
    sort: "asc" | "desc" | null
}

type ChunkingType = "simple" | "totals" | "collapsable" | "full" | null