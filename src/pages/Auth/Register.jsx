import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import validator from "validator";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

import { UserContext } from "../../context/UserContext";

import Logo from "../../assets/images/logo.png";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [expired, setExpired] = useState(false);
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");

    const params = useParams();

    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const register = (e) => {
        e.preventDefault();

        setTouched(true);
        setError("");

        if (username.length < 4) {
            return;
        }

        if (!validator.isStrongPassword(password)) {
            return;
        }

        if (password !== confirmPassword) {
            return;
        }

        const data = {
            username: username,
            password: password
        };

        axios
            .post(`${import.meta.env.VITE_API_URL}/register`, data, { withCredentials: true })
            .then((response) => {
                setUser(response.data);

                window.localStorage.setItem("user", JSON.stringify(response.data));

                navigate("/dashboard");
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/invites/${params.invitationCode}`)
            .then((response) => {
                const TWO_HOURS = 2 * 60 * 60 * 1000;

                const currentDate = new Date();
                const invitationDate = new Date(response.data.createdAt);

                // if date difference is greather than 2 hours
                if (currentDate.getTime() - invitationDate > TWO_HOURS) {
                    setExpired(true);
                }
            })
            .catch((error) => {
                console.log(error);
                navigate("/");
            });
    }, [params.invitationCode]);

    return (
        <section className="register">
            <div className="register-content">
                <div className="logo">
                    <img src={Logo} alt="Logo" width="150" height="150" />
                    <h1 className="title">
                        Crypto<span style={{ color: "#b56959" }}>Sports</span>
                    </h1>
                </div>
                <div className="register-container">
                    {expired ? (
                        <p style={{ margin: "2rem 0" }}>Unfortunately, the link has expired.</p>
                    ) : (
                        <React.Fragment>
                            <h1 style={{ marginBottom: "2rem" }}>Sign Up</h1>
                            <form autoComplete="off" noValidate className="register-form" onSubmit={register}>
                                <Input
                                    name="username"
                                    label="Username"
                                    value={username}
                                    onChange={setUsername}
                                    touched={touched}
                                    required={true}
                                    errorMessage="Username must contain at least 3 characters."
                                    validateCb={(value) => value && value.length > 3}
                                />
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
                                    errorMessage="Passwords does not match."
                                    validateCb={(value) => value && value === password}
                                />
                                {error ? (
                                    <p className="input-error" style={{ textAlign: "center" }}>
                                        {error}
                                    </p>
                                ) : null}
                                <Button text="Sign Up" />
                            </form>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
