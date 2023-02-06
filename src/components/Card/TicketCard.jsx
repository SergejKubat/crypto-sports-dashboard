import React, { useState /*, useEffect, useContext*/ } from "react";

import { Col, Row } from "react-bootstrap";

import Checkbox from "../Form/Checkbox";
import ImageUpload from "../Form/ImageUpload";
import Textarea from "../Form/Textarea";
import Input from "../Form/Input";
import QRCodeUpload from "../Form/QRCodeUpload";

const TicketCard = (props) => {
    return (
        <div className="ticket-card">
            <div className="ticket-card-header">
                <Checkbox defaultChecked={props.checked} onChange={props.setChecked} /> <p className="name m-0">{props.name} Ticket</p>
            </div>
            <Row className={props.checked ? "" : "locked"} style={{ "--bs-gutter-x": "2rem" }}>
                <Col md={5}>
                    <ImageUpload image={props.image} setImage={props.setImage} width="400" height="400" />
                </Col>
                <Col md={7} className="ticket-card-content">
                    <Textarea
                        name="description"
                        label="Description"
                        value={props.description}
                        onChange={props.setDescription}
                        touched={props.touched}
                        required={true}
                        maxLength={500}
                        style={{ margin: 0 }}
                        inputStyle={{ height: "22rem" }}
                        errorMessage="Ticket must have a description."
                        validateCb={(value) => value && value.length > 0}
                    />
                    <div className="ticket-card-details">
                        <Input
                            name="price"
                            label="Price (ETH)"
                            min="0"
                            step="any"
                            type="number"
                            value={props.price}
                            onChange={props.setPrice}
                            touched={props.touched}
                            style={{ marginBottom: 0 }}
                            errorMessage="Ticket must have price."
                            validateCb={(value) => value && value > 0}
                        />
                        <Input
                            name="amount"
                            label="Amount"
                            min="0"
                            type="number"
                            value={props.amount}
                            onChange={props.setAmount}
                            touched={props.touched}
                            style={{ marginBottom: 0 }}
                            errorMessage="Ticket must have amount."
                            validateCb={(value) => value && value > 0}
                        />
                    </div>
                </Col>
                {props.isExternalQRCode ? (
                    <Col md={5}>
                        <QRCodeUpload setQRCodes={props.setQRCodes} />
                    </Col>
                ) : null}
            </Row>
        </div>
    );
};

export default TicketCard;
