import React, { useState } from "react";

import axios from "axios";
import validator from "validator";
import { Row, Col } from "react-bootstrap";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import ImageUpload from "../Form/ImageUpload";
import Button from "../Form/Button";

import { uploadFile } from "../../utils/file";

const OrganizerDetails = (props) => {
    const [name, setName] = useState(props.organizer.name);
    const [description, setDescription] = useState(props.organizer.description);
    const [image, setImage] = useState(props.organizer.image);
    const [website, setWebsite] = useState(props.organizer.website);
    const [linkedin, setLinkedin] = useState(props.organizer.socialMedia.linkedin);
    const [twitter, setTwitter] = useState(props.organizer.socialMedia.twitter);
    const [instagram, setInstagram] = useState(props.organizer.socialMedia.instagram);
    const [youtube, setYoutube] = useState(props.organizer.socialMedia.youtube);
    const [touched, setTouched] = useState(false);

    const validate = async () => {
        if (name.length < 4) return false;

        if (!image) return false;

        if (!validator.isURL(website)) return false;

        if (linkedin && !validator.isURL(linkedin)) return false;

        if (twitter && !validator.isURL(twitter)) return false;

        if (instagram && !validator.isURL(instagram)) return false;

        if (youtube && !validator.isURL(youtube)) return false;

        return true;
    };

    const updateOrganizer = async (e) => {
        e.preventDefault();

        setTouched(true);

        if (!validate()) return;

        const imageURL = await uploadFile(image);

        const data = {
            name: name,
            image: imageURL,
            description: description,
            website: website,
            socialMedia: {
                linkedin: linkedin,
                twitter: twitter,
                instagram: instagram,
                youtube: youtube
            }
        };

        axios
            .put(`${import.meta.env.VITE_API_URL}/organizers/${props.organizer._id}`, data, { withCredentials: true })
            .then((response) => {
                props.setOrganizer(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const validateSocialMedia = (value) => {
        if (value) {
            return validator.isURL(value);
        } else {
            return true;
        }
    };

    return (
        <div>
            <h2 className="mt-5 mb-4">Organizer Details</h2>
            <form autoComplete="off" noValidate className="login-form" onSubmit={updateOrganizer}>
                <Row style={{ "--bs-gutter-x": "3rem" }}>
                    <Col xs={12} md={6}>
                        <Input
                            name="name"
                            label="Name"
                            value={name}
                            onChange={setName}
                            touched={touched}
                            required={true}
                            errorMessage="Name must contain at least 3 characters."
                            validateCb={(value) => value && value.length > 3}
                        />
                        <Textarea
                            name="description"
                            label="Description"
                            value={description}
                            onChange={setDescription}
                            touched={touched}
                            required={true}
                            maxLength={500}
                        />
                        <ImageUpload image={image} setImage={setImage} width="1200" height="800" />
                    </Col>
                    <Col xs={12} md={6}>
                        <Input
                            name="website"
                            label="Website"
                            value={website}
                            onChange={setWebsite}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={(value) => value && validator.isURL(value)}
                        />
                        <Input
                            name="linkedin"
                            label="Linkedin"
                            value={linkedin}
                            onChange={setLinkedin}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={validateSocialMedia}
                        />
                        <Input
                            name="twitter"
                            label="Twitter"
                            value={twitter}
                            onChange={setTwitter}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={validateSocialMedia}
                        />
                        <Input
                            name="instagram"
                            label="Instagram"
                            value={instagram}
                            onChange={setInstagram}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={validateSocialMedia}
                        />
                        <Input
                            name="youtube"
                            label="Youtube"
                            value={youtube}
                            onChange={setYoutube}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={validateSocialMedia}
                        />
                    </Col>
                </Row>
                <Button text="Save" style={{ width: "20rem", marginTop: "2rem" }} />
            </form>
        </div>
    );
};

export default OrganizerDetails;
