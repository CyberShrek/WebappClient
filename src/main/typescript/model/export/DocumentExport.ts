
export class DocumentExport implements ExportableDocument {

    constructor(public readonly title: string) {

    }

    form: ExportableForm;
    report: (ExportableTable | ExportableImage)[];
}