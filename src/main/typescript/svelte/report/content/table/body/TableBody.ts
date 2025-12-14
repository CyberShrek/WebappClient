import Decimal from "decimal.js-light";

export class ConcreteBodyChunk implements TableBodyChunk {

    type: "chunk"
        = "chunk"

    constructor(private data:   MatrixData,
                public readonly table:   Table,
                public readonly nesting: number = 0) {}

    private _content: typeof this.content = []
    get content(): (TableBodyChunk | TableRow)[] {
        if (this._content.length == 0) {
            if (!(this.table.config.chunking && this.table.types[this.nesting + 1] === "string"))
                this.data.forEach(row =>
                    this._content.push(new ConcreteTableRow(row, this)))
            else
                this.buildDataChunks().forEach(chunkData =>
                    this._content.push(chunkData.length > 1
                        ? new ConcreteBodyChunk(chunkData, this.table, this.nesting + 1)
                        : new ConcreteTableRow(chunkData[0], this))
                )
        }
        return this._content
    }
    set content(content) {
        this._content = content
    }

    private _totalRow?: TableRow
    get total(): TableRow {
        if (this._totalRow == null) {
            this._totalRow = this.calculateTotalRow()
        }
        return this._totalRow
    }

    private _rowspan: number = -1
    get rowspan(): number {
        if (this._rowspan == -1) {
            this._rowspan = (
                this.content.reduce((sum, child) =>
                        sum + (child.type == "chunk" ? child.rowspan : 1), 0)
            ) + (
                Number(this.data.length > 1)
                        ? this.table.config.chunking === "simple"
                        ? 1
                        : 2
                    : 0
            )
        }
        return this._rowspan
    }

    private _collapsed: boolean = false
    set collapsed(collapsed: boolean) {
        this.content.forEach(content => content.collapsed = collapsed)
        this._collapsed = collapsed
    }
    get collapsed(): boolean {
        return this._collapsed
    }

    // Дробление сырых данных
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
                case "string" : return index == this.nesting ? "Итого" : ""
                case "number" : return 0
                default       : return ""
            }
        }) : []
        this.data.forEach(row => {
            row.forEach((cell, index) => {
                if (this.table.types[index] === "number" && typeof cell === "number") {
                    const sum = new Decimal(values[index] as number)
                    values[index] = sum.add(Number(cell)).toNumber()
                }
            })
        })
        return new ConcreteTableRow(values, this)
    }
}

class ConcreteTableRow implements TableRow {

    type: "row"
        = "row"

    public cells: TableCell[]

    constructor(private values: TableCell["value"][] = [],
                public readonly chunk: TableBodyChunk) {

        this.cells = values.map(
            (value, cellIndex) =>
                new ConcreteTableCell(cellIndex, chunk.table.head.findColName(cellIndex), value, chunk.table.types[cellIndex], this)
        )
    }

    checked?: boolean | undefined;

    findCellByColName(name: string): TableCell | null {
        return this.cells[this.chunk.table.head.findColIndex(name)]
    }
}

class ConcreteTableCell implements TableCell {
    constructor(public readonly index: number,
                public readonly column: string,
                public readonly value: TableCell["value"],
                public readonly type:  ColumnType,
                public readonly row:   TableRow) {}

    get hidden(): boolean {
        const chunk = this.row.chunk
        return !this.type || this.index < chunk.nesting
    }
}