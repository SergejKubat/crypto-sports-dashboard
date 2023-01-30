import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams, /*useNavigate,*/ Link } from "react-router-dom";
import validator from "validator";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [expired, setExpired] = useState(false);
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");

    const params = useParams();

    const navigate = useNavigate();

    const resetPassword = (e) => {
        e.preventDefault();

        setTouched(true);
        setError("");

        if (!validator.isStrongPassword(password)) {
            return;
        }

        if (password !== confirmPassword) {
            return;
        }

        const data = {
            id: params.code,
            password: password
        };

        console.log(data);

        axios
            .post(`${import.meta.env.VITE_API_URL}/reset-password`, data)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/resetPasswordRequests/${params.code}`)
            .then((response) => {
                const TWO_HOURS = 2 * 60 * 60 * 1000;

                const currentDate = new Date();
                const requestDate = new Date(response.data.createdAt);

                // if date difference is greather than 2 hours
                if (currentDate.getTime() - requestDate > TWO_HOURS) {
                    setExpired(true);
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                navigate("/");
            });
    }, [params.code]);

    return (
        <section className="reset-password">
            <div className="reset-password-container">
                <h1>Reset Password</h1>
                {expired ? (
                    <React.Fragment>
                        <p style={{ margin: "2rem 0" }}>
                            Unfortunately, the link has expired. <br /> Please submit a new password reset request.
                        </p>
                        <Link to="/forgotten-password">Submit new request</Link>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <p style={{ marginBottom: "2rem" }}>Please enter new password for your account</p>
                        <form autoComplete="off" noValidate className="register-form" onSubmit={resetPassword}>
                            <Input
                                name="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                                touched={touched}
                                required={true}
                                errorMessage="Password must containt at least 8 characters."
                                validateCb={(value) => value && validator.isStrongPassword(value)}
                            />
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                touched={touched}
                                required={true}
                                errorMessage="Passwords do not match."
                                validateCb={(value) => value && value === password}
                            />
                            {error ? (
                                <p className="input-error" style={{ textAlign: "center" }}>
                                    {error}
                                </p>
                            ) : null}
                            <Button text="Reset Password" />
                        </form>
                    </React.Fragment>
                )}
            </div>
        </section>
    );
};

export default ResetPasswordPage;
