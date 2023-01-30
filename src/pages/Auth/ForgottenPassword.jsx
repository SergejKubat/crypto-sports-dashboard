import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

const ForgottenPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const sendResetPasswordRequest = (e) => {
        e.preventDefault();

        setTouched(true);
        setError("");

        if (!validator.isEmail(email)) {
            return;
        }

        const data = {
            email: email
        };

        axios
            .post(`${import.meta.env.VITE_API_URL}/resetPasswordRequests`, data)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    };

    return (
        <section className="forgotten-password">
            <div className="forgotten-password-container">
                <h1>Forgotten Password</h1>
                <p style={{ marginBottom: "2rem" }}>Please enter the email you use to Sign In to your account</p>
                <form autoComplete="off" noValidate className="login-form" onSubmit={sendResetPasswordRequest}>
                    <Input
                        name="email"
                        label="Email Address"
                        value={email}
                        onChange={setEmail}
                        touched={touched}
                        required={true}
                        errorMessage="Email address is not valid."
                        validateCb={(value) => value && validator.isEmail(value)}
                    />
                    {error ? (
                        <p className="input-error" style={{ textAlign: "center" }}>
                            {error}
                        </p>
                    ) : null}
                    <Button text="Submit" />
                </form>
            </div>
        </section>
    );
};

export default ForgottenPasswordPage;
