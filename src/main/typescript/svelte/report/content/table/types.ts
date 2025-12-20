type TableConfig = {
    chunking?: ChunkingType
    pagination?:     number
    addOperations?: boolean
    addTotal?:      boolean
    addCheckboxes?: boolean
    structure?: {
        [columnName: string]:[
            alias?: string,
            valueCallback?: (cell: TableCell) => CellValue
        ]
    }
}

interface Table {
    config:  TableConfig
    head:    TableHead
    columns: TableColumn[]
    pages:   TableBodyChunk[]
    total:   TableRow
}

type TableHead = ({value: string, rowspan?: number, colspan?: number} | null)[][]

interface TableBodyChunk {
    type:        "chunk"
    columns: TableColumn[]
    content: (TableRow | TableBodyChunk)[]
    head:      TableRow,
    total:     TableRow
    table:        Table
    length:      number
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
    value: CellValue
    hidden?: boolean

    column: TableColumn
    row: TableRow
}

interface TableColumn {
    name: string
    type: ColumnType
    // cells: TableCell[]
}
type CellValue = string | number | boolean | null

type ColumnType = "string" | "number" | "boolean" | null

type ColumnOperation = {
    filter: string
    sort: "asc" | "desc" | null
}

type ChunkingType = "simple" | "totals" | "collapsable" | "full" | null