export class TableBody {

    rows: TableRow[]

    constructor(
        private data: MatrixData,
        public types: string[]
    ) {
        this.rows = this.buildRows()
    }

    private buildRows(): TableRow[] {
        return this.data.map((row, index) => ({
            index,
            cells: row.map((cell, cellIndex) => ({
                value: cell,
                type: this.types[cellIndex]
            }))
        }))
    }
}