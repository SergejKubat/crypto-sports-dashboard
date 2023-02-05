import React, { useState, useEffect, useRef } from "react";

import { BsImageFill } from "react-icons/bs";

import { ACCEPTED_MIME_TYPES, TWO_MEGABYTES } from "../../data/constants";

const ImageUpload = (props) => {
    const [image, setImage] = useState(props.image);
    const [error, setError] = useState("");

    const filePicker = useRef();

    const validate = (file) => {
        if (!file) return false;

        if (!file.type.startsWith("image/")) {
            setError("You must provide an image.");
            return false;
        }

        if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
            setError("You must provide accepted image extension.");
            return false;
        }

        if (file.size > TWO_MEGABYTES) {
            setErrorMessage("Your image size is over 2 MB.");
            return false;
        }

        return true;
    };

    const onFileChange = (e) => {
        setError("");

        const file = e.target.files[0];

        if (!validate(file)) return;

        const fileReader = new FileReader();

        fileReader.addEventListener("load", (e) => {
            const url = e.target.result;

            setImage(url);
        });

        fileReader.readAsDataURL(file);

        e.target.value = null;
    };

    const onFileInputClick = () => {
        filePicker.current.click();
    };

    useEffect(() => {
        //props.setImage(image);
    }, [image]);

    return (
        <div className="image-upload" style={props.style}>
            <div className="input-header">
                <label className="label">Image</label>
            </div>
            <input
                type="file"
                accept={["image/jpeg", "image/png", "image/gif", "image/webp"]}
                ref={filePicker}
                className="image-upload-input"
                onChange={onFileChange}
            />
            {image ? (
                <React.Fragment>
                    <img src={image} alt="Upload Image" className="image-upload-preview" />
                    <p className="image-upload-other" onClick={onFileInputClick}>
                        Upload Other Image
                    </p>
                </React.Fragment>
            ) : (
                <div className="image-upload-box" onClick={onFileInputClick}>
                    <BsImageFill className="icon" />
                    <p className="mt-3">
                        Dimensions must be {props.width}x{props.height} and the maximum size iz 2 MB (.jpg, .png, .gif or .webp)
                    </p>
                </div>
            )}
            {error ? <p className="input-error">{error}</p> : null}
        </div>
    );
};

export default ImageUpload;
