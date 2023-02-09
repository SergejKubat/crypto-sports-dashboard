import React from "react";

import { Link } from "react-router-dom";

import { formatDate } from "../../utils/date";

import { statusNameMap, statusColorMap } from "../../data/status";

const EventCard = (props) => {
    return (
        <li className="event-card">
            <Link to={`/events/${props.event._id}`}>
                <figure className="event-card-figure">
                    <img src={props.event.image} alt={props.event.name} className="event-card-img" />
                </figure>
                <div className="event-card-content">
                    <p className="event-card-date">{formatDate(props.event.startDate)}</p>
                    <p className="event-card-name">{props.event.name}</p>
                    <p className="event-card-location">{props.event.location}</p>
                    <p className="event-card-status" style={{ color: statusColorMap[props.event.status] }}>
                        {statusNameMap[props.event.status]}
                    </p>
                </div>
            </Link>
        </li>
    );
};

export default EventCard;
