import axios from "axios";

import { mimeTypeMap } from "../data/mimeType";

export const uploadFile = (dataURL) => {
    return new Promise((resolve, reject) => {
        const file = dataURLToFile(dataURL);

        const data = new FormData();

        data.append("file", file);

        axios
            .post(`${import.meta.env.VITE_API_URL}/files/upload`, data, { withCredentials: true })
            .then((response) => {
                resolve(response.data.url);
            })
            .catch((error) => {
                reject(error.response.data);
            });
    });
};

const dataURLToFile = (dataURL) => {
    const arr = dataURL.split(",");

    const mime = arr[0].match(/:(.*?);/)[1];

    const bstr = atob(arr[1]);

    let n = bstr.length;

    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], `file.${mimeTypeMap[mime]}`, { type: mime });
};
