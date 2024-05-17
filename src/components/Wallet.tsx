"use client"
import { useState } from "react";
import Web3 from "web3";
import ABI from "./ABI.json"
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "./ui/dialog";

import React from 'react'

interface WalletProps {
    saveState: (state: { web3: any; contract: any; account:string}) => void;
  }
const Wallet = ({saveState}:WalletProps) => {
    const [connected,setConnected]=useState<boolean>(true);
    const [account,setAccount] = useState("");
    // const isAndroid = /android/i.test(navigator.userAgent);
    const init = async()=>{
        try {
            const web3 = new Web3(window.ethereum)
            // await window.ethereum.request({method:'eth_requestAccounts'})
            await window.ethereum.enable()
            const accounts = await web3.eth.getAccounts()
            const contract = new web3.eth.Contract(
                ABI,
                "0xef0560E9A8EB2f4004dB5801Ea3e0495663BA7f0"
            );
            console.log(contract);
            
            setConnected(false)
            saveState({web3:web3, contract:contract, account:accounts[0]})
            setAccount(accounts[0])
            
        } catch (error) {
            alert("Please install metamask")
            }
        }
    return (
        <Dialog>
            <DialogContent>
                <DialogDescription className="flex justify-center items-center">
                    <Button className="w-50" variant="default" onClick={init}>
                        Connect To Wallet
                    </Button>
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



