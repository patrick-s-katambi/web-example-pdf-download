import {
    ActionButtons,
    BilledTo,
    CompanyInfo,
    InvoiceInfo,
    InvoiceSummary,
    InvoiceTable,
    InvoiceTerms,
} from "../components/feature";
import { ImageLoader } from "../components/ui/ImageLoader";
import { useInvoicePage } from "../hooks/useInvoicePage";
import { invoiceCalculator } from "../utils/invoiceCalculator";

export function InvoicePage() {
    const { data, onClickButton, loading, onSetLoading } = useInvoicePage();

    return (
        <div className="px-4 py-8 max-w-[70%] mx-auto flex flex-col gap-4 bg-white border-x border-x-gray-300">
            <CompanyInfo
                logo={data.logo}
                name={data.title}
                location={{ ...data.location, buildingName: data.location.name }}
                contact={data.contact}
                onSetLoading={onSetLoading}
                loading={loading}
            />

            <BilledTo
                clientName={data.client.name}
                location={{ city: data.client.city, country: data.client.country, zipCode: data.client.zipCode }}
                contact={{ email: data.client.email, phone: data.client.phone }}
            />

            <div className="grid grid-cols-4">
                <InvoiceInfo invoiceNumber={data.invoiceLabels.invoiceNumber} dateIssued={data.invoiceLabels.date} />
                <div className="col-span-3 flex flex-col items-end gap-4">
                    <InvoiceTable rows={data.tableInfo} />
                    <InvoiceSummary
                        discount={data.discount}
                        subtotal={new invoiceCalculator(data.tableInfo).calculateSubtotal().subtotal}
                        taxRate={data.taxRate}
                        tax={
                            new invoiceCalculator(data.tableInfo)
                                .calculateSubtotal()
                                .calculateTax(data.taxRate, data.discount).tax
                        }
                        invoiceTotal={
                            new invoiceCalculator(data.tableInfo)
                                .calculateSubtotal()
                                .calculateTax(data.taxRate, data.discount)
                                .calculateTotal().total
                        }
                    />
                </div>
            </div>

            <InvoiceTerms payentDueDate={data.dueDate} />
            <ActionButtons
                onOpen={() => onClickButton("open")}
                onDownload={() => onClickButton("download", `${data.client.name} - ${new Date().toString()}`)}
            />
        </div>
    );
}
