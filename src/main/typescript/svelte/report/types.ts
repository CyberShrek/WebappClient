type Matrix = {
    head: string[]
    data: MatrixData
}

type MatrixData = (string | number | boolean | null)[][]

type RGBA = [number, number, number, number]

type ExportableFormCollector = (() => ExportableDocument["form"]) | null
type ExportableReportCollector = (() => ExportableDocument["report"])[] | null
type ExportCollector = (() => ExportableDocument) | null