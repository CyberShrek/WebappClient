
export class DocumentExport implements ExportableDocument {

    constructor(public readonly title: string) {

    }
    public form: { [section: string]: { [field: string]: string } };
    public report: (ExportableTable | ExportableImage)[];

}