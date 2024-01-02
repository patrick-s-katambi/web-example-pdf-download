import clsx from "clsx";
import { LabelValue } from "./LabelValue";

export function LabelValuecard({ data = [], withBackground = true, alignRight = false, boldValue = false }) {
    return (
        <div
            className={clsx(
                "w-fit h-fit flex flex-col",
                withBackground && "bg-gray-100 border border-gray-200 rounded-sm p-1"
            )}
        >
            {data.map(dataMapper)}
        </div>
    );

    function dataMapper(dataObject, index) {
        return (
            <LabelValue
                label={dataObject.label}
                value={dataObject.value}
                key={dataObject.key || index}
                alignRight={alignRight}
                boldValue={boldValue}
            />
        );
    }
}
