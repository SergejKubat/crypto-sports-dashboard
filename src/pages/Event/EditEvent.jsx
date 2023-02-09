import React, { useState, useEffect } from "react";

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

import { categories } from "../../data/category";
import { QRCodeTypes } from "../../data/QRCode";

const EditEvent = (props) => {
    const [name, setName] = useState(props.event.name);
    const [category, setCategory] = useState({ value: props.event.category, label: props.event.category });
    const [description, setDescription] = useState(props.event.description);
    const [startDate, setStartDate] = useState(new Date(props.event.startDate));
    const [location, setLocation] = useState(props.event.location);
    const [QRCodeType, setQRCodeType] = useState({
        value: props.event.isQRExternal ? "External" : "Internal",
        label: props.event.isQRExternal ? "External" : "Internal"
    });
    const [image, setImage] = useState(props.event.image);
    // Silver Ticket
    const [silverChecked, setSilverChecked] = useState(false);
    const [silverImage, setSilverImage] = useState("");
    const [silverDescription, setSilverDescription] = useState("");
    const [silverPrice, setSilverPrice] = useState(0);
    const [silverAmount, setSilverAmount] = useState(0);
    // Gold Ticket
    const [goldChecked, setGoldChecked] = useState(false);
    const [goldImage, setGoldImage] = useState("");
    const [goldDescription, setGoldDescription] = useState("");
    const [goldPrice, setGoldPrice] = useState(0);
    const [goldAmount, setGoldAmount] = useState(0);
    // Platinum Ticket
    const [platinumChecked, setPlatinumChecked] = useState(false);
    const [platinumImage, setPlatinumImage] = useState("");
    const [platinumDescription, setPlatinumDescription] = useState("");
    const [platinumPrice, setPlatinumPrice] = useState(0);
    const [platinumAmount, setPlatinumAmount] = useState(0);
    // Diamond Ticket
    const [diamondChecked, setDiamondChecked] = useState(false);
    const [diamondImage, setDiamondImage] = useState("");
    const [diamondDescription, setDiamondDescription] = useState("");
    const [diamondPrice, setDiamondPrice] = useState(0);
    const [diamondAmount, setDiamondAmount] = useState(0);

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

    const setTicket = (name, image, description, price, amount, tickets) => {
        return new Promise(async (resolve) => {
            if (!image) throw new Error(`${name} ticket must have an image.`);

            if (!description) throw new Error(`${name} ticket must have description.`);

            if (!price) throw new Error(`${name} ticket must have price.`);

            if (!amount) throw new Error(`${name} ticket must have amount.`);

            let url;

            if (image.startsWith("http")) {
                url = image;
            } else {
                url = await uploadFile(image);
            }

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

        try {
            if (silverChecked) await setTicket("Silver", silverImage, silverDescription, silverPrice, silverAmount, tickets);

            if (goldChecked) await setTicket("Gold", goldImage, goldDescription, goldPrice, goldAmount, tickets);

            if (platinumChecked) await setTicket("Platinum", platinumImage, platinumDescription, platinumPrice, platinumAmount, tickets);

            if (diamondChecked) await setTicket("Diamond", diamondImage, diamondDescription, diamondPrice, diamondAmount, tickets);

            let imageURL;

            if (image.startsWith("http")) {
                imageURL = image;
            } else {
                imageURL = await uploadFile(image);
            }

            const data = {
                name: name,
                category: category.value,
                description: description,
                startDate: startDate,
                location: location,
                isQRExternal: QRCodeType.value === "External",
                image: imageURL,
                tickets: tickets,
                status: type
            };

            await axios.put(`${import.meta.env.VITE_API_URL}/events/${props.event._id}`, data, { withCredentials: true });

            navigate("/events");
        } catch (error) {
            setLocked(false);

            console.log(error);
        }
    };

    useEffect(() => {
        const tickets = props.event.tickets;

        if (tickets.Silver) {
            setSilverChecked(true);
            setSilverImage(tickets.Silver.metadata.url);
            setSilverDescription(tickets.Silver.metadata.description);
            setSilverPrice(tickets.Silver.price);
            setSilverAmount(tickets.Silver.amount);
        }

        if (tickets.Gold) {
            setGoldChecked(true);
            setGoldImage(tickets.Gold.metadata.url);
            setGoldDescription(tickets.Gold.metadata.description);
            setGoldPrice(tickets.Gold.price);
            setGoldAmount(tickets.Gold.amount);
        }

        if (tickets.Platinum) {
            setPlatinumChecked(true);
            setPlatinumImage(tickets.Platinum.metadata.url);
            setPlatinumDescription(tickets.Platinum.metadata.description);
            setPlatinumPrice(tickets.Platinum.price);
            setPlatinumAmount(tickets.Platinum.amount);
        }

        if (tickets.Diamond) {
            setDiamondChecked(true);
            setDiamondImage(tickets.Diamond.metadata.url);
            setDiamondDescription(tickets.Diamond.metadata.description);
            setDiamondPrice(tickets.Diamond.price);
            setDiamondAmount(tickets.Diamond.amount);
        }

        if (props.event.status === "under-approval") {
            setLocked(true);
        }
    }, []);

    return (
        <div className={locked ? "locked" : ""}>
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
                    />
                </Col>
            </Row>
            <div className="d-flex justify-content-end mt-5" style={{ gap: "1.5rem" }}>
                <Button text="SAVE DRAFT" onClick={() => saveEvent("draft")} />
                <Button text="SEND FOR APPROVAL" type="success" onClick={() => saveEvent("under-approval")} />
            </div>
        </div>
    );
};

export default EditEvent;
