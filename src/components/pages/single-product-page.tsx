"use client";

import AddToCartButton from "@/components/cart/add-to-cart";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/currentUser";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Offers, Product } from "@prisma/client";
import axios from "axios";
import { Clock } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

type OffersProps = Offers & { user: { name: string } };

const DigitalAssetPage = ({ id }: { id: string }) => {
  const user = useCurrentUser();

  const [product, setProduct] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      startTransition(() => {
        axios
          .get(`/api/product?id=${id}`)
          .then(({ data }) => {
            if (data.error) {
              setIsError(true);
              return;
            }
            setProduct(data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    };

    fetchProduct();
  }, [id]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-180px)]">
        <p className="text-2xl text-muted-foreground">No products found!</p>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      {product && (
        <div className="flex flex-col gap-4 my-5">
          <div className="flex flex-col md:flex-row md:gap-4">
            <Card className="md:my-5 bg-primary-foreground rounded-sm border md:w-[450px]">
              <Image
                alt={product.name}
                className="w-full object-cover h-[340px]"
                shadow="sm"
                radius="none"
                width="100%"
                src={product.images[0]}
              />
            </Card>

            <Card className="py-4 my-5 bg-primary-foreground flex-grow rounded-sm border">
              <CardHeader className="flex justify-between items-start text-lg">
                <div className="flex items-center gap-2">
                  <Clock size={24} />
                  <b>Sale ends</b>{" "}
                  <span className="text-primary-500">
                    {new Date(product.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <p className="font-bold text-large">{product.name}</p>
                <p className="text-tiny uppercase font-bold">
                  {product.description}
                </p>
                <small className="text-default-500">$ {product.price}</small>
              </CardBody>
              <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  className="bg-blue-500 hover:bg-blue-400 w-1/2"
                  disabled={!user}
                >
                  Buy Now
                </Button>
                <AddToCartButton product={product} />
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default DigitalAssetPage;
