"use client"
import { useState } from "react";
import Web3 from "web3";
import ABI from "./ABI.json"
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "./ui/dialog";

import React from 'react'
import { DialogClose } from "@radix-ui/react-dialog";

interface WalletProps {
    saveState: (state: { web3: any; contract: any; account: string }) => void;
}
const Wallet = ({ saveState }: WalletProps) => {
    const [connected, setConnected] = useState<boolean>(true);
    const [account, setAccount] = useState("");
    // const isAndroid = /android/i.test(navigator.userAgent);
    const init = async () => {
        try {
            const web3 = new Web3(window.ethereum)
            // await window.ethereum.request({method:'eth_requestAccounts'})
            await window.ethereum.enable()
            const accounts = await web3.eth.getAccounts()
            const contract = new web3.eth.Contract(
                ABI,
                "0xa3D40cDf17bc7fFE248B00CE59d5B11dd47321ca"
            );
            console.log(contract);

            setConnected(false)
            saveState({ web3: web3, contract: contract, account: accounts[0] })
            setAccount(accounts[0])

        } catch (error) {
            alert("You don't have metamask")
        }
    }
    return (
        <Dialog>
            <DialogContent>
                <DialogDescription className="flex justify-center items-center">
                    <DialogClose asChild>
                        <Button className="w-50" variant="default" onClick={init}>
                            Connect To Wallet
                        </Button>
                    </DialogClose>
                </DialogDescription>
            </DialogContent>
            <DialogTrigger asChild>
                <Button className="w-full" variant="default">
                    Purchase
                </Button>
            </DialogTrigger>
        </Dialog>
    )
}

export default Wallet



