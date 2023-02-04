import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import ConnectWalletModal from "../components/Modal/ConnectWalletModal";
import OrganizerDetails from "../components/Details/OrganizerDetails";
import Button from "../components/Form/Button";

import { UserContext } from "../context/UserContext";
import { WalletContext } from "../context/WalletContext";

const DashboardPage = () => {
    const [organizer, setOrganizer] = useState();
    const [isModalOpened, setIsModalOpened] = useState(false);

    const { user } = useContext(UserContext);

    const { walletAddress } = useContext(WalletContext);

    const getOrganizer = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/organizers/users/${user._id}`)
            .then((response) => {
                setOrganizer(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        if (user.role === "organizer") {
            getOrganizer();
        }
    }, []);

    return (
        <div>
            <h1 className="m-0">Welcome back, {user.username}</h1>
            <p className="my-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque rem, nihil commodi, delectus provident cumque molestiae
                libero exercitationem sequi quos harum autem sunt deserunt nesciunt reprehenderit repudiandae modi molestias saepe! At iure
                corrupti, magni tempora doloremque eum numquam sapiente perferendis explicabo deserunt temporibus consequuntur autem cumque
                iste assumenda quidem illo.
            </p>
            <h2 className="mt-5 mb-4">Account Details</h2>
            <p>
                <b>Email:</b> {user.email}
            </p>
            {walletAddress ? (
                <p>
                    <b>Wallet Address:</b> {walletAddress}
                </p>
            ) : (
                <Button text="Connect Wallet" onClick={() => setIsModalOpened(true)} />
            )}
            {user.role === "organizer" && organizer ? <OrganizerDetails organizer={organizer} setOrganizer={setOrganizer} /> : null}
            <ConnectWalletModal show={isModalOpened} onHide={() => setIsModalOpened(false)} />
        </div>
    );
};

export default DashboardPage;
