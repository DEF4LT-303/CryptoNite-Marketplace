"use client";

import Wallet from "@/components/Wallet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  description: string;
  price: number;
  images: string[];
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [state,setState]=useState<{ web3: any | null; contract: any | null; account:string|null }>({
    web3:null,
    contract:null,
    account:null
  })

  const saveState=(state:{web3:any;contract:any;account:string})=>{
    console.log(state);
    setState(state);
  }

  useEffect(() => {
    axios.get("/api/product").then((res) => {
      
      setProducts(res.data);
    });
    
  },[]);


  const purchase = async (id) => {
    try {
      const price = 0.1;
      const { contract, account, web3 } = state; // Extract state variables
      const stakeAmount = web3.utils.toWei("0.01", "ether"); // Fixed stake amount

      // Step 1: Deposit stake
      await contract.methods.depositStake().send({ from: account, value: stakeAmount });
      console.log("Stake deposited successfully");

      // Step 2: Call backend to create metadata
      const data = {
        id: id,
        walletAddress: account,
      };
      const response = await axios.post("/api/createMetaData", data);

      // Step 3: Get metadata URI from backend response
      const metadataURI = response.data.metadataURI;
      console.log("Metadata URI:", metadataURI);

      // Step 4: Display metadata to the user for review
      const userConfirmed = window.confirm(
        `Metadata generated:\n${metadataURI}\nDo you want to mint this NFT for price: ${price} ETH?`
      );

      if (!userConfirmed) {
        alert("Minting canceled. Your stake will remain until you proceed or request a refund.");
        return;
      }

      // Step 5: Call the smart contract to mint NFT
      const metadataCreationFee = web3.utils.toWei(price.toString(), "ether"); // Dynamic price (in ETH)
      const transaction = await contract.methods
        .mintNFT(metadataURI)
        .send({ from: account, value: metadataCreationFee, gas: 480000 });

      // Step 6: Extract tokenId from event
      const event = transaction.events.NFTMinted; // Ensure contract emits this event
      const tokenId = event.returnValues.tokenId;
      console.log("Transaction successful:", transaction);

      alert(`NFT minted successfully! Token ID: ${tokenId}`);
    } catch (error) {
      console.error("Error in purchase flow:", error);
      alert("Transaction failed. Please try again.");
    }
  };



  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
        {products.map((product) => (
          <Card className="py-4 my-5">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="font-bold text-large">{product.name}</p>
              <p className="text-tiny uppercase font-bold">
                {product.description}
              </p>
              <small className="text-default-500">$ {product.price}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-[230px]"
                src={product.images[0]}
                width={270}
              />
            </CardBody>
            <CardFooter className="flex justify-center">
              {!state.web3 && !state.contract && !state.account?(<Wallet saveState = {saveState}/>):(<Button onClick={()=>purchase(product.id)} className="w-full" variant="default">
                    Purchase
                </Button>)}
                
            </CardFooter>
          </Card>
        ))}
      </div>
      <div>
        <h1>Connected to Account = {state.account?`${state.account}`:"not connected"}</h1>
      </div>
    </div>
  );
};

export default ProductPage;
