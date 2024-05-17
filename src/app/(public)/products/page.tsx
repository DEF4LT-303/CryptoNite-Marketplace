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

  const [state,setState]=useState<{ web3: any | null; contract: any | null }>({
    web3:null,
    contract:null
  })

  const saveState=(state:{web3:any;contract:any})=>{
    console.log(state);
    setState(state);
  }

  useEffect(() => {
    axios.get("/api/product").then((res) => {
      setProducts(res.data);
    });
  });

  // const onClick = () => {
  //   console.log("clicked");
  // };

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
                <Wallet saveState = {saveState}/>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
