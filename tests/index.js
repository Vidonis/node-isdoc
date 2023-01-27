"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __importDefault(require("../lib"));
const xsd_validator_1 = __importDefault(require("xsd-validator"));
const schema_1 = __importDefault(require("../lib/schema"));
const chai_1 = require("chai");
const fs_1 = require("fs");
const file = (0, fs_1.readFileSync)(__dirname + '/invoice.isdoc', "utf-8");
describe('Create an Invoice', () => {
    it('Is Valid', () => {
        const invoice = new lib_1.default({
            DocumentType: 1,
            // 1 | 'invoice'                Faktura - daňový doklad
            // 2 | 'credit note'            Opravný daňový doklad (dobropis)
            // 3 | 'debit note'             Opravný daňový doklad (vrubopis)
            // 4 | 'proforma invoice'       Zálohová faktura (nedaňový zálohový list)
            // 5 | 'advance invoice'        Daňový doklad při přijetí platby (daňový zálohový list)
            // 6 | 'advance credit note'    Opravný daňový doklad při přijetí platby (dobropis DZL)
            // 7 | 'simplified'             Zjednodušený daňový doklad
            ID: '2022123456',
            IssuingSystem: 'node-isdoc',
            IssueDate: new Date(),
            TaxPointDate: new Date(),
            VATApplicable: true,
            AccountingSupplierParty: {
                Party: {
                    PartyIdentification: { ID: '12345678' },
                    PartyName: { Name: 'Test s.r.o.' },
                    PostalAddress: {
                        StreetName: 'Dodavatelská',
                        BuildingNumber: '1',
                        CityName: 'Dodavatelov',
                        PostalZone: '12345',
                        Country: { IdentificationCode: 'CZ', Name: '' }
                    },
                    PartyTaxScheme: {
                        CompanyID: 'CZ12345678',
                        TaxScheme: 'VAT'
                    },
                    Contact: {
                        Telephone: '222111000',
                        ElectronicMail: 'dodavatel@posta.cz'
                    }
                }
            },
            AccountingCustomerParty: {
                Party: {
                    PartyIdentification: { ID: '12345678' },
                    PartyName: { Name: 'Test s.r.o.' },
                    PostalAddress: {
                        StreetName: 'Dodavatelská',
                        BuildingNumber: '1',
                        CityName: 'Dodavatelov',
                        PostalZone: '12345',
                        Country: { IdentificationCode: 'CZ', Name: '' }
                    },
                    PartyTaxScheme: {
                        CompanyID: 'CZ12345678',
                        TaxScheme: 'VAT'
                    },
                    Contact: {
                        Telephone: '222111000',
                        ElectronicMail: 'dodavatel@posta.cz'
                    }
                }
            },
            InvoiceLines: {
                InvoiceLine: [
                    {
                        ID: '10001',
                        InvoicedQuantity: 1,
                        LineExtensionAmount: 100,
                        LineExtensionAmountTaxInclusive: 121,
                        LineExtensionTaxAmount: 21,
                        UnitPrice: 100,
                        UnitPriceTaxInclusive: 121,
                        ClassifiedTaxCategory: {
                            Percent: 21,
                            VATCalculationMethod: 0,
                            VATApplicable: true
                        },
                        Item: { Description: 'Zboží 10001' }
                    },
                ]
            },
            TaxTotal: {
                TaxSubTotal: {
                    TaxableAmount: 100,
                    TaxAmount: 21,
                    TaxInclusiveAmount: 121,
                    AlreadyClaimedTaxableAmount: 0,
                    AlreadyClaimedTaxAmount: 0,
                    AlreadyClaimedTaxInclusiveAmount: 0,
                    DifferenceTaxableAmount: 100,
                    DifferenceTaxAmount: 21,
                    DifferenceTaxInclusiveAmount: 121,
                    TaxCategory: {
                        Percent: 21,
                        VATApplicable: true,
                    }
                },
                TaxAmount: 21
            },
            LegalMonetaryTotal: {
                TaxExclusiveAmount: 100,
                TaxInclusiveAmount: 121,
                AlreadyClaimedTaxExclusiveAmount: 0,
                AlreadyClaimedTaxInclusiveAmount: 0,
                DifferenceTaxExclusiveAmount: 100,
                DifferenceTaxInclusiveAmount: 121,
                PayableRoundingAmount: 0,
                PaidDepositsAmount: 0,
                PayableAmount: 121
            },
            PaymentMeans: {
                Payment: {
                    PaidAmount: 121,
                    PaymentMeansCode: 42,
                    Details: {
                        PaymentDueDate: new Date(),
                        ID: '43-1234567890',
                        BankCode: '0100',
                        Name: '',
                        IBAN: '',
                        BIC: '',
                        VariableSymbol: 2022123456,
                        ConstantSymbol: '',
                        SpecificSymbol: ''
                    }
                }
            }
        });
        (0, chai_1.expect)(invoice).to.have.property('TaxPointDate');
        (0, chai_1.expect)(invoice?.LegalMonetaryTotal?.PayableAmount).to.be.eq(121);
    });
});
describe('Valid File', () => {
    let invoice = new lib_1.default(file);
    it('Load Valid File', () => {
        (0, chai_1.expect)(invoice.DocumentType).to.be.oneOf([1, 2, 3, 4, 6, 7]);
    });
    it('Loaded data Validates', () => {
        (0, chai_1.expect)(invoice.validate()).to.be.true;
    });
    it('Export to JSON', () => {
        const json = invoice.toJSON();
        // console.log(json)
        (0, chai_1.expect)(typeof json).to.be.eq('string');
        (0, chai_1.expect)(json[0]).to.be.eq('{');
        (0, chai_1.expect)(JSON.parse(json).DocumentType).to.be.a('number');
    });
    it('Export to XML + validation', () => {
        const xml = invoice.toXML();
        // console.log(xml)
        (0, chai_1.expect)(typeof xml).to.be.eq('string');
        (0, chai_1.expect)(xml[0]).to.be.eq('<');
        (0, chai_1.expect)((0, xsd_validator_1.default)(xml, schema_1.default)).to.be.true;
    });
});
describe('Invalid File', () => {
    it('Loading an Invalid File Throws', () => {
        (0, chai_1.expect)(function () {
            new lib_1.default(file.replace('<DocumentType>1</DocumentType>', '<DocumentType>A</DocumentType>'));
        }).throws('Invalid Invoice');
    });
});
