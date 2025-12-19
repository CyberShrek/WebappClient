import {ConcreteTableHead} from "./head/TableHead"
import {ConcreteBodyChunk} from "./body/TableBody"

export class ConcreteTable implements Table {

    public head:    TableHead
    public pages:   TableBodyChunk[]
    public columns: TableColumn[];

    constructor(private matrix: Matrix,
                public readonly config: TableConfig) {

        this.columns = this.buildColumns()
        this.head    = new ConcreteTableHead(this)
        this.pages   = this.buildPages()
    }

    public get total(): TableRow {
        return new ConcreteBodyChunk(this.clientData, this, this.columns).total
    }

    // Фильтрация и сортировка согласно пользовательским операциям
    private clientData: Matrix["data"] = this.matrix.data
    public processOperations(operations: ColumnOperation[]) {

        // Фильтрация
        this.clientData = this.matrix.data.filter(row =>
            operations.every((oper, i) =>
                !oper.filter || String(row[i]).toLowerCase().includes(oper.filter.toLowerCase()))
        )

        // Сравнение значений для сортировки
        const compareValues = (a: any, b: any, type: ColumnType) =>
            type === 'number' ? Number(a) - Number(b) :
                type === 'string' ? String(a).localeCompare(String(b)) :
                    (a === b ? 0 : a ? 1 : -1)

        // Сортировка
        this.clientData.sort((a, b) =>
            operations.reduce((diff, oper, i) => diff || !oper.sort ? diff :
                oper.sort === 'asc' ? compareValues(a[i], b[i], this.columns[i].type) :
                    -compareValues(a[i], b[i], this.columns[i].type), 0)
        )

        this.pages = this.buildPages()
    }

    private buildColumns(): TableColumn[] {
        const columns: TableColumn[] = this.matrix.head.map(name => ({name, type: null}))
        this.matrix.data.forEach(row => {
            row.forEach((cell, cellI) => {
                switch (typeof cell) {
                    case "string" : columns[cellI].type = "string"; break
                    case "number" : columns[cellI].type = (columns[cellI].type === null || columns[cellI].type === "number")  ? "number"  : "string"; break
                    case "boolean": columns[cellI].type = (columns[cellI].type === null || columns[cellI].type === "boolean") ? "boolean" : "string"; break
                }
            })
        })
        return columns
    }

    private buildPages(): typeof this.pages {
        if (!this.config.pagination)
            return [new ConcreteBodyChunk(this.clientData, this, this.columns)]

        const pages: typeof this.pages = []

        let pageData: MatrixData = [],
            chunkName: string = ""

        this.clientData.forEach(rowData => {
            const currChunkName = String(rowData[0])
            if (pageData.length >= (this.config.pagination ?? 1)
                && currChunkName != chunkName) {
                pages.push(new ConcreteBodyChunk(pageData, this, this.columns))
                pageData = []
            }
            pageData.push(rowData)
            chunkName = currChunkName
        })
        pages.push(new ConcreteBodyChunk(pageData, this, this.columns))

        return pages
    }
}