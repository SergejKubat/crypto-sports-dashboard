import React, { useState, useContext } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

import { UserContext } from "../../context/UserContext";

import Logo from "../../assets/images/logo.png";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const login = (e) => {
        e.preventDefault();

        setTouched(true);
        setError("");

        if (username.length < 4) {
            return;
        }

        if (!validator.isStrongPassword(password)) {
            return;
        }

        const data = {
            username: username,
            password: password
        };

        axios
            .post(`${import.meta.env.VITE_API_URL}/login`, data, { withCredentials: true })
            .then((response) => {
                setUser(response.data);

                window.localStorage.setItem("user", JSON.stringify(response.data));

                navigate("/dashboard");
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    };

    return (
        <section className="login">
            <div className="login-content">
                <div className="logo">
                    <img src={Logo} alt="Logo" width="150" height="150" />
                    <h1 className="title">
                        Crypto<span style={{ color: "#b56959" }}>Sports</span>
                    </h1>
                </div>
                <div className="login-container">
                    <h1 style={{ marginBottom: "2rem" }}>Sign In</h1>
                    <form autoComplete="off" noValidate className="login-form" onSubmit={login}>
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
                        <p className="login-forgot">
                            <Link to="/forgotten-password">Forgot Password?</Link>
                        </p>
                        {error ? (
                            <p className="input-error" style={{ textAlign: "center" }}>
                                {error}
                            </p>
                        ) : null}
                        <Button text="Sign In" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
