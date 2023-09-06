interface InvoiceType {
    DocumentType?: 1 | 'invoice' | 2 | 'credit note' | 3 | 'debit note' | 4 | 'proforma invoice' | 5 | 'advance invoice' | 6 | 'advance credit note' | 7 | 'simplified';
    SubDocumentType?: string;
    SubDocumentTypeOrigin?: string;
    TargetConsolidator?: string;
    ClientOnTargetConsolidator?: string;
    ClientBankAccount?: string;
    ID?: string | number;
    ID36?: string | number;
    UUID?: string;
    EgovFlag?: boolean;
    ISDS_ID?: string;
    FileReference?: string;
    ReferenceNumber?: string;
    EgovClassifiers?: any;
    IssuingSystem?: string;
    IssueDate?: string | Date;
    TaxPointDate?: string | Date;
    VATApplicable?: string | boolean;
    ElectronicPossibilityAgreementReference?: string;
    Note?: string;
    LocalCurrencyCode?: string;
    ForeignCurrencyCode?: string;
    CurrRate?: number | string;
    RefCurrRate?: number | string;
    Extensions?: any;
    AccountingSupplierParty?: AccountingSupplierParty;
    SellerSupplierParty?: SellerSupplierParty;
    AnonymousCustomerParty?: any;
    AccountingCustomerParty?: AccountingCustomerParty;
    BuyerCustomerParty?: BuyerCustomerParty;
    OrderReferences?: any;
    OriginalDocumentReferences?: any;
    ContractReferences?: any;
    Delivery?: Delivery;
    DeliveryNoteReferences?: DeliveryNoteReferences;
    InvoiceLines?: InvoiceLines;
    NonTaxedDeposits?: any;
    TaxedDeposits?: any;
    TaxTotal?: TaxTotal;
    LegalMonetaryTotal?: LegalMonetaryTotal;
    PaymentMeans?: PaymentMeans;
    SupplementsList?: any;
}
interface AccountingCustomerParty {
    Party?: Party;
}
interface AccountingSupplierParty {
    Party: Party;
}
interface SellerSupplierParty {
    Party: Party;
}
interface BuyerCustomerParty {
    Party: Party;
}
interface Delivery {
    Party: Party;
}
interface Party {
    PartyIdentification: PartyIdentification;
    PartyName: PartyName;
    PostalAddress: PostalAddress;
    PartyTaxScheme?: PartyTaxScheme;
    Contact?: FluffyContact;
}
interface PartyIdentification {
    UserID?: string;
    CatalogFirmIdentification?: string;
    ID?: string;
}
interface PartyName {
    Name: string;
}
interface PartyTaxScheme {
    CompanyID: string;
    TaxScheme: string;
}
interface PostalAddress {
    StreetName?: string;
    BuildingNumber?: string;
    CityName?: string;
    PostalZone?: string;
    Country?: Country;
}
interface Country {
    IdentificationCode?: string;
    Name?: string;
}
interface FluffyContact {
    Name?: string;
    Telephone?: string;
    ElectronicMail?: string;
}
interface DeliveryNoteReferences {
    DeliveryNoteReference: DeliveryNoteReferencesDeliveryNoteReference;
}
interface DeliveryNoteReferencesDeliveryNoteReference {
    ID?: string | number;
    IssueDate?: string | Date;
    $_id?: string | number;
}
interface InvoiceLines {
    InvoiceLine?: InvoiceLine[];
}
interface InvoiceLine {
    ID: string | number;
    InvoicedQuantity: number | InvoicedQuantity;
    LineExtensionAmount: string | number;
    LineExtensionAmountCurr?: string | number;
    LineExtensionAmountTaxInclusive: string | number;
    LineExtensionTaxAmount: string | number;
    UnitPrice: string | number;
    UnitPriceTaxInclusive: string | number;
    ClassifiedTaxCategory: ClassifiedTaxCategory;
    Note?: string;
    VATNote?: string;
    Item?: Item;
    DeliveryNoteReference?: InvoiceLineDeliveryNoteReference;
}
interface ClassifiedTaxCategory {
    Percent: string | number;
    VATCalculationMethod: string | number;
    VATApplicable: string | boolean;
}
interface InvoiceLineDeliveryNoteReference {
    LineID?: string | number;
    $_ref?: string | number;
}
interface InvoicedQuantity {
    $_unitCode?: string;
    '#text'?: string | number;
}
interface Item {
    Description: string;
    CatalogueItemIdentification?: ItemIdentification;
    SellersItemIdentification?: ItemIdentification;
    SecondarySellersItemIdentification?: ItemIdentification;
    TertiarySellersItemIdentification?: ItemIdentification;
    BuyersItemIdentification?: ItemIdentification;
}
interface ItemIdentification {
    ID: string | number;
}
interface LegalMonetaryTotal {
    TaxExclusiveAmount: string | number;
    TaxInclusiveAmount: string | number;
    TaxInclusiveAmountCurr?: string | number;
    AlreadyClaimedTaxExclusiveAmount: string | number;
    AlreadyClaimedTaxInclusiveAmount: string | number;
    AlreadyClaimedTaxInclusiveAmountCurr?: string | number;
    DifferenceTaxExclusiveAmount: string | number;
    DifferenceTaxInclusiveAmount: string | number;
    DifferenceTaxInclusiveAmountCurr?: string | number;
    PayableRoundingAmount: string | number;
    PaidDepositsAmount: string | number;
    PayableAmount: string | number;
}
interface PaymentMeans {
    Payment?: Payment;
}
interface Payment {
    PaidAmount?: string | number;
    PaymentMeansCode?: string | number;
    Details?: Details;
}
interface Details {
    PaymentDueDate?: Date | string;
    ID?: string | number;
    BankCode?: string | number;
    Name?: string;
    IBAN?: string;
    BIC?: string;
    VariableSymbol?: string | number;
    ConstantSymbol?: string | number;
    SpecificSymbol?: string | number;
}
interface TaxTotal {
    TaxSubTotal: TaxSubTotal;
    TaxAmount: string | number;
}
interface TaxSubTotal {
    TaxableAmount: string | number;
    TaxAmount: string | number;
    TaxInclusiveAmount: string | number;
    AlreadyClaimedTaxableAmount: string | number;
    AlreadyClaimedTaxableAmountCurr?: string | number;
    AlreadyClaimedTaxAmount: string | number;
    AlreadyClaimedTaxInclusiveAmount: string | number;
    AlreadyClaimedTaxInclusiveAmountCurr?: string | number;
    DifferenceTaxableAmount: string | number;
    DifferenceTaxAmount: string | number;
    DifferenceTaxInclusiveAmount: string | number;
    DifferenceTaxInclusiveAmountCurr?: string | number;
    TaxCategory: TaxCategory;
}
interface TaxCategory {
    Percent?: string | number;
    VATApplicable?: string | boolean;
    LocalReverseChargeFlag?: string | boolean;
}

