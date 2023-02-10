import React, { useState, useEffect } from "react";

import axios from "axios";
import Web3 from "web3";

import PurchasesList from "../../components/List/PurchasesList";
import Button from "../../components/Form/Button";

import SportEventRegistry from "../../assets/contracts/SportEventRegistry.json";

const EventDetails = (props) => {
    const [purchasedTickets, setPurchasedTickets] = useState([]);
    const [balance, setBalance] = useState(0);

    const web3 = new Web3(window.ethereum);

    const getPurchasedTickets = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/tickets/events/${props.event._id}`, { withCredentials: true })
            .then((response) => {
                setPurchasedTickets(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const getBalance = () => {
        // create contract instance
        const sportEventRegistry = new web3.eth.Contract(SportEventRegistry.abi, SportEventRegistry.address);

        // call contract method
        sportEventRegistry.methods
            .getBalance(props.event.contractAddress)
            .call()
            .then((balance) => {
                setBalance(parseFloat(Web3.utils.fromWei(balance, "ether")));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const withdraw = () => {
        // create contract instance
        const sportEventRegistry = new web3.eth.Contract(SportEventRegistry.abi, SportEventRegistry.address);

        // sign tx and call contract method
        sportEventRegistry.methods
            .withdraw(props.event.contractAddress)
            .send({ from: window.ethereum.selectedAddress })
            .then(() => {
                setBalance(0);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getPurchasedTickets();
        getBalance();
    }, []);

    return (
        <div>
            <div className="mb-5">
                <h2 className="mb-4">Basic Details</h2>
                <p>
                    Event Contract Address: <b>{props.event.contractAddress}</b>
                </p>
                <p>
                    Organizer Wallet Address: <b>{props.event.organizerWallet}</b>
                </p>
            </div>
            <div className="mb-5">
                <h2 className="mb-4">Your Balance</h2>
                <p>
                    Current Balance: <b>{balance} ETH</b>
                </p>
                <Button text="Withdraw" type="success" disabled={balance === 0} onClick={withdraw} />
            </div>
            <PurchasesList purchasedTickets={purchasedTickets} />
        </div>
    );
};

export default EventDetails;
