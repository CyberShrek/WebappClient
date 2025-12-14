
interface ExportableDocument {
    title: string
    form:  {
        [section: string]: {
            [field: string]: string
        }
    }
    report: (ExportableTable | ExportableImage)[]
}

type FormExport = {
    [section: string]: {
        [field: string]: string
    }
}


interface ExportableReport {
    type: "image" | "table"
    title: string
}

interface ExportableTable extends ExportableReport {
    type: "table"
    types: ColumnType[]
    head: ExportableCell[][]
    body: ExportableCell[][]
    foot: ExportableCell[][]
}
type ExportableCell = {
    value: string
    colspan?: number
    rowspan?: number
} | null

interface ExportableImage extends ExportableReport {
    type: "image"
    base64: string
}