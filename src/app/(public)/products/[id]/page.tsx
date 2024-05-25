"use client";

import AddToCartButton from "@/components/cart/add-to-cart";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Offers, Product } from "@prisma/client";
import axios from "axios";
import { Clock, Tag } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

const orders = [
  {
    price: 0.5,
    usd_price: 770,
    time: "Processing",
    from: "John Doe",
  },
  {
    price: 0.3,
    usd_price: 770,
    time: "21h ago",
    from: "Jane Smith",
  },
  {
    price: 0.6,
    usd_price: 770,
    time: "5m ago",
    from: "Samantha Martinez",
  },
  {
    price: 0.6,
    usd_price: 770,
    time: "5m ago",
    from: "Samantha Martinez",
  },
  {
    price: 0.3,
    usd_price: 770,
    time: "21h ago",
    from: "Jane Smith",
  },
  {
    price: 0.6,
    usd_price: 770,
    time: "5m ago",
    from: "Samantha Martinez",
  },
  {
    price: 0.3,
    usd_price: 770,
    time: "21h ago",
    from: "Jane Smith",
  },
  {
    price: 0.6,
    usd_price: 770,
    time: "5m ago",
    from: "Samantha Martinez",
  },
  {
    price: 0.6,
    usd_price: 770,
    time: "5m ago",
    from: "Samantha Martinez",
  },
  {
    price: 0.6,
    usd_price: 770,
    time: "5m ago",
    from: "Samantha Martinez",
  },
];

type OffersProps = Offers & { user: { name: string } };

const ProductPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [offers, setOffers] = useState<OffersProps[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      startTransition(() => {
        axios
          .get(`/api/product?id=${params.id}`)
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

    const fetchOffers = async () => {
      startTransition(() => {
        axios
          .get(`/api/offers?id=${params.id}`)
          .then(({ data }) => {
            setOffers(data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    };

    fetchProduct();
    fetchOffers();
  }, [params.id]);

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
                <div>
                  <AddToCartButton product={product} />
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
                <div className="flex w-full sm:w-1/2">
                  <Button className="flex-grow bg-blue-500 hover:bg-blue-400">
                    Buy Now
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  className="w-full sm:w-1/2 flex items-center gap-2"
                >
                  <Tag size={16} />
                  Place order
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="border">
            <Table>
              <ScrollArea className="h-[400px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Price</TableHead>
                    <TableHead>Price (USD)</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">User</TableHead>
                  </TableRow>
                </TableHeader>
                {offers && offers.length !== 0 ? (
                  <TableBody>
                    {offers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">
                          {offer?.price} ETH
                        </TableCell>
                        <TableCell>$ {offer.price_usd}</TableCell>
                        <TableCell>
                          {new Date(offer.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {offer.user.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <div className="flex items-center justify-center">
                    No Offers
                  </div>
                )}
              </ScrollArea>
              {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}
            </Table>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default ProductPage;
