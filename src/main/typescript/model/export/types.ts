
interface ExportableDocument {
    title: string
    form: ExportableForm
    report: (ExportableTable | ExportableImage)[]
}



interface ExportableForm {
    title: string
    sections: ExportableFormSection[]
}
interface ExportableFormSection {
    title?: string
    fields: ExportableFormField[]
}
interface ExportableFormField {
    title: string
    value: string
}



interface ExportableContent {
    type: "image" | "table"
    title: string
}

interface ExportableTable extends ExportableContent {
    type: "table"
    types: ColumnType[]
    head: ExportableCell[][]
    body: ExportableCell[][]
}
interface ExportableCell {
    value: string
    colspan?: number
    rowspan?: number
}

interface ExportableImage extends ExportableContent {
    type: "image"
    dataURL: string
}