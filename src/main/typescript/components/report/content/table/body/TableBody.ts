import Decimal from "decimal.js-light";

export class ConcreteBodyChunk implements TableBodyChunk {

    type: "chunk"
        = "chunk"

    constructor(private data:   MatrixData,
                public readonly table:   Table,
                public readonly columns: TableColumn[],
                public readonly nesting: number = 0) {
        this.head = new ConcreteTableRow(data[0], this)
    }

    head: TableRow;

    private _content: typeof this.content = []
    get content(): (TableBodyChunk | TableRow)[] {
        if (this._content.length == 0) {
            if (!(this.table.config.chunking && this.columns[this.nesting + 1].type === "string"))
                this.data.forEach(row =>
                    this._content.push(new ConcreteTableRow(row, this)))
            else
                this.buildDataChunks().forEach(chunkData =>
                    this._content.push(chunkData.length > 1
                        ? new ConcreteBodyChunk(chunkData, this.table, this.columns,this.nesting + 1)
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

    get length(): number {
        return this.data.length
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
            switch (this.columns[index].type) {
                case "string" : return index == this.nesting ? "Итого" : ""
                case "number" : return 0
                default       : return ""
            }
        }) : []
        this.data.forEach(row => {
            row.forEach((cell, index) => {
                if (this.columns[index].type === "number" && typeof cell === "number") {
                    const sum = new Decimal(values[index] as number)
                    values[index] = sum.add(Number(cell)).toNumber()
                }
            })
        })
        return new ConcreteTableRow(values, this, true)
    }
}

class ConcreteTableRow implements TableRow {

    type: "row"
        = "row"

    public cells: TableCells

    constructor(values: TableCell["value"][] = [],
                public readonly chunk: TableBodyChunk,
                public readonly isTotal: boolean = false) {

        const virtualCells: typeof this.cells = {}
        values.forEach(
            (value, cellIndex) => {
                virtualCells[chunk.columns[cellIndex].name] =
                    new ConcreteTableCell(cellIndex, value, chunk.columns[cellIndex], this)
            }
        )
        const cells: typeof this.cells = {}
        this.cells = virtualCells
        Object.entries(virtualCells).forEach(([name, virtualCell]) => {
            cells[name] = new ConcreteTableCell(
                virtualCell.index,
                this.chunk.table.config.structure?.[name]?.[1]?.(virtualCell) ?? virtualCell.value,
                virtualCell.column,
                this)
        })
        this.cells = cells
    }

    collapsed?: boolean | undefined;

    checked?: boolean | undefined;
}

class ConcreteTableCell implements TableCell {
    constructor(public readonly index:  number,
                public readonly value:  CellValue,
                public readonly column: TableColumn,
                public readonly row:    TableRow) {}

    get hidden(): boolean {
        const chunk = this.row.chunk
        return !this.column.type || this.index < chunk.nesting
    }
}