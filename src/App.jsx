import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import NotFoundPage from "./pages/NotFound";

import ScrollToTop from "./components/Layout/ScrollToTop";

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register/:inviteId" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
