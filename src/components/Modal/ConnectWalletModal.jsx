import React, { useContext } from "react";

import axios from "axios";
import Web3 from "web3";
import { Modal, CloseButton } from "react-bootstrap";

import Button from "../Form/Button";

import { WalletContext } from "../../context/WalletContext";

import MetaMaskIcon from "../../assets/images/icons/metamask.webp";

const ConnectWalletModal = (props) => {
    const { setWalletAddress } = useContext(WalletContext);

    const web3 = new Web3(window.ethereum);

    const connectWallet = () => {
        if (!window.ethereum) alert("Please install MetaMask!");

        // connect account
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => {
                const account = accounts[0];

                // generate nonce
                axios
                    .get(`${import.meta.env.VITE_API_URL}/users/generateNonce`, { withCredentials: true })
                    .then(async (response) => {
                        // sign message
                        const message = response.data.message;

                        const signature = await web3.eth.personal.sign(message, account).catch((err) => {
                            console.log("You denied message signature: ", err);

                            props.onHide();
                        });

                        const data = {
                            walletAddress: account,
                            signature: signature
                        };

                        // link wallet
                        axios
                            .put(`${import.meta.env.VITE_API_URL}/users/linkWallet`, data, { withCredentials: true })
                            .then(() => {
                                setWalletAddress(account);

                                props.onHide();
                            })
                            .catch((error) => {
                                console.log(error.response.data.message);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
            <Modal.Header>
                <Modal.Title as="h1">Connect Wallet</Modal.Title>
                <CloseButton style={{ fontSize: "1.6rem" }} onClick={props.onHide} />
            </Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center">
                <img src={MetaMaskIcon} alt="MetaMask" width={150} height={150} />
                <p className="my-3" style={{ fontSize: "1.6rem" }}>
                    Connect your wallet to enter the future of ticketing!
                </p>
                <Button text="With MetaMask" onClick={connectWallet} />
            </Modal.Body>
        </Modal>
    );
};

export default ConnectWalletModal;
