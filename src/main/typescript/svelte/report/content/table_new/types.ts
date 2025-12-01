type ColumnType = "string" | "number" | "boolean"

type ColumnOperation = {
    filter: string
    sort: "asc" | "desc" | null
}

type ChunkingType = "none" | "simple" | "totals" | "collapsable" | "full"