import { useMemo } from "react";
import { ImageLoader } from "../ui/ImageLoader";
import { LabelValuecard } from "./LabelValueCard";

/**
 *
 * @param {{
 *  onSetLoading: (value: boolean) => void
 * }} param0
 * @returns
 */
export function CompanyInfo({
    name,
    logo,
    location: { buildingName, city, country, zipCode },
    contact: { phone, email },
    onSetLoading,
    loading,
}) {
    const locationCardData = useMemo(
        () => [
            { key: "building-name", label: "Building name", value: buildingName },
            { key: "city", label: "City", value: city },
            { key: "country", label: "Country", value: country },
            { key: "zip-code", label: "Zip-code", value: zipCode },
        ],
        []
    );

    const contactCardData = useMemo(
        () => [
            { key: "phone", label: "Phone", value: phone },
            { key: "email", label: "Email", value: email },
        ],
        []
    );
    return (
        <div className="flex flex-row gap-4 justify-between items-center">
            <div className="flex flex-col gap-8">
                <p className="text-4xl font-semibold">{name}</p>
                <div className="flex flex-row gap-4">
                    <LabelValuecard data={locationCardData} />
                    <LabelValuecard data={contactCardData} />
                </div>
            </div>

            {loading ? (
                <ImageLoader />
            ) : (
                <img src={logo} alt="LOGO" className="h-32 aspect-square rounded" onLoad={() => onSetLoading(false)} />
            )}
            <img src={logo} alt="LOGO" className="fixed opacity-0 w-0 h-0 rounded" onLoad={() => onSetLoading(false)} />
        </div>
    );
}
