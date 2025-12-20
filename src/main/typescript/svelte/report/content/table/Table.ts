import {ConcreteBodyChunk} from "./body/TableBody"

export class ConcreteTable implements Table {

    public head:    TableHead
    public pages:   TableBodyChunk[]
    public columns: TableColumn[]

    private matrix: Matrix
    constructor(matrix: Matrix,
                public readonly config: TableConfig) {

        this.matrix     = this.restructureMatrix(matrix)
        this.clientData = this.matrix.data
        this.columns    = this.buildColumns()
        this.head       = this.buildHead()
        this.pages      = this.buildPages()
    }

    public get total(): TableRow {
        return new ConcreteBodyChunk(this.clientData, this, this.columns).total
    }

    // Фильтрация и сортировка согласно пользовательским операциям
    private clientData: MatrixData
    public processOperations(operations: ColumnOperation[]) {

        // Фильтрация
        this.clientData = this.matrix.data.filter(row =>
            operations.every((oper, i) =>
                !oper.filter || String(row[i]).toLowerCase().includes(oper.filter.toLowerCase()))
        )

        // Сравнение значений для сортировки
        const compareValues = (a: any, b: any, type: ColumnType) =>
            type === 'number' ? Number(a) - Number(b) :
                type === 'string' ? String(a).localeCompare(String(b)) :
                    (a === b ? 0 : a ? 1 : -1)

        // Сортировка
        this.clientData.sort((a, b) =>
            operations.reduce((diff, oper, i) => diff || !oper.sort ? diff :
                oper.sort === 'asc' ? compareValues(a[i], b[i], this.columns[i].type) :
                    -compareValues(a[i], b[i], this.columns[i].type), 0)
        )

        this.pages = this.buildPages()
    }

    private restructureMatrix(matrix: Matrix): Matrix {
        if (!this.config.structure) return matrix;

        const restructured: Matrix = {
            head: Object.keys(this.config.structure),
            data: []
        };

        // Добавляем отсутствующие столбцы из исходной матрицы
        matrix.head.forEach(name => {
            if (!restructured.head.includes(name)) {
                restructured.head.push(name);
            }
        });

        // Создаем индексы для каждого столбца в restructured.head, указывая на его позицию в исходной матрице
        const indices = restructured.head.map(name => matrix.head.indexOf(name));

        // Перестраиваем данные, используя индексы (заменяем -1 на null для новых столбцов)
        matrix.data.forEach(row => {
            restructured.data.push(indices.map(index => index !== -1 ? row[index] : null));
        });

        return restructured;
    }

    private buildColumns(): typeof this.columns {
        const columns: TableColumn[] = this.matrix.head.map(name => ({name, type: null}))
        this.matrix.data.forEach(row => {
            row.forEach((cell, cellI) => {
                if (this.config.structure && !Object.keys(this.config.structure).includes(this.matrix.head[cellI])) return
                switch (typeof cell) {
                    case "string" : columns[cellI].type = "string"; break
                    case "number" : columns[cellI].type = (columns[cellI].type === null || columns[cellI].type === "number")  ? "number"  : "string"; break
                    case "boolean": columns[cellI].type = (columns[cellI].type === null || columns[cellI].type === "boolean") ? "boolean" : "string"; break
                }
            })
        })
        return columns
    }

    private buildHead(): typeof this.head {

        const head: typeof this.head = []
        const separatedAliases: string[][] = this.columns
            .filter(column => column.type != null)
            .map(column => (this.config.structure?.[column.name]?.[0] || column.name).split("|"))

        // Вставка пустых строк
        separatedAliases.forEach(cells => {
            while (head.length < cells.length)
                head.push(this.columns.map(_ => null))
        })

        // Первичное заполнение с вертикальной группировкой
        separatedAliases.forEach((cells, i) => {
            cells.forEach((cell, j) => {
                head[j][i] = {
                    value: cell,
                    rowspan: 1 + (j === cells.length - 1 ? head.length - cells.length : 0),
                    colspan: 1
                }
            })
        })

        // Горизонтальная группировка. Лишние ячейки удаляются
        head.forEach(row => {
            const cellsToDelete: number[] = []
            let targetCell: typeof row[number] | null = null
            row.forEach((cell, i) => {
                if (targetCell == null || targetCell.value !== cell?.value) {
                    targetCell = cell
                    return
                }
                if (targetCell && targetCell.value === cell.value && targetCell.rowspan === cell.rowspan){
                    targetCell.colspan = Number(targetCell.colspan) + 1
                    row[i] = null
                }
            })
        })

        return head
    }

    private buildPages(): typeof this.pages {
        if (!this.config.pagination)
            return [new ConcreteBodyChunk(this.clientData, this, this.columns)]

        const pages: typeof this.pages = []

        let pageData: MatrixData = [],
            chunkName: string = ""

        this.clientData.forEach(rowData => {
            const currChunkName = String(rowData[0])
            if (pageData.length >= (this.config.pagination ?? 1)
                && currChunkName != chunkName) {
                pages.push(new ConcreteBodyChunk(pageData, this, this.columns))
                pageData = []
            }
            pageData.push(rowData)
            chunkName = currChunkName
        })
        pages.push(new ConcreteBodyChunk(pageData, this, this.columns))

        return pages
    }
}