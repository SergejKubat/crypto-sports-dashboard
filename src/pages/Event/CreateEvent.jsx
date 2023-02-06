import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import TicketCard from "../../components/Card/TicketCard";
import Input from "../../components/Form/Input";
import SelectField from "../../components/Form/Select";
import Textarea from "../../components/Form/Textarea";
import DateField from "../../components/Form/Date";
import ImageUpload from "../../components/Form/ImageUpload";
import Button from "../../components/Form/Button";

import { uploadFile } from "../../utils/file";
import { extractQRCodes } from "../../utils/QRCode";

import { categories } from "../../data/category";
import { QRCodeTypes } from "../../data/QRCode";
import { reverseTicketTypesMap } from "../../data/ticketTypes";

const CreateEventPage = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState();
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [QRCodeType, setQRCodeType] = useState(QRCodeTypes[0]);
    const [image, setImage] = useState("");
    // Silver Ticket
    const [silverChecked, setSilverChecked] = useState(false);
    const [silverImage, setSilverImage] = useState("");
    const [silverDescription, setSilverDescription] = useState("");
    const [silverPrice, setSilverPrice] = useState(0);
    const [silverAmount, setSilverAmount] = useState(0);
    const [silverExternalQRCodeFile, setSilverExternalQRCodeFile] = useState();
    // Gold Ticket
    const [goldChecked, setGoldChecked] = useState(false);
    const [goldImage, setGoldImage] = useState("");
    const [goldDescription, setGoldDescription] = useState("");
    const [goldPrice, setGoldPrice] = useState(0);
    const [goldAmount, setGoldAmount] = useState(0);
    const [goldExternalQRCodeFile, setGoldExternalQRCodeFile] = useState();
    // Platinum Ticket
    const [platinumChecked, setPlatinumChecked] = useState(false);
    const [platinumImage, setPlatinumImage] = useState("");
    const [platinumDescription, setPlatinumDescription] = useState("");
    const [platinumPrice, setPlatinumPrice] = useState(0);
    const [platinumAmount, setPlatinumAmount] = useState(0);
    const [platinumExternalQRCodeFile, setPlatinumExternalQRCodeFile] = useState();
    // Diamond Ticket
    const [diamondChecked, setDiamondChecked] = useState(false);
    const [diamondImage, setDiamondImage] = useState("");
    const [diamondDescription, setDiamondDescription] = useState("");
    const [diamondPrice, setDiamondPrice] = useState(0);
    const [diamondAmount, setDiamondAmount] = useState(0);
    const [diamondExternalQRCodeFile, setDiamondExternalQRCodeFile] = useState();

    const [touched, setTouched] = useState(false);
    const [locked, setLocked] = useState(false);

    const navigate = useNavigate();

    const validate = () => {
        if (name.length < 4) return false;

        if (!category) return false;

        if (!description) return false;

        if (new Date(startDate) < new Date()) return false;

        if (!location) return false;

        if (!QRCodeType) return false;

        if (!image) return false;

        if (!(silverChecked || goldChecked || platinumChecked || diamondChecked)) return false;

        return true;
    };

    const setTicket = (name, image, description, price, amount, QRCodeFile, QRCodes, tickets) => {
        return new Promise(async (resolve) => {
            if (!image) throw new Error(`${name} ticket must have an image.`);

            if (!description) throw new Error(`${name} ticket must have description.`);

            if (!price) throw new Error(`${name} ticket must have price.`);

            if (!amount) throw new Error(`${name} ticket must have amount.`);

            if (QRCodeType.value === "External") {
                if (!QRCodeFile) throw new Error(`${name} ticket must have file with QR codes.`);

                const rawQRCodes = await extractQRCodes(QRCodeFile);

                QRCodes[reverseTicketTypesMap[name]] = rawQRCodes;
            }

            const url = await uploadFile(image);

            tickets[name] = {
                amount: parseInt(amount),
                price: parseFloat(price),
                metadata: {
                    description: description,
                    url: url
                }
            };

            resolve(true);
        });
    };

    const saveEvent = async (type) => {
        setTouched(true);

        if (!validate()) return;

        setLocked(true);

        const tickets = {};
        const QRCodes = {};

        try {
            if (silverChecked)
                await setTicket(
                    "Silver",
                    silverImage,
                    silverDescription,
                    silverPrice,
                    silverAmount,
                    silverExternalQRCodeFile,
                    QRCodes,
                    tickets
                );

            if (goldChecked)
                await setTicket("Gold", goldImage, goldDescription, goldPrice, goldAmount, goldExternalQRCodeFile, QRCodes, tickets);

            if (platinumChecked)
                await setTicket(
                    "Platinum",
                    platinumImage,
                    platinumDescription,
                    platinumPrice,
                    platinumAmount,
                    platinumExternalQRCodeFile,
                    QRCodes,
                    tickets
                );

            if (diamondChecked)
                await setTicket(
                    "Diamond",
                    diamondImage,
                    diamondDescription,
                    diamondPrice,
                    diamondAmount,
                    diamondExternalQRCodeFile,
                    QRCodes,
                    tickets
                );

            const imageURL = await uploadFile(image);

            const data = {
                name: name,
                category: category.value,
                description: description,
                startDate: startDate,
                location: location,
                isQRExternal: QRCodeType.value === "External",
                image: imageURL,
                tickets: tickets
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/events`, data, { withCredentials: true });

            const event = response.data;

            console.log("event: ", event);

            await axios.post(`${import.meta.env.VITE_API_URL}/events/${event._id}/qr-codes`, QRCodes, { withCredentials: true });

            navigate("/events");
        } catch (error) {
            setLocked(false);

            console.log(error);
        }
    };

    return (
        <div className={locked ? "locked" : ""}>
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
                    <TicketCard
                        name="Silver"
                        touched={touched}
                        checked={silverChecked}
                        setChecked={setSilverChecked}
                        image={silverImage}
                        setImage={setSilverImage}
                        description={silverDescription}
                        setDescription={setSilverDescription}
                        price={silverPrice}
                        setPrice={setSilverPrice}
                        amount={silverAmount}
                        setAmount={setSilverAmount}
                        isExternalQRCode={QRCodeType.value === "External"}
                        setQRCodes={setSilverExternalQRCodeFile}
                    />
                    <TicketCard
                        name="Gold"
                        touched={touched}
                        checked={goldChecked}
                        setChecked={setGoldChecked}
                        image={goldImage}
                        setImage={setGoldImage}
                        description={goldDescription}
                        setDescription={setGoldDescription}
                        price={goldPrice}
                        setPrice={setGoldPrice}
                        amount={goldAmount}
                        setAmount={setGoldAmount}
                        isExternalQRCode={QRCodeType.value === "External"}
                        setQRCodes={setGoldExternalQRCodeFile}
                    />
                    <TicketCard
                        name="Platinum"
                        touched={touched}
                        checked={platinumChecked}
                        setChecked={setPlatinumChecked}
                        image={platinumImage}
                        setImage={setPlatinumImage}
                        description={platinumDescription}
                        setDescription={setPlatinumDescription}
                        price={platinumPrice}
                        setPrice={setPlatinumPrice}
                        amount={platinumAmount}
                        setAmount={setPlatinumAmount}
                        isExternalQRCode={QRCodeType.value === "External"}
                        setQRCodes={setPlatinumExternalQRCodeFile}
                    />
                    <TicketCard
                        name="Diamond"
                        touched={touched}
                        checked={diamondChecked}
                        setChecked={setDiamondChecked}
                        image={diamondImage}
                        setImage={setDiamondImage}
                        description={diamondDescription}
                        setDescription={setDiamondDescription}
                        price={diamondPrice}
                        setPrice={setDiamondPrice}
                        amount={diamondAmount}
                        setAmount={setDiamondAmount}
                        isExternalQRCode={QRCodeType.value === "External"}
                        setQRCodes={setDiamondExternalQRCodeFile}
                    />
                </Col>
            </Row>
            <div className="d-flex justify-content-end mt-5" style={{ gap: "1.5rem" }}>
                <Button text="SAVE DRAFT" onClick={() => saveEvent("draft")} />
                <Button text="SEND FOR APPROVAL" type="success" onClick={() => saveEvent("for-approval")} />
            </div>
        </div>
    );
};

export default CreateEventPage;
