import clsx from "clsx";

export function LabelValue({ label, value, alignRight, boldValue }) {
    return (
        <p className={clsx("text-sm", alignRight && "text-right")}>
            <span className={"text-gray-500"}>{label}:</span>{" "}
            <span className={clsx(boldValue && "font-semibold")}>{value}</span>
        </p>
    );
}
