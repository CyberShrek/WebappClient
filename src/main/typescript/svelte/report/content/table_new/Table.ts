import {ConcreteTableHead} from "./head/TableHead"
import {ConcreteBodyChunk} from "./body/TableBody"

export class ConcreteTable implements Table {

    public head:  TableHead
    public pages: TableBodyChunk[]

    constructor(private matrix: Matrix,
                public  config: TableConfig) {

        this.head  = new ConcreteTableHead(this.matrix.head, this)
        this.pages = this.buildPages()
    }

    public get types(): ColumnType[] {
        const types: ColumnType[] = this.matrix.head.map(() => "string")
        this.matrix.data.forEach(row => {
            row.forEach((cell, cellI) => {
                if (cell != null && typeof cell === "number")
                    types[cellI] = "number"
                else if (cell != null && typeof cell === "boolean")
                    types[cellI] = "boolean"
            })
        })
        return types
    }

    public get total(): TableRow {
        return new ConcreteBodyChunk(this.clientData, this).total
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
                oper.sort === 'asc' ? compareValues(a[i], b[i], this.types[i]) :
                    -compareValues(a[i], b[i], this.types[i]), 0)
        )

        this.pages = this.buildPages()
    }

    private buildPages(): typeof this.pages {
        if (!this.config.pagination)
            return [new ConcreteBodyChunk(this.clientData, this)]

        const pages: typeof this.pages = []

        let pageData: MatrixData = [],
            chunkName: string = ""

        this.clientData.forEach(rowData => {
            const currChunkName = String(rowData[0])
            if (pageData.length >= (this.config.pagination ?? 1)
                && currChunkName != chunkName) {
                pages.push(new ConcreteBodyChunk(pageData, this))
                pageData = []
            }
            pageData.push(rowData)
            chunkName = currChunkName
        })
        pages.push(new ConcreteBodyChunk(pageData, this))

        return pages
    }
}