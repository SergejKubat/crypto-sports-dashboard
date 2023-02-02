import React from "react";

import { Outlet } from "react-router-dom";

import Navigation from "./Navigation";

const Layout = (props) => {
    return (
        <React.Fragment>
            <Navigation />
            <div className="page">
                <Outlet />
            </div>
        </React.Fragment>
    );
};

export default Layout;
