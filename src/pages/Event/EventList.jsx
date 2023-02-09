import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import EventCard from "../../components/Card/EventCard";
import Button from "../../components/Form/Button";

import { UserContext } from "../../context/UserContext";

const EventListPage = () => {
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const getEvents = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/events${user.role === "organizer" ? `?user=${user._id}` : ""}`, { withCredentials: true })
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div>
            <h1 className="m-0">Events</h1>
            <p className="my-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum mollitia itaque quasi beatae. Unde dolorum autem iure
                omnis, cumque impedit reiciendis libero, perspiciatis necessitatibus eveniet illo praesentium distinctio accusamus
                asperiores. Obcaecati necessitatibus inventore exercitationem at pariatur perspiciatis fugit soluta quia odio porro hic
                dolores laboriosam laudantium, aliquid id.
            </p>
            <Button text="Create New Event" onClick={() => navigate("/events/create")} />
            <div className="list">
                <ul className="list-content">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventListPage;
