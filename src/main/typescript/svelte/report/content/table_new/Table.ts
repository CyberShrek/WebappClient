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
        this.body = new ConcreteBodyChunk(this.matrix.data, this)
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