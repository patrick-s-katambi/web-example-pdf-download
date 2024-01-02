import { getBase64ImageFromURL } from "./imageToBase64";
import { invoiceCalculator } from "./invoiceCalculator";
import { numberFormatter } from "./numberFormater";

export function docDefinitionGenerator() {
    /**
     * @type {import("pdfmake/interfaces").TDocumentDefinitions | undefined} docDefinition
     */
    this.docDefinition = undefined;

    this.numberFormatter = new numberFormatter();
}

/**
 *
 * @param {string} title
 */
docDefinitionGenerator.prototype.addTitle = function (title) {
    this.title = title;
    return this;
};

/**
 *
 * @param {{name: string; city: string; country: string; zipCode: string}} info
 */
docDefinitionGenerator.prototype.addLocationInfo = function (info) {
    this.locationInfo = info;
    return this;
};

/**
 *
 * @param {{phone: string; email: string}} info
 */
docDefinitionGenerator.prototype.addContactInfo = function (info) {
    this.contactInfo = info;
    return this;
};

/**
 *
 * @param {{name: string; city: string; country: string; zipCode: string ; phone: string; email: string}} info
 */
docDefinitionGenerator.prototype.addClientInfo = function (info) {
    this.clientInfo = info;
    return this;
};

/**
 *
 * @param {string} logo
 */
docDefinitionGenerator.prototype.addLogo = function (logo) {
    this.logo = logo;
    return this;
};

/**
 *
 * @param {{invoiceNumber: string; date: string}} info
 */
docDefinitionGenerator.prototype.addInvoiceLabelsInfo = function (info) {
    this.invoiceLabelsInfo = info;
    return this;
};

/**
 *
 * @param {{ description: string; unitCost: number;qtyHrRate: number; }[]} info
 */
docDefinitionGenerator.prototype.addTableDataInfo = function (info) {
    this.tableDataInfo = {
        raw: info,
        mapped: info.map((item) => [
            item.description,
            `\$${this.numberFormatter.setNumber(item.unitCost.toFixed(2)).formatToThousands()}`,
            `\$${this.numberFormatter.setNumber(item.qtyHrRate.toFixed(2)).formatToThousands()}`,
            `\$${this.numberFormatter.setNumber((item.unitCost * item.qtyHrRate).toFixed(2)).formatToThousands()}`,
        ]),
    };

    this.invoiceCalculator = new invoiceCalculator(info);
    return this;
};

/**
 *
 * @param {number} discount
 */
docDefinitionGenerator.prototype.addDiscount = function (discount = 0) {
    this.discount = discount;
    return this;
};

/**
 *
 * @param {number} taxRate
 */
docDefinitionGenerator.prototype.addTaxRate = function (taxRate = 0) {
    this.taxRate = taxRate;
    return this;
};

/**
 *
 * @param {string} dueDate
 */
docDefinitionGenerator.prototype.addDueDate = function (dueDate = "") {
    this.dueDate = dueDate;
    return this;
};

docDefinitionGenerator.prototype.generateDoc = async function () {
    const encodedLogo = await getBase64ImageFromURL(this.logo);

    const logoSize = 80;

    const smallFontSize = 10;
    const largeFontSize = 11;
    const largestFontSize = 25;

    const grayTextColor = "#6b7280";
    const lightGrayTextColor = "#9ca3af";
    const grayBackgroundColor = "#f3f4f6";

    const smallColumnGap = 4;
    const largestColumnGap = 20;

    const marginSpace = 10;

    /**@type {import("pdfmake/interfaces").TDocumentDefinitions} */
    const docDefinition = {
        content: [
            // company info
            {
                columns: [
                    {
                        width: "85%",
                        columns: [
                            [
                                { text: this.title, fontSize: largestFontSize, bold: true },
                                {
                                    columnGap: largestColumnGap,
                                    marginTop: marginSpace,
                                    columns: [
                                        {
                                            width: "auto",
                                            table: {
                                                headerRows: 0,
                                                body: [
                                                    [
                                                        {
                                                            columns: [
                                                                [
                                                                    {
                                                                        label: "Building name",
                                                                        value: this.locationInfo.name,
                                                                    },
                                                                    { label: "City", value: this.locationInfo.city },
                                                                    {
                                                                        label: "Country",
                                                                        value: this.locationInfo.country,
                                                                    },
                                                                    {
                                                                        label: "Zip-code",
                                                                        value: this.locationInfo.zipCode,
                                                                    },
                                                                ].map((item) => ({
                                                                    marginTop: marginSpace / 5,
                                                                    columns: [
                                                                        {
                                                                            text: `${item.label}:`,
                                                                            width: "auto",
                                                                            color: grayTextColor,
                                                                        },
                                                                        {
                                                                            text: item.value,
                                                                            bold: true,
                                                                            width: "auto",
                                                                        },
                                                                    ],
                                                                })),
                                                            ],
                                                            fontSize: smallFontSize,
                                                            columnGap: smallColumnGap,
                                                            fillColor: grayBackgroundColor,
                                                            // Remove distasteful border
                                                            border: [false, false, false, false],
                                                        },
                                                    ],
                                                ],
                                            },
                                        },
                                        {
                                            width: "auto",
                                            table: {
                                                headerRows: 0,
                                                body: [
                                                    [
                                                        {
                                                            columns: [
                                                                [
                                                                    { label: "Phone", value: this.contactInfo.phone },
                                                                    { label: "Email", value: this.contactInfo.email },
                                                                ].map((item) => ({
                                                                    marginTop: marginSpace / 5,
                                                                    columns: [
                                                                        {
                                                                            text: `${item.label}:`,
                                                                            width: "auto",
                                                                            color: grayTextColor,
                                                                        },
                                                                        {
                                                                            text: item.value,
                                                                            bold: true,
                                                                            width: "auto",
                                                                        },
                                                                    ],
                                                                })),
                                                            ],
                                                            fontSize: smallFontSize,
                                                            columnGap: smallColumnGap,
                                                            fillColor: grayBackgroundColor,
                                                            // Remove distasteful border
                                                            border: [false, false, false, false],
                                                        },
                                                    ],
                                                ],
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                    {
                        width: "15%",
                        columns: [
                            {
                                image: encodedLogo,
                                width: logoSize,
                                height: logoSize,
                            },
                        ],
                    },
                ],
            },

            // billed to
            {
                text: "BILLED TO",
                fontSize: largeFontSize,
                bold: false,
                color: lightGrayTextColor,
                marginTop: marginSpace,
            },
            {
                marginTop: marginSpace / 3,
                columns: [
                    {
                        width: "auto",
                        table: {
                            headerRows: 0,
                            body: [
                                [
                                    {
                                        columns: [
                                            [
                                                {
                                                    label: "Client name",
                                                    value: this.clientInfo.name,
                                                },
                                                { label: "City", value: this.clientInfo.city },
                                                { label: "Country", value: this.clientInfo.country },
                                                { label: "Zip-code", value: this.clientInfo.zipCode },
                                                { label: "Phone", value: this.clientInfo.phone },
                                                { label: "Email", value: this.clientInfo.email },
                                            ].map((item) => ({
                                                marginTop: marginSpace / 5,
                                                columns: [
                                                    {
                                                        text: `${item.label}:`,
                                                        width: "auto",
                                                        color: grayTextColor,
                                                    },
                                                    {
                                                        text: item.value,
                                                        bold: true,
                                                        width: "auto",
                                                    },
                                                ],
                                            })),
                                        ],
                                        fontSize: smallFontSize,
                                        columnGap: smallColumnGap,
                                        fillColor: grayBackgroundColor,
                                        // Remove distasteful border
                                        border: [false, false, false, false],
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },

            // invoice info
            {
                columnGap: largestColumnGap,
                columns: [
                    {
                        width: "auto",
                        fontSize: smallFontSize,
                        columnGap: smallColumnGap,
                        columns: [
                            [
                                {
                                    text: "INVOICE",
                                    fontSize: largeFontSize,
                                    bold: false,
                                    color: lightGrayTextColor,
                                    marginTop: marginSpace,
                                    marginBottom: marginSpace / 3,
                                },
                                [
                                    { label: "Invoice number", value: this.invoiceLabelsInfo.invoiceNumber },
                                    { label: "Date", value: this.invoiceLabelsInfo.date },
                                ].map((item) => ({
                                    marginTop: marginSpace / 5,
                                    columns: [
                                        {
                                            text: `${item.label}:`,
                                            width: "auto",
                                            color: grayTextColor,
                                        },
                                        {
                                            text: item.value,
                                            bold: true,
                                            width: "auto",
                                        },
                                    ],
                                })),
                            ],
                        ],
                    },
                    {
                        width: "*",
                        fontSize: smallFontSize,
                        marginTop: marginSpace,
                        columns: [
                            [
                                {
                                    layout: "lightHorizontalLines",
                                    marginBottom: marginSpace,
                                    table: {
                                        // headers are automatically repeated if the table spans over multiple pages
                                        // you can declare how many rows should be treated as headers
                                        headerRows: 1,
                                        widths: ["*", "auto", "auto", "auto"],
                                        body: [
                                            ["Description", "Unit cost", "QTY/HR rate", "Amount"],
                                            ...(this.tableDataInfo.mapped ?? []),
                                        ],
                                    },
                                },

                                [
                                    {
                                        label: "Subtotal",
                                        value: `\$${this.numberFormatter
                                            .setNumber(this.invoiceCalculator.calculateSubtotal().subtotal)
                                            .formatToThousands()}`,
                                    },
                                    { label: "Discount", value: `\$${this.discount.toFixed(2)}` },
                                    { label: "Tax rate", value: `${this.taxRate.toFixed(2)}%` },
                                    {
                                        label: "Tax",
                                        value: `\$${this.numberFormatter
                                            .setNumber(
                                                this.invoiceCalculator
                                                    .calculateSubtotal()
                                                    .calculateTax(this.taxRate, this.discount).tax
                                            )
                                            .formatToThousands()}`,
                                    },
                                ].map((item) => ({
                                    alignment: "right",
                                    width: "*",
                                    columnGap: smallColumnGap,
                                    marginTop: marginSpace / 5,
                                    columns: [
                                        {
                                            text: `_`,
                                            width: "*",
                                            color: "white",
                                        },
                                        {
                                            text: `${item.label}:`,
                                            width: "auto",
                                            color: grayTextColor,
                                        },
                                        {
                                            text: item.value,
                                            bold: true,
                                            width: "auto",
                                        },
                                    ],
                                })),

                                [
                                    {
                                        label: "Invoice total",
                                        value: `\$${this.numberFormatter
                                            .setNumber(
                                                this.invoiceCalculator
                                                    .calculateSubtotal()
                                                    .calculateTax(this.taxRate, this.discount)
                                                    .calculateTotal().total
                                            )
                                            .formatToThousands()}`,
                                    },
                                ].map((item) => ({
                                    alignment: "right",
                                    width: "*",
                                    columnGap: smallColumnGap,
                                    marginTop: marginSpace,
                                    columns: [
                                        {
                                            text: `_`,
                                            width: "*",
                                            color: "white",
                                        },
                                        {
                                            text: `${item.label}:`,
                                            width: "auto",
                                            color: grayTextColor,
                                        },
                                        {
                                            text: item.value,
                                            bold: true,
                                            width: "auto",
                                        },
                                    ],
                                })),
                            ],
                        ],
                    },
                ],
            },

            // footer
            {
                text: "TERMS",
                fontSize: largeFontSize,
                bold: false,
                color: lightGrayTextColor,
                marginTop: marginSpace * 2,
            },
            [{ label: "Please pay invoice by", value: this.dueDate }].map((item) => ({
                columnGap: smallColumnGap,
                marginTop: marginSpace / 3,
                fontSize: smallFontSize,
                columns: [
                    {
                        text: `${item.label} `,
                        width: "auto",
                        color: grayTextColor,
                    },
                    {
                        text: item.value,
                        bold: true,
                        width: "auto",
                    },
                ],
            })),
        ],
    };

    return docDefinition;
};
