import React, { useState, useEffect } from "react";

import axios from "axios";

import InvitationList from "../../components/List/InvitationList";
import SendInvitationModal from "../../components/Modal/SendInvitationModal";
import Button from "../../components/Form/Button";

const InvitationListPage = () => {
    const [invitations, setInvitations] = useState([]);
    const [type, setType] = useState("active");
    const [isModalOpened, setIsModalOpened] = useState(false);

    const getInvitations = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/invites?type=${type}`, { withCredentials: true })
            .then((response) => {
                setInvitations(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const sendInvitation = (email) => {
        axios
            .post(`${import.meta.env.VITE_API_URL}/invites`, { email: email }, { withCredentials: true })
            .then(() => {
                getInvitations();
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const deleteInvitation = (code) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/invites/${code}`, { withCredentials: true })
            .then(() => {
                getInvitations();
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        getInvitations();
    }, [type]);

    return (
        <div>
            <h1 className="m-0">Invitations</h1>
            <p className="my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quibusdam commodi culpa! Amet aperiam voluptates itaque
                excepturi quidem vero ab porro sed nesciunt, nostrum iste facilis eaque fugiat rerum sapiente? Molestias aperiam at ea ipsum
                velit quidem maxime? Commodi incidunt excepturi labore vitae voluptates rem esse natus voluptate maiores dolorum.
            </p>
            <Button text="Send Invitation" onClick={() => setIsModalOpened(true)} />
            <div className="my-5">
                <Button text="Active" style={{ width: "12rem", marginRight: "1rem" }} onClick={() => setType("active")} />
                <Button text="Used" type="success" style={{ width: "12rem", marginRight: "1rem" }} onClick={() => setType("used")} />
                <Button text="Expired" type="danger" style={{ width: "12rem", marginRight: "1rem" }} onClick={() => setType("expired")} />
            </div>
            <InvitationList invitations={invitations} type={type} deleteCb={deleteInvitation} />
            <SendInvitationModal show={isModalOpened} onHide={() => setIsModalOpened(false)} cb={sendInvitation} />
        </div>
    );
};

export default InvitationListPage;
