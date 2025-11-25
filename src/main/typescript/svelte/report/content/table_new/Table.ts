export class Table {

    public types: ("string" | "number" | "boolean")[] = []

    constructor(public head: string[],
                public data: (string | number | boolean | null)[][]) {

    }

    public isSpanned(rowIndex: number, columnIndex: number): boolean {
        return rowIndex > 0
            && this.types[columnIndex] === "string"
            && this.getFullName(rowIndex, columnIndex) !== this.getFullName(rowIndex - 1, columnIndex)
    }

    public getRowspan(rowIndex: number, columnIndex: number): number {
        if (this.types[columnIndex] === "string") {
            const fullName = this.getFullName(rowIndex, columnIndex)
            let count = 1
            for (let i = rowIndex + 1; i < this.data.length; i++) {
                if (this.getFullName(i, columnIndex) === fullName) count++
                else break
            }
            return count
        }
        return 1
    }

    private determineTypes() {
        this.types = this.head.map(() => "string")
        this.data.forEach(row => {
            row.forEach((cell, cellI) => {
                if (cell != null && typeof cell === "number")
                    this.types[cellI] = "number"
                else if (cell != null && typeof cell === "boolean")
                    this.types[cellI] = "boolean"
            })
        })
    }

    private getFullName(rowIndex: number, columnIndex: number): string {
        return this.data
            ?.[rowIndex]
            ?.filter((_, i) => i <= columnIndex && this.types[i] === "string")
            ?.join(" ")
    }
}