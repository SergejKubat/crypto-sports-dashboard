import React, { useState /*, useEffect, useContext*/ } from "react";

import { Col, Row } from "react-bootstrap";

import Checkbox from "../Form/Checkbox";
import ImageUpload from "../Form/ImageUpload";
import Textarea from "../Form/Textarea";
import Input from "../Form/Input";

const TicketCard = (props) => {
    return (
        <div className="ticket-card">
            <div className="ticket-card-header">
                <Checkbox /> <p className="name m-0">{props.name} Ticket</p>
            </div>
            <Row style={{ "--bs-gutter-x": "2rem" }}>
                <Col md={5}>
                    <ImageUpload image={null} width="400" height="400" />
                </Col>
                <Col md={7}>
                    <Textarea
                        name="description"
                        label="Description"
                        /*value={description}
                    onChange={setDescription}
                    touched={touched}*/
                        required={true}
                        maxLength={500}
                        style={{ height: "22rem" }}
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
                            /*defaultValue={props.price}
                            onChange={props.setPrice}*/
                            //touched={enabled && props.touched}
                            style={{ marginBottom: 0 }}
                            errorMessage="Ticket must have price."
                            validateCb={(value) => value && value > 0}
                        />
                        <Input
                            name="amount"
                            label="Amount"
                            min="0"
                            type="number"
                            /*defaultValue={props.price}
                            onChange={props.setPrice}*/
                            //touched={enabled && props.touched}
                            style={{ marginBottom: 0 }}
                            errorMessage="Ticket must have amount."
                            validateCb={(value) => value && value > 0}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TicketCard;
