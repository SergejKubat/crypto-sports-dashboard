import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Button from "../Form/Button";

const OrganizerDetails = (props) => {
    const [name, setName] = useState(props.organizer.name);
    const [description, setDescription] = useState(props.organizer.description);
    //const [image, setImage] = useState(props.organizer.image);
    const [website, setWebsite] = useState(props.organizer.website);
    const [linkedin, setLinkedin] = useState(props.organizer.socialMedia.linkedin);
    const [twitter, setTwitter] = useState(props.organizer.socialMedia.twitter);
    const [instagram, setInstagram] = useState(props.organizer.socialMedia.instagram);
    const [youtube, setYoutube] = useState(props.organizer.socialMedia.youtube);
    const [touched, setTouched] = useState(false);

    const updateOrganizer = (e) => {
        e.preventDefault();

        setTouched(true);
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
                            validateCb={(value) => value && value.length > 3}
                        />
                        <Input
                            name="linkedin"
                            label="Linkedin"
                            value={linkedin}
                            onChange={setLinkedin}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={(value) => value && value.length > 3}
                        />
                        <Input
                            name="twitter"
                            label="Twitter"
                            value={twitter}
                            onChange={setTwitter}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={(value) => value && value.length > 3}
                        />
                        <Input
                            name="instagram"
                            label="Instagram"
                            value={instagram}
                            onChange={setInstagram}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={(value) => value && value.length > 3}
                        />
                        <Input
                            name="youtube"
                            label="Youtube"
                            value={youtube}
                            onChange={setYoutube}
                            touched={touched}
                            required={true}
                            errorMessage="URL address is not valid."
                            validateCb={(value) => value && value.length > 3}
                        />
                    </Col>
                </Row>
                <Button text="Save" style={{ width: "20rem", marginTop: "2rem" }} />
            </form>
        </div>
    );
};

export default OrganizerDetails;
