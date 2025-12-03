import {ConcreteTableHead} from "./head/TableHead"
import {ConcreteBodyChunk} from "./body/TableBody"

export class ConcreteTable implements Table {

    public types: ColumnType[] = []
    public head:  TableHead
    public body:  BodyChunk

    constructor(private matrix: Matrix,
                public  config: TableConfig,
                private element: HTMLTableElement) {

        // Определение типов столбцов
        this.determineTypes()

        this.head = new ConcreteTableHead(this.matrix.head, this)
        this.body = new ConcreteBodyChunk(config.addOperations ? [] : this.matrix.data, this)
    }

    // Фильтрация и сортировка согласно пользовательским операциям
    public processOperations(operations: ColumnOperation[]) {

        // Фильтрация
        const resultData = this.matrix.data.filter(row =>
            operations.every((oper, i) =>
                !oper.filter || String(row[i]).toLowerCase().includes(oper.filter.toLowerCase()))
        )

        // Сравнение значений для сортировки
        const compareValues = (a: any, b: any, type: ColumnType) =>
            type === 'number' ? Number(a) - Number(b) :
                type === 'string' ? String(a).localeCompare(String(b)) :
                    (a === b ? 0 : a ? 1 : -1)

        // Сортировка
        resultData.sort((a, b) =>
            operations.reduce((diff, oper, i) => diff || !oper.sort ? diff :
                oper.sort === 'asc' ? compareValues(a[i], b[i], this.types[i]) :
                    -compareValues(a[i], b[i], this.types[i]), 0)
        )

        this.body = new ConcreteBodyChunk(resultData, this)
    }

    private determineTypes() {
        this.types = this.matrix.head.map(() => "string")
        this.matrix.data.forEach(row => {
            row.forEach((cell, cellI) => {
                if (cell != null && typeof cell === "number")
                    this.types[cellI] = "number"
                else if (cell != null && typeof cell === "boolean")
                    this.types[cellI] = "boolean"
            })
        })
    }
}