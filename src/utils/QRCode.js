import JSZip from "jszip";
import jsQR from "jsqr";
import UPNG from "upng-js";

export const extractQRCodes = (file) => {
    return new Promise((resolve, reject) => {
        const zip = new JSZip();
        zip.loadAsync(file).then((content) => {
            const promises = [];

            Object.keys(content.files).forEach((filename) => {
                promises.push(
                    zip
                        .file(filename)
                        .async("blob")
                        .then((data) => {
                            return scanQRBase64(data);
                        })
                );
            });

            Promise.all(promises)
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => reject(error));
        });
    });
};

export async function scanQRBase64(blob) {
    return await new Promise(async (resolve, reject) => {
        const myReader = new FileReader();

        myReader.readAsArrayBuffer(blob);

        myReader.addEventListener("loadend", () => {
            const buffer = myReader.result;

            try {
                const img = UPNG.decode(buffer);
                const rgba = UPNG.toRGBA8(img)[0];
                const code = jsQR(new Uint8ClampedArray(rgba), img.width, img.height);

                if (code !== null) return resolve(code.data);
                else return reject(new Error("decode failed"));
            } catch (err) {
                if (typeof err === "string") return reject(new Error(err));

                if (err instanceof Error) return reject(new Error(err.message));
            }
        });
    });
}
