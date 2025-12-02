import Decimal from "decimal.js-light";

export class Chunk {

    public totalRow: TableRow

    constructor(public rows: TableRow[],
                public chunking: ChunkingType = null,
                public nesting: number = 0) {}

    // Дробление строк на чанки
    public buildChunks(): Chunk[] {
        const chunks = [],
              nesting = this.nesting + 1

        let lastName: string
        let lastChunk: Chunk = new Chunk([], nesting)

        rows.forEach(row => {
            const name = row.cells[this.nesting]?.value as string
            if (name !== lastName) {
                if (lastChunk.rows.length > 0) {
                    chunks.push(lastChunk)
                }
                lastChunk = new Chunk([row], nesting)
            } else {
                lastChunk.rows.push(row)
            }
            lastName = name
        })
        if (lastChunk.length > 0) {
            chunks.push(lastChunk)
        }
        return chunks
    }

    // Подсчет итогов
    calculateTotalValues(): (string | number)[] {
        const result: (string | number)[] = rows[0]?.cells.map((cell, index) => {
            switch (cell.type) {
                case "string" : return index === nesting ? String(rows[0]?.cells[index]?.value) : index === nesting + 1 ? "Итого" : ""
                case "number" : return 0
                case "boolean": return ""
            }
        })
        rows.forEach(row => {
            row.cells.forEach((cell, index) => {
                    if (index > nesting && cell.type === "number") {
                        const sum = new Decimal(result[index] as number)
                        result[index] = sum.add(Number(cell)).toNumber()
                    }
                }
            )
        })

        return result
    }
}