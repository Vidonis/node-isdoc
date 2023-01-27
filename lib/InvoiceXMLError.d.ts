export default class InvoiceXMLError extends Error {
    errors?: Error[];
    constructor(errors?: Error[]);
}
