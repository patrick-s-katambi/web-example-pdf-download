import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { numberFormatter } from "../../utils/numberFormater";

export function InvoiceTable({ rows = [] }) {
    const columnHeaders = useMemo(
        () => [
            { key: "description", label: "Description" },
            { key: "unit-cost", label: "Unit cost" },
            { key: "qty-hr-rate", label: "QTY/HR rate" },
            { key: "amount", label: "Amount" },
        ],
        []
    );

    const columnHeadersMapper = useCallback(
        (column) => (
            <th key={column.key} className="text-start font-normal border-b-[3px] border-b-gray-700 py-1 text-sm">
                {column.label}
            </th>
        ),
        []
    );

    const rowsMapper = useCallback(
        (row, rowIndex) => {
            const isLastRow = rows.length - 1 === rowIndex;
            return (
                <tr key={rowIndex} className="py-2">
                    <td
                        className={clsx(
                            "px-0 py-1 border-b border-b-gray-400 text-sm",
                            isLastRow && "border-b-none border-b-transparent"
                        )}
                    >
                        {row.description}
                    </td>
                    <td
                        className={clsx(
                            "px-0 py-1 border-b border-b-gray-400 text-sm",
                            isLastRow && "border-b-none border-b-transparent"
                        )}
                    >
                        ${new numberFormatter().setNumber(row.unitCost.toFixed(2)).formatToThousands()}
                    </td>
                    <td
                        className={clsx(
                            "px-0 py-1 border-b border-b-gray-400 text-sm",
                            isLastRow && "border-b-none border-b-transparent"
                        )}
                    >
                        ${new numberFormatter().setNumber(row.qtyHrRate.toFixed(2)).formatToThousands()}
                    </td>
                    <td
                        className={clsx(
                            "px-0 py-1 border-b border-b-gray-400 text-sm",
                            isLastRow && "border-b-none border-b-transparent"
                        )}
                    >
                        $
                        {new numberFormatter().setNumber((row.unitCost * row.qtyHrRate).toFixed(2)).formatToThousands()}
                    </td>
                </tr>
            );
        },
        [rows]
    );

    return (
        <div className="w-full rounded overflow-clip">
            <table className="w-full">
                <thead>
                    <tr>{columnHeaders.map(columnHeadersMapper)}</tr>
                </thead>
                <tbody>{rows.map(rowsMapper)}</tbody>
            </table>
        </div>
    );
}
