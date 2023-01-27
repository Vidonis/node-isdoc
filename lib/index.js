"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fast_xml_parser_1 = require("fast-xml-parser");
const InvoiceXMLError_1 = __importDefault(require("./InvoiceXMLError"));
const xmlopts = {
    attributeNamePrefix: "$_",
    ignoreAttributes: false,
    format: true,
};
class Invoice {
    constructor(data) {
        this.DocumentType = 1;
        this.UUID = (0, crypto_1.randomUUID)();
        this.ElectronicPossibilityAgreementReference = "";
        this.LocalCurrencyCode = "CZK";
        this.CurrRate = "1";
        this.RefCurrRate = "1";
        this.$_xmlns = "http://isdoc.cz/namespace/2013";
        this.$_version = "6.0.1";
        if (typeof data === "string" || data instanceof Buffer) {
            // const validation = validateSchema(data, schema)
            // if (validation !== true)
            //   throw new InvoiceXMLError(validation)
            const parsed = new fast_xml_parser_1.XMLParser(xmlopts).parse(data);
            if (parsed.Invoice)
                this.assign(parsed.Invoice, false);
            else
                throw new InvoiceXMLError_1.default();
        }
        else if (typeof data === "object")
            this.assign(data);
    }
    assign(data, validate = true) {
        if (typeof data.DocumentType === "string")
            data.DocumentType = {
                invoice: 1,
                "credit note": 2,
                "debit note": 3,
                "proforma invoice": 4,
                "advance invoice": 5,
                "advance credit note": 6,
                simplified: 7,
            }[data.DocumentType];
        Object.assign(this, data);
        if (validate)
            this.validate();
    }
    validate(xml) {
        // const validation = validateSchema(xml || this.toXML(), schema)
        // if (validation !== true)
        //   throw new InvoiceXMLError(validation)
        return true;
    }
    toXML(validate = true) {
        const data = {
            $_xmlns: this.$_xmlns,
            $_version: this.$_version,
            DocumentType: this.DocumentType,
            SubDocumentType: this.SubDocumentType,
            SubDocumentTypeOrigin: this.SubDocumentTypeOrigin,
            TargetConsolidator: this.TargetConsolidator,
            ClientOnTargetConsolidator: this.ClientOnTargetConsolidator,
            ClientBankAccount: this.ClientBankAccount,
            ID: this.ID,
            ID36: this.ID36,
            UUID: this.UUID,
            EgovFlag: this.EgovFlag,
            ISDS_ID: this.ISDS_ID,
            FileReference: this.FileReference,
            ReferenceNumber: this.ReferenceNumber,
            EgovClassifiers: this.EgovClassifiers,
            IssuingSystem: this.IssuingSystem,
            IssueDate: this.IssueDate,
            TaxPointDate: this.TaxPointDate,
            // LastValidDate: this.LastValidDate,
            VATApplicable: this.VATApplicable,
            ElectronicPossibilityAgreementReference: this.ElectronicPossibilityAgreementReference,
            Note: this.Note,
            LocalCurrencyCode: this.LocalCurrencyCode,
            ForeignCurrencyCode: this.ForeignCurrencyCode,
            CurrRate: this.CurrRate,
            RefCurrRate: this.RefCurrRate,
            Extensions: this.Extensions,
            AccountingSupplierParty: this.AccountingSupplierParty,
            SellerSupplierParty: this.SellerSupplierParty,
            AnonymousCustomerParty: this.AnonymousCustomerParty,
            AccountingCustomerParty: this.AccountingCustomerParty,
            BuyerCustomerParty: this.BuyerCustomerParty,
            OrderReferences: this.OrderReferences,
            DeliveryNoteReferences: this.DeliveryNoteReferences,
            OriginalDocumentReferences: this.OriginalDocumentReferences,
            ContractReferences: this.ContractReferences,
            Delivery: this.Delivery,
            InvoiceLines: this.InvoiceLines,
            NonTaxedDeposits: this.NonTaxedDeposits,
            TaxedDeposits: this.TaxedDeposits,
            TaxTotal: this.TaxTotal,
            LegalMonetaryTotal: this.LegalMonetaryTotal,
            PaymentMeans: this.PaymentMeans,
            SupplementsList: this.SupplementsList,
        };
        // noinspection JSUnusedGlobalSymbols
        const builderOptions = {
            ...xmlopts,
            tagValueProcessor: (name, value) => value instanceof Date ? value.toISOString().substring(0, 10) : value,
        };
        const xml = `<?xml version='1.0' encoding='utf-8' ?>\n` +
            new fast_xml_parser_1.XMLBuilder(builderOptions).build({ Invoice: data });
        if (validate)
            this.validate(xml);
        return xml;
    }
    toJSON() {
        return JSON.stringify({ ...this }, null, 2);
    }
}
exports.default = Invoice;
