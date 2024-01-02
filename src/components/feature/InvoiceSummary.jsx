import { useCallback, useMemo } from "react";
import { LabelValuecard } from "./LabelValueCard";
import { LabelValue } from "./LabelValue";
import { numberFormatter } from "../../utils/numberFormater";

export function InvoiceSummary({ subtotal, discount, taxRate = 0, tax = 0, curreny = "$", invoiceTotal = 0 }) {
    const _numberFormatter = useMemo(() => new numberFormatter(), []);
    const summaryCardData = useMemo(
        () => [
            {
                key: "subtotal",
                label: "Subtotal",
                value: `${curreny}${_numberFormatter.setNumber(subtotal).formatToThousands()}`,
            },
            {
                key: "discount",
                label: "Discount",
                value: `${curreny}${_numberFormatter.setNumber(discount).formatToThousands()}`,
            },
            { key: "taxRate", label: "Tax rate", value: `${taxRate}%` },
            { key: "tax", label: "Tax", value: `${curreny}${_numberFormatter.setNumber(tax).formatToThousands()}` },
        ],
        []
    );

    return (
        <div className="flex flex-col gap-3 items-end">
            <LabelValuecard data={summaryCardData} withBackground={false} alignRight boldValue />

            <LabelValue
                label={"Invoice total"}
                value={`${curreny} ${_numberFormatter.setNumber(invoiceTotal).formatToThousands()}`}
                alignRight
                boldValue
            />
        </div>
    );
}
