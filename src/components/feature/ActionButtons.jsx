import { DownloadCloud, ScanEye } from "lucide-react";

export function ActionButtons({ onOpen, onDownload }) {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4">
            <button
                onClick={onDownload}
                className="bg-gray-900 hover:bg-gray-700 transition-all text-white h-14 w-14 rounded-full flex items-center justify-center group active:scale-90"
            >
                <DownloadCloud className="group-hover:scale-90 transition-all" />
            </button>

            <button
                onClick={onOpen}
                className="bg-gray-900 hover:bg-gray-700 transition-all text-white h-14 w-14 rounded-full flex items-center justify-center group active:scale-90"
            >
                <ScanEye className="group-hover:scale-90 transition-all" />
            </button>
        </div>
    );
}
