import { Loader } from "lucide-react";

export function ImageLoader() {
    return (
        <div className="h-32 aspect-square flex items-center justify-center">
            <Loader className="loader" />
        </div>
    );
}
