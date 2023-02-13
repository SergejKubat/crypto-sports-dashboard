import React, { useState, useEffect } from "react";

import axios from "axios";

import UserList from "../../components/List/UserList";

const UserListPage = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <h1 className="m-0">Users</h1>
            <p className="mt-4" style={{ marginBottom: "5rem" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quibusdam commodi culpa! Amet aperiam voluptates itaque
                excepturi quidem vero ab porro sed nesciunt, nostrum iste facilis eaque fugiat rerum sapiente? Molestias aperiam at ea ipsum
                velit quidem maxime? Commodi incidunt excepturi labore vitae voluptates rem esse natus voluptate maiores dolorum.
            </p>
            <UserList users={users} />
        </div>
    );
};

export default UserListPage;
