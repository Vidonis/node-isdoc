"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvoiceXMLError extends Error {
    constructor(errors) {
        super('Invalid Invoice' + (errors?.length ? `: ${errors[0].message}` : ''));
        if (errors)
            this.errors = errors;
    }
}
exports.default = InvoiceXMLError;
