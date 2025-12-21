type Fields = {
    [fieldId: string]: Field
}

interface Field {
    title        : string
    hint        ?: string
    sectionTitle?: string

    value      ?: any
    prettyValue?: string

    // validation
    wrong  ?: boolean
    message?: string
}

interface SwitchField extends Field {
    value: boolean
}
interface CalendarField extends Field {
    value: CalendarPeriod
}
interface SelectField extends Field {
    value: (keyof Options)[]
}