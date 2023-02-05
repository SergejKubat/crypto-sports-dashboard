import React, { useState /*, useEffect, useContext*/ } from "react";

import { Row, Col } from "react-bootstrap";

import TicketCard from "../../components/Card/TicketCard";
import Input from "../../components/Form/Input";
import SelectField from "../../components/Form/Select";
import Textarea from "../../components/Form/Textarea";
import DateField from "../../components/Form/Date";
import ImageUpload from "../../components/Form/ImageUpload";
import Button from "../../components/Form/Button";

import { categories } from "../../data/category";
import { QRCodeTypes } from "../../data/QRCode";

const CreateEventPage = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState();
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [QRCodeType, setQRCodeType] = useState(QRCodeTypes[0]);
    const [image, setImage] = useState("");

    const [touched, setTouched] = useState(false);

    return (
        <div>
            <h1 className="mb-5">Create New Event</h1>
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
                    <SelectField
                        name="category"
                        label="Category"
                        value={category}
                        touched={touched}
                        required={true}
                        options={categories}
                        errorMessage="Event must have category."
                        onChange={setCategory}
                    />
                    <Textarea
                        name="description"
                        label="Description"
                        value={description}
                        onChange={setDescription}
                        touched={touched}
                        required={true}
                        maxLength={500}
                        errorMessage="Event must have description."
                        validateCb={(value) => value && value.length > 0}
                    />
                    <DateField label="Start Date" value={startDate} onChange={setStartDate} />
                    <Input
                        name="location"
                        label="Location"
                        value={location}
                        onChange={setLocation}
                        touched={touched}
                        required={true}
                        errorMessage="Event must have location."
                        validateCb={(value) => value && value.length > 0}
                    />
                    <SelectField
                        name="QRCodeType"
                        label="QR Code Type"
                        value={QRCodeType}
                        touched={touched}
                        required={true}
                        options={QRCodeTypes}
                        errorMessage="Event must have QR code type."
                        onChange={setQRCodeType}
                    />
                    <ImageUpload image={image} setImage={setImage} width="1200" height="800" />
                </Col>
                <Col xs={12} md={6}>
                    <TicketCard name="Silver" />
                    <TicketCard name="Gold" />
                    <TicketCard name="Diamond" />
                    <TicketCard name="Platinum" />
                </Col>
            </Row>
            <Button text="SAVE DRAFT" />
            <Button text="SEND FOR APPROVAL" type="success" />
        </div>
    );
};

export default CreateEventPage;
