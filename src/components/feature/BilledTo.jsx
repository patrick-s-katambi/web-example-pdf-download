import { useMemo } from "react";
import { LabelValuecard } from "./LabelValueCard";

export function BilledTo({ clientName, location: { city, country, zipCode }, contact: { phone, email } }) {
    const clientCardData = useMemo(
        () => [
            { key: "client-name", label: "Client name", value: clientName },
            { key: "city", label: "City", value: city },
            { key: "country", label: "Country", value: country },
            { key: "zip-code", label: "Zip-code", value: zipCode },
            { key: "phone", label: "Phone", value: phone },
            { key: "email", label: "Email", value: email },
        ],
        []
    );

    return (
        <div className="flex flex-col gap-1">
            <p className="uppercase text-gray-400 text-sm">billed to</p>
            <LabelValuecard data={clientCardData} />
        </div>
    );
}
