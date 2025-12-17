type FieldStates = {
    [fieldId: string]: FieldState
}
interface FieldState {
    value   : any
    wrong  ?: boolean
    message?: string
}