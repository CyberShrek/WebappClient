type Fields = {
    [fieldId: string]: Field
}

interface Field {
    title       : string
    hint        ?: string
    sectionTitle?: string

    value      ?: any
    prettyValue?: string

    // validation
    wrong  ?: boolean
    message?: string
}