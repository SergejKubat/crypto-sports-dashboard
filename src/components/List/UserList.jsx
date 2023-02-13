import React from "react";

import { formatDate } from "../../utils/date";

const UserList = (props) => {
    return (
        <div className="purchases-list">
            <table className="purchases-list-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Wallet Address</th>
                        <th>Role</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user) => (
                        <tr key={user._id}>
                            <td data-column="Username">{user.username}</td>
                            <td data-column="Email">{user.email}</td>
                            <td data-column="Wallet Address">{user.walletAddress ? user.walletAddress : "/"}</td>
                            <td data-column="Role">{user.role}</td>
                            <td data-column="Registered">{formatDate(user.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
