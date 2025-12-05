import Decimal from "decimal.js-light";

export class ConcreteBodyChunk implements TableBodyChunk {

    type: "chunk" = "chunk"

    constructor(private data:   MatrixData,
                public table:   Table,
                public nesting: number = 0) {}

    get content(): (TableBodyChunk | TableRow)[] {
        if (!this.table.config.chunking)
            return this.data.map(row => new ConcreteTableRow(row, this))

        const content: (TableBodyChunk | TableRow)[] = []

        this.buildDataChunks().forEach(chunkData =>
            content.push(chunkData.length > 1
                ? new ConcreteBodyChunk(chunkData, this.table, this.nesting + 1)
                : new ConcreteTableRow(chunkData[0], this))
        )

        return content
    }

    private _totalRow: TableRow | null = null
    get total(): TableRow {
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
                this.content.reduce((sum, child) =>
                        sum + (child.type == "chunk" ? child.rowspan : 1), 0)
            ) + (
                Number(this.data.length > 1)
                    ? chunking == "totals" || chunking == "full"
                        ? 2
                        : 1
                    : 0
            )
        }
        return this._rowspan
    }

    // Рекурсивное дробление сырых данных
    private buildDataChunks(): MatrixData[] {
        const dataChunks: MatrixData[] = []

        let chunkName: string     = this.data[0]?.[this.nesting] as string,
            chunkData: MatrixData = []

        this.data.forEach(row => {
            const currentName = row[this.nesting] as string
            if (currentName !== chunkName) {
                dataChunks.push(chunkData)
                chunkData = []
            }
            chunkData.push(row)
            chunkName = currentName
        })
        dataChunks.push(chunkData)
        return dataChunks
    }

    // Подсчет итогов
    private calculateTotalRow(): TableRow {
        const rowData = this.data[0]
        const values: (string | number)[] = rowData ? rowData.map((cell, index) => {
            switch (this.table.types[index]) {
                case "string" : return String(rowData[index])
                case "number" : return 0
                case "boolean": return ""
            }
        }) : []
        this.data.forEach(row => {
            row.forEach((cell, index) => {
                    if (this.table.types[index] === "number") {
                        const sum = new Decimal(values[index] as number)
                        values[index] = sum.add(Number(cell)).toNumber()
                    }
                }
            )
        })
        return new ConcreteTableRow(values, this)
    }
}

class ConcreteTableRow implements TableRow {

    type: "row" = "row"

    public cells: TableCell[]

    constructor(private values: TableCell["value"][] = [],
                public chunk: TableBodyChunk) {

        this.cells = values.map(
            (value, cellIndex) =>
                new ConcreteTableCell(cellIndex, value, chunk.table.types[cellIndex], this)
        )
    }

    checked?: boolean | undefined;

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
        return this.index < chunk.nesting
        // return false
    }
}