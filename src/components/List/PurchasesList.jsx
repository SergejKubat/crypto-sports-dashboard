import React from "react";

import { AiFillCheckCircle } from "react-icons/ai";

import { formatDate } from "../../utils/date";

import { ticketTypesMap } from "../../data/ticketTypes";

const PurchasesList = (props) => {
    return (
        <div className="purchases-list">
            <h2 className="mb-4">Purchase Records</h2>
            <table className="purchases-list-table">
                <thead>
                    <tr>
                        <th>Token ID</th>
                        <th>Type</th>
                        <th>Owner</th>
                        <th>Used</th>
                        <th>Purchased</th>
                    </tr>
                </thead>
                <tbody>
                    {props.purchasedTickets.length > 0 ? (
                        props.purchasedTickets.map((purchasedTicket) => (
                            <tr key={purchasedTicket._id}>
                                <td data-column="Token ID">{purchasedTicket.tokenId}</td>
                                <td data-column="Type">{ticketTypesMap[purchasedTicket.type]}</td>
                                <td data-column="Owner">{purchasedTicket.owner}</td>
                                <td data-column="Used">
                                    <AiFillCheckCircle
                                        title={purchasedTicket.used ? "Used" : "Not used"}
                                        className={purchasedTicket.used ? "used" : "not-used"}
                                    />
                                </td>
                                <td data-column="Purchased">{formatDate(purchasedTicket.createdAt)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td style={{ backgroundColor: "#f6f6f6", borderBottom: "none" }}>There are no purchases yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PurchasesList;
