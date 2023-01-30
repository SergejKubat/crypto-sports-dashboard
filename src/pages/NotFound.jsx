import React from "react";

import { useNavigate } from "react-router-dom";

import Button from "../components/Form/Button";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <section className="not-found">
            <div className="not-found-container">
                <h1>Page Not Found</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, veritatis ratione dignissimos eos officia neque
                    voluptates delectus et maxime repellat itaque eaque earum aspernatur.
                </p>
                <Button text="Previous Page" onClick={() => navigate(-1)} />
            </div>
        </section>
    );
};

export default NotFoundPage;
