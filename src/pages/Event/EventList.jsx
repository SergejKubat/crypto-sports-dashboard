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
            .get(`${import.meta.env.VITE_API_URL}/events${user.role === "organizer" ? `?user=${user._id}` : ""}`)
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum vitae velit placeat odio accusamus! Quae, similique nihil.
                Voluptates voluptatum quis quisquam inventore! Ipsum itaque omnis vel placeat cum incidunt fugit nobis accusamus, ducimus
                quasi ut laborum fuga officia quo, nisi, eos qui saepe? Adipisci, animi alias enim aspernatur laborum iusto!
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