declare class Invoice {
    DocumentType: number;
    SubDocumentType?: string;
    SubDocumentTypeOrigin?: string;
    TargetConsolidator?: string;
    ClientOnTargetConsolidator?: string;
    ClientBankAccount?: string;
    ID?: string;
    ID36?: string;
    UUID?: string;
    EgovFlag?: boolean;
    ISDS_ID?: string;
    FileReference?: string;
    ReferenceNumber?: string;
    EgovClassifiers?: any;
    IssuingSystem?: string;
    IssueDate?: string | Date;
    TaxPointDate?: string | Date;
    VATApplicable?: string;
    ElectronicPossibilityAgreementReference: string;
    Note?: string;
    LocalCurrencyCode: string;
    ForeignCurrencyCode?: string;
    CurrRate: number | string;
    RefCurrRate: number | string;
    Extensions?: any;
    AccountingSupplierParty?: AccountingSupplierParty;
    SellerSupplierParty?: SellerSupplierParty;
    AnonymousCustomerParty?: any;
    AccountingCustomerParty?: AccountingCustomerParty;
    BuyerCustomerParty?: BuyerCustomerParty;
    OrderReferences?: any;
    OriginalDocumentReferences?: any;
    ContractReferences?: any;
    Delivery?: Delivery;
    DeliveryNoteReferences?: DeliveryNoteReferences;
    InvoiceLines?: InvoiceLines;
    NonTaxedDeposits?: any;
    TaxedDeposits?: any;
    TaxTotal?: TaxTotal;
    LegalMonetaryTotal?: LegalMonetaryTotal;
    PaymentMeans?: PaymentMeans;
    SupplementsList?: any;
    private $_xmlns;
    private $_version;
    constructor(data?: InvoiceType | string | Buffer);
    assign(data: InvoiceType, validate?: boolean): void;
    validate(xml?: string): true;
    toXML(validate?: boolean): string;
    toJSON(): string;
}

export { InvoiceType, Invoice as default };
