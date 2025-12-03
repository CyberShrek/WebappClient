import Decimal from "decimal.js-light";

export class ConcreteBodyChunk implements BodyChunk {

    constructor(private data: Matrix["data"] | null,
                public table: Table,
                private _rows: TableRow[] = [],
                public nesting: number = 0) {}

    get rows(): TableRow[] {
        if (this._rows.length === 0 && this.data != null) {
            this._rows = this.buildRows(this.data)
        }
        return this._rows
    }

    private _totalRow: TableRow | null = null
    get totalRow(): TableRow {
        if (this._totalRow == null) {
            this._totalRow = this.calculateTotalRow()
        }
        return this._totalRow
    }

    private _childChunks: BodyChunk[] = []
    get childChunks(): BodyChunk[] {
        if (this._childChunks.length === 0 && this.table.types[this.nesting + 1] === "string") {
            this._childChunks = this.buildChildChunks()
        }
        return this._childChunks
    }

    // Дробление строк на чанки
    private buildChildChunks(): BodyChunk[] {
        const chunks: BodyChunk[] = [],
            nesting = this.nesting + 1

        let lastName: string
        let lastChunk: BodyChunk = new ConcreteBodyChunk(null, this.table, [], nesting)

        this.rows.forEach(row => {
            const name = row.cells[this.nesting]?.value as string
            if (name !== lastName) {
                if (lastChunk.rows.length > 0) {
                    chunks.push(lastChunk)
                }
                lastChunk = new ConcreteBodyChunk(null, this.table, [row], nesting)
            } else {
                lastChunk.rows.push(row)
            }
            lastName = name
        })
        if (lastChunk.rows.length > 0) {
            chunks.push(lastChunk)
        }
        return chunks
    }

    // Подсчет итогов
    private calculateTotalRow(): TableRow {
        const values: (string | number)[] = this.rows[0] ? this.rows[0].cells.map((cell, index) => {
            switch (cell.type) {
                case "string" : return String(this.rows[0]?.cells[index]?.value)
                case "number" : return 0
                case "boolean": return ""
            }
        }) : []
        this.rows.forEach(row => {
            row.cells.forEach((cell, index) => {
                    if (cell.type === "number") {
                        const sum = new Decimal(values[index] as number)
                        values[index] = sum.add(Number(cell.value)).toNumber()
                    }
                }
            )
        })
        return new ConcreteTableRow(values, this, 0)
    }

    private buildRows(data: Matrix["data"]): TableRow[] {
        return data.map((row, index) => new ConcreteTableRow(row, this, index))
    }
}

class ConcreteTableRow implements TableRow {

    public cells: TableCell[]

    constructor(private values: TableCell["value"][],
                public chunk: BodyChunk,
                public index: number) {

        this.cells = values.map(
            (value, cellIndex) => new ConcreteTableCell(cellIndex, value, chunk.table.types[cellIndex], this)
        )
    }

    findCellByColName(name: string): TableCell | null {
        return this.cells[this.chunk.table.head.findColIndex(name)]
    }
}

class ConcreteTableCell implements TableCell {
    constructor(public index: number,
                public value: TableCell["value"],
                public type:  ColumnType,
                public row:   TableRow) {}
}