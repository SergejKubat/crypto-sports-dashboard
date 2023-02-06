import React, { useState, useRef } from "react";

import JSZip from "jszip";
import { AiFillFileZip } from "react-icons/ai";

import { QR_CODE_ACCEPTED_MIME_TYPES } from "../../data/constants";

const QRCodeUpload = (props) => {
    const [QRCodeAmount, setQRCodeAmount] = useState(0);

    const filePicker = useRef();

    const onFileInputClick = () => {
        filePicker.current.click();
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const zip = new JSZip();

        zip.loadAsync(file)
            .then((content) => {
                setQRCodeAmount(Object.keys(content.files).length);
            })
            .catch((error) => {
                console.log(error);
            });

        if (props.setQRCodes) {
            props.setQRCodes(file);
        }
    };

    return (
        <div className="qr-code-upload" onClick={onFileInputClick}>
            <input type="file" accept={QR_CODE_ACCEPTED_MIME_TYPES} ref={filePicker} onChange={onFileChange} />
            <AiFillFileZip style={QRCodeAmount ? { color: "#2196f3" } : null} />
            <p className="m-0">{QRCodeAmount ? `${QRCodeAmount} QR codes uploaded.` : "Upload QR codes."}</p>
        </div>
    );
};

export default QRCodeUpload;
