import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import EditEvent from "./EditEvent";
import EventDetails from "./EventDetails";

import { formatDate } from "../../utils/date";

import { statusNameMap, statusColorMap } from "../../data/status";

import "react-tabs/style/react-tabs.css";

const EventPage = () => {
    const [event, setEvent] = useState();

    const params = useParams();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/events/${params.id}`)
            .then((response) => {
                const _event = response.data;

                setEvent(_event);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }, [params.id]);

    return event ? (
        <div>
            <h1 className="mb-3">{event.name}</h1>
            <div className="mb-5">
                <p>
                    Status:{" "}
                    <span style={{ color: statusColorMap[event.status] }}>
                        <b>{statusNameMap[event.status]}</b>
                    </span>
                </p>
                <p>
                    Last updated: <b>{formatDate(event.updatedAt)}</b>
                </p>
            </div>
            {event.status === "published" ? (
                <Tabs>
                    <TabList>
                        <Tab>Edit</Tab>
                        <Tab>Details</Tab>
                    </TabList>

                    <TabPanel>
                        <EditEvent event={event} />
                    </TabPanel>
                    <TabPanel>
                        <EventDetails event={event} />
                    </TabPanel>
                </Tabs>
            ) : (
                <EditEvent event={event} />
            )}
        </div>
    ) : null;
};

export default EventPage;
