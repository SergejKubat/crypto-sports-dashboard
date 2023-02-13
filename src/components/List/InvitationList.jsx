import React, { useState } from "react";

import { MdDelete } from "react-icons/md";

import { formatDate } from "../../utils/date";

const InvitationList = (props) => {
    return (
        <div className="purchases-list">
            <table className="purchases-list-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Email</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.invitations.length > 0 ? (
                        props.invitations.map((invitation) => (
                            <tr key={invitation._id}>
                                <td data-column="Code">{invitation._id}</td>
                                <td data-column="Email">{invitation.email}</td>
                                <td data-column="Date Created">{formatDate(invitation.createdAt)}</td>
                                <td data-column="Actions">
                                    <MdDelete title="Delete" className="delete" onClick={() => props.deleteCb(invitation._id)} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td style={{ backgroundColor: "#f6f6f6", borderBottom: "none" }}>There are no {props.type} invitations.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InvitationList;
