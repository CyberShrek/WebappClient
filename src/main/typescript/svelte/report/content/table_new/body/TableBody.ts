import Decimal from "decimal.js-light";

export class ConcreteBodyChunk implements TableBodyChunk {

    constructor(private data:   Matrix["data"],
                public table:   Table,
                public nesting: number = 0) {}

    get childChunks(): TableBodyChunk[] {
        return this.table.types[this.nesting + 1] === "string"
            ? this.buildChildChunks()
            : []
    }

    private _rows:  TableRow[] = []
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

    private _rowspan: number = -1
    get rowspan(): number {
        if (this._rowspan == -1) {
            const chunking = this.table.config.chunking
            this._rowspan = (
                this.childChunks.length > 0
                    ? this.childChunks.reduce((sum, childChunk) => sum + childChunk.rowspan, 0)
                    : this.rows.length
            ) + (
                Number(this.rows.length > 1)
                    ? chunking == "totals" || chunking == "full"
                        ? 2
                        : 1
                    : 0
            )
        }
        return this._rowspan
    }

    // Рекурсивное дробление на чанки
    private buildChildChunks(): TableBodyChunk[] {
        const chunks: TableBodyChunk[] = [],
            createChunk = (data: Matrix["data"] ) =>
                new ConcreteBodyChunk(data, this.table, this.nesting + 1)

        let chunkName: string         = this.data[0][this.nesting] as string,
            chunkData: Matrix["data"] = []

        this.data.forEach(row => {
            const currentName = row[this.nesting] as string
            if (currentName !== chunkName) {
                chunks.push(createChunk(chunkData))
                chunkData = []
            }
            chunkData.push(row)
            chunkName = currentName
        })
        chunks.push(createChunk(chunkData))
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
                public chunk: TableBodyChunk,
                public index: number) {

        this.cells = values.map(
            (value, cellIndex) =>
                new ConcreteTableCell(cellIndex, value, chunk.table.types[cellIndex], this)
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

    get spanned(): boolean {
        const chunk = this.row.chunk
        return false

        //this.index < chunk.nesting
        // return this.index < chunk.nesting
        //     || this.index === chunk.nesting - 1 && chunk.rows.length === 1
    }
}