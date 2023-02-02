import React, { useContext } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineBarChart, AiOutlineLogout } from "react-icons/ai";
import { BsCalendarEvent, BsEnvelope } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import { UserContext } from "../../context/UserContext";

import Logo from "../../assets/images/logo.png";

const Navigation = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);

    const logOut = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true })
            .then(() => {
                setUser(null);

                window.localStorage.removeItem("user");

                navigate("/");
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <nav className="navigation">
            <div className="navigation-logo">
                <img src={Logo} alt="Logo" width="48" height="48" />
                <h1 className="title">
                    Crypto<span style={{ color: "#b56959" }}>Sports</span>
                </h1>
            </div>
            <ul className="navigation-list">
                <Link to="/dashboard">
                    <li className="navigation-list-item">
                        <AiOutlineHome />
                        <span>Home</span>
                    </li>
                </Link>
                <Link to="/events">
                    <li className="navigation-list-item">
                        <BsCalendarEvent />
                        <span>Events</span>
                    </li>
                </Link>
                {user.role === "admin" ? (
                    <React.Fragment>
                        <Link to="/users">
                            <li className="navigation-list-item">
                                <FaUserCircle />
                                <span>Users</span>
                            </li>
                        </Link>
                        <Link to="/invitations">
                            <li className="navigation-list-item">
                                <BsEnvelope />
                                <span>Invitations</span>
                            </li>
                        </Link>
                        <Link to="/charts">
                            <li className="navigation-list-item">
                                <AiOutlineBarChart />
                                <span>Charts</span>
                            </li>
                        </Link>
                    </React.Fragment>
                ) : null}
            </ul>
            <div className="navigation-logout" onClick={logOut}>
                <div className="navigation-list-item">
                    <AiOutlineLogout />
                    <span>Log Out</span>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
