import React, { useState, useEffect, useMemo } from "react";

import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ForgottenPasswordPage from "./pages/Auth/ForgottenPassword";
import ResetPasswordPage from "./pages/Auth/ResetPassword";
import DashboardPage from "./pages/Dashboard";
import EventListPage from "./pages/Event/EventList";
import CreateEventPage from "./pages/Event/CreateEvent";
import EventPage from "./pages/Event/Event";
import UserListPage from "./pages/User/UserList";
import InvitationListPage from "./pages/Invitation/InvitationList";
import NotFoundPage from "./pages/NotFound";

import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/Layout/ScrollToTop";

import { UserContext } from "./context/UserContext";
import { WalletContext } from "./context/WalletContext";

const App = () => {
    const [user, setUser] = useState(window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : null);
    const [walletAddress, setWalletAddress] = useState(window.ethereum ? window.ethereum.selectedAddress : null);

    const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

    const walletValue = useMemo(() => ({ walletAddress, setWalletAddress }), [walletAddress, setWalletAddress]);

    useEffect(() => {
        if (window.localStorage.getItem("user")) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/auth`, { withCredentials: true })
                .then((response) => {
                    setUser(response.data);

                    window.localStorage.setItem("user", JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);

                    window.localStorage.removeItem("user");
                });
        }
    }, []);

    return (
        <Router>
            <UserContext.Provider value={userValue}>
                <WalletContext.Provider value={walletValue}>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
                        <Route path="/register/:invitationCode" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
                        <Route path="/forgotten-password" element={user ? <Navigate to="/dashboard" /> : <ForgottenPasswordPage />} />
                        <Route path="/reset-password/:code" element={user ? <Navigate to="/dashboard" /> : <ResetPasswordPage />} />
                        <Route element={user ? <Layout /> : <Navigate to="/" />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/events" element={<EventListPage />} />
                            <Route path="/events/create" element={<CreateEventPage />} />
                            <Route path="/events/:id" element={<EventPage />} />
                            <Route path="/users" element={<UserListPage />} />
                            <Route path="/invitations" element={<InvitationListPage />} />
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </WalletContext.Provider>
            </UserContext.Provider>
        </Router>
    );
};

export default App;
