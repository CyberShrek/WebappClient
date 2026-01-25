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
    required ?: boolean
    wrong    ?: boolean
    message  ?: string
}