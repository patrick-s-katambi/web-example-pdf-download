import { useCallback, useEffect, useMemo, useState } from "react";
import { docDefinitionGenerator, pdfGenerator } from "../utils";
import { faker } from "@faker-js/faker";

export function useInvoicePage() {
    const data = useMemo(
        () => ({
            title: faker.company.name(),
            logo: "https://picsum.photos/200",
            location: {
                name: faker.location.street(),
                city: faker.location.city(),
                country: faker.location.country(),
                zipCode: faker.location.zipCode(),
            },
            contact: { email: faker.internet.email(), phone: faker.phone.number() },
            client: {
                name: faker.person.fullName(),
                city: faker.location.city(),
                country: faker.location.country(),
                zipCode: faker.location.zipCode(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
            },
            invoiceLabels: { invoiceNumber: faker.string.nanoid(9), date: faker.date.recent().toDateString() },
            tableInfo: Array.from({ length: 17 }).map((_, index) => ({
                description: faker.commerce.productName(),
                unitCost: Math.random() * 10000,
                qtyHrRate: Math.random() * 100,
            })),
            discount: +(Math.random() * 103).toFixed(2),
            taxRate: +(Math.random() * 98).toFixed(2),
            dueDate: faker.date.future().toDateString(),
        }),
        []
    );

    const onClickButton = useCallback(
        async (/** @type {'download' | 'open'}*/ action, /** @type {string} */ filename = undefined) => {
            const doc = await new docDefinitionGenerator()
                .addLogo(data.logo)
                .addTitle(data.title)
                .addLocationInfo(data.location)
                .addContactInfo(data.contact)
                .addClientInfo(data.client)
                .addInvoiceLabelsInfo(data.invoiceLabels)
                .addTableDataInfo(data.tableInfo)
                .addDiscount(data.discount)
                .addTaxRate(data.taxRate)
                .addDueDate(data.dueDate)
                .generateDoc();

            switch (action) {
                case "open":
                    new pdfGenerator().setDocDefinition(doc).createPdf().openPdf();
                    break;

                case "download":
                    new pdfGenerator().setDocDefinition(doc).createPdf().downloadPdf(filename);
                    break;

                default:
                    break;
            }
        },
        [data]
    );

    const [loading, setLoading] = useState(true);
    const onSetLoading = (/**@type {boolean} */ value) => setLoading(value);

    return { data, onClickButton, loading, onSetLoading };
}
