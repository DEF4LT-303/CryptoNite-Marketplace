"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Product } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const onClick = () => {
    console.log("clicked");
  };

  return (
    <MaxWidthWrapper>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
          {products.map((product) => (
            <Card className="py-4 my-5 bg-primary-foreground rounded-sm">
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
              <CardFooter className="flex justify-center flex-col gap-4">
                <Button className="w-full" variant="default" onClick={onClick}>
                  Purchase
                </Button>
                <Link href={`/products/${product.id}`} className="w-full">
                  <Button className="w-full" variant="default">
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
