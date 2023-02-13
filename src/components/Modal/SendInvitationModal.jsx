import React, { useState, useContext } from "react";

import { Modal, CloseButton } from "react-bootstrap";
import validator from "validator";

import Input from "../Form/Input";
import Button from "../Form/Button";

const SendInvitationModal = (props) => {
    const [email, setEmail] = useState("");
    const [touched, setTouched] = useState(false);

    const sendInvitation = (e) => {
        e.preventDefault();

        setTouched(true);

        if (!validator.isEmail(email)) {
            return;
        }

        props.cb(email);

        props.onHide();
    };

    return (
        <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
            <Modal.Header>
                <Modal.Title as="h1">Send Invitation</Modal.Title>
                <CloseButton style={{ fontSize: "1.6rem" }} onClick={props.onHide} />
            </Modal.Header>
            <Modal.Body>
                <form autoComplete="off" noValidate className="login-form" onSubmit={sendInvitation}>
                    <h2 className="my-4">Send invitation to email address.</h2>
                    <Input
                        label="Email Address"
                        type="text"
                        value={email}
                        onChange={setEmail}
                        touched={touched}
                        required={true}
                        errorMessage="Email address is not valid."
                        validateCb={(value) => value && validator.isEmail(value)}
                    />
                    <Button text="SEND" style={{ width: "12rem" }} />
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default SendInvitationModal;
