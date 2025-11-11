import {virtualSelectProperties} from "../properties"
import {equal} from "../util/data"
import {InputModule} from "./abstract/InputModule"
import 'virtual-select-plugin/dist/virtual-select.min.css';
import 'virtual-select-plugin/dist/virtual-select.min.js';

export type Option = {
    label: string
    value: string
    alias: string
    description: string
}

export class VirtualSelectModule extends InputModule<string[]>{

    private options: Option[] = []
    private readonly mountPromise: Promise<void>

    constructor(private rootElement: HTMLElement,
                readonly config: {
                    multiple?:         boolean
                    search?:           boolean
                    showCodes?:        boolean
                    placeholder?:      string
                    disableSelectAll?: boolean
                    maxValues?:        number
                    default?:          string
                }) {

        super((newKeys: string[]) => {
            // @ts-ignore
            rootElement
                ?.setValue?.(newKeys)
        })

        this.value = []

        this.mountPromise = new Promise(resolve => {
            // @ts-ignore
            VirtualSelect.init({
                ...virtualSelectProperties,
                ele: rootElement,
                multiple: !!config.multiple,
                search: !!config.search,
                placeholder: config.placeholder ?? "",
                hasOptionDescription: !!config.showCodes,
                disableSelectAll: !!config.disableSelectAll,
                maxValues: config.maxValues,
                searchPlaceholderText: (config.multiple && !config.disableSelectAll)
                    ? virtualSelectProperties.selectAllText
                    : virtualSelectProperties.searchPlaceholderText,
                autofocus: false
            })
            rootElement.addEventListener("change", event => {
                // @ts-ignore
                const newValue = event.currentTarget
                    ?.value
                    ?? []
                super.setValue(newValue.length > 0 ? (typeof newValue === "object" ? newValue : [newValue]) : [], false)
            })
            resolve()
        })
    }

    override async setValue(optionKeys: string[]){
        await this.mountPromise
        if(equal(this.value, optionKeys)) return
        super.setValue(optionKeys, true)
    }

    setOptions(newOptions: Option[]) {
        return this.mountPromise.then(() => {
            if (!equal(this.options, newOptions)) {
                if (newOptions && newOptions.length > 0) {
                    // @ts-ignore
                    this.rootElement
                        .enable()
                    // @ts-ignore
                    this.rootElement
                        .setOptions(newOptions)
                } else {
                    // @ts-ignore
                    this.rootElement
                        .disable()
                    // @ts-ignore
                    this.rootElement
                        .reset()
                    this.rootElement.blur()
                }
                this.options = newOptions
            }
        })
    }

    open(){
        // @ts-ignore
        this.rootElement
            ?.open()
    }
    close(){
        // @ts-ignore
        this.rootElement
            ?.close()
    }
    focus(){
        this.rootElement
            ?.focus()
    }
    enable(){
        // @ts-ignore
        this.rootElement
            ?.enable()
    }
    disable(){
        // @ts-ignore
        this.rootElement
            ?.disable()
    }
    override destroy() {
        try{
            // @ts-ignore
            this.rootElement
            ?.destroy()}
        catch{}
    }
}