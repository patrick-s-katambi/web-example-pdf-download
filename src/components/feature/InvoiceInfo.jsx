import { useCallback, useMemo } from "react";
import { LabelValue } from "./LabelValue";
import { LabelValuecard } from "./LabelValueCard";

export function InvoiceInfo({ invoiceNumber, dateIssued }) {
    const clientCardData = useMemo(
        () => [
            { key: "invoice-number", label: "Invoice number", value: invoiceNumber },
            { key: "date-of-issue", label: "Date of issue", value: dateIssued },
        ],
        []
    );

    return (
        <div className="flex flex-col gap-2 h-fit">
            <p className="uppercase text-gray-400 text-sm">Invoice</p>
            <LabelValuecard data={clientCardData} withBackground={false} />
        </div>
    );
}
