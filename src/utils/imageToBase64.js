import { convertImage } from "@requrv/image-to-base64";

/**
 *
 * @param {string} logo
 * @returns
 */
export async function getBase64ImageFromURL(logo) {
    const blob = await fetch(logo)
        .then((res) => res.blob())
        .then((blob) => blob)
        .catch((error) => {
            throw error;
        });

    const dataUrl = await convertImage(blob)
        .then((response) => response)
        .catch((error) => {
            throw error;
        });

    return dataUrl;
}
