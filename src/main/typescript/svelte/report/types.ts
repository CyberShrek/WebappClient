type Matrix = {
    head: string[]
    data: MatrixData
}

type MatrixData = (string | number | boolean | null)[][]

type RGBA = [number, number, number, number]