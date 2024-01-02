export function InvoiceTerms({ payentDueDate = "" }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="uppercase text-gray-400 text-sm">terms</p>
            <p className="text-sm">
                Please pay invoice by <strong>{payentDueDate}</strong>
            </p>
        </div>
    );
}
