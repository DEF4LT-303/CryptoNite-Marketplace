"use client";

import AddToCartButton from "@/components/cart/add-to-cart";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { OfferDialogue } from "@/components/modals/offer-modal";
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
import { Clock, Tag } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

type OffersProps = Offers & { user: { name: string } };

const ProductPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const user = useCurrentUser();
  // const [lastBid,setLastBid] = useState<number|null>(null)
  const [product, setProduct] = useState<Product | null>(null);
  const [offers, setOffers] = useState<OffersProps[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [convertedPrices, setConvertedPrices] = useState<{
    [key: string]: number;
  }>({});

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


  }, []);

  // USD Conversion
  const fetchPrice = async (amount: number, offerId: string) => {
    try {
      const { data } = await axios.get(`/api/priceConversion?amount=${amount}`);
      const roundedPrice = parseFloat(data.price.toFixed(2));

      setConvertedPrices((prevPrices) => ({
        ...prevPrices,
        [offerId]: roundedPrice,
      }));
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  useEffect(() => {
    offers.forEach((offer) => {
      if (offer?.bidAmount) {
        fetchPrice(offer.bidAmount, offer.id);
      }
    });
    
    
    
  }, [offers]);

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

  const handleOpenDialog = () => {
    // axios
    //   .get(`/api/offers?id=${params.id}`)
    //   .then(({ data }) => {
    //     const latestBidIndex = data.findIndex(bid => bid.userId === user.id);
    //     if (latestBidIndex !== -1) {
    //       const timeDiff = timeForTimer(data[latestBidIndex].createdAt);
    //       if (timeDiff!='ok'){
    //       setLastBid(timeDiff)
    //       }
    //     } else {
    //       console.log("No bids found for user");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = async () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmitSuccess = async () => {
    if (!product) return;

    const { data } = await axios.get(`/api/offers?id=${product.id}`);
    setOffers(data);
  };

  const time = (time: Date) => {
    const now: Date = new Date();
    const offerDate: Date = new Date(time);
    const diffInMs = now.getTime() - offerDate.getTime();

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeDifference;
    if (days > 0) {
      timeDifference = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      timeDifference = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      timeDifference = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      if (seconds === 0) {
        timeDifference = "just now";
      } else {
        timeDifference = `${seconds} seconds ago`;
      }
    }
    return timeDifference;
  };

  // const timeForTimer = (time: Date) => {
  //   const now: Date = new Date();
  //   const offerDate: Date = new Date(time);
  //   const diffInMs = now.getTime() - offerDate.getTime();

  //   const seconds = Math.floor(diffInMs / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);

  //   let timeDifference;
  //   if (days > 0) {
  //     timeDifference = "ok"
  //   } else if (hours > 0) {
  //     timeDifference = "ok"
  //   } else if (minutes > 0) {
  //     timeDifference = "ok"
  //   } else {
  //     return timeDifference = seconds
  //   }
  //   return timeDifference;
  // };

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
                  <Button
                    className="flex-grow bg-blue-500 hover:bg-blue-400"
                    disabled={!user}
                  >
                    Buy Now
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  className="w-full sm:w-1/2 flex items-center gap-2"
                  onClick={handleOpenDialog}
                  disabled={!user}
                >
                  <Tag size={16} />
                  Place order
                </Button>
                <OfferDialogue
                  isOpen={isDialogOpen}
                  onClose={handleCloseDialog}
                  productId={product.id}
                  offers={offers}
                  onSubmitSuccess={handleDialogSubmitSuccess}
                  // lastBid = {lastBid}
                />
              </CardFooter>
            </Card>
          </div>

          <div className="border">
            <Table>
              <ScrollArea className="h-[400px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Bid value</TableHead>
                    <TableHead>In USD</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">User</TableHead>
                  </TableRow>
                </TableHeader>
                {offers && offers.length !== 0 ? (
                  <TableBody>
                    {offers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">
                          {offer?.bidAmount} ETH
                        </TableCell>
                        <TableCell>
                          ${" "}
                          {convertedPrices[offer.id] !== undefined
                            ? convertedPrices[offer.id]
                            : "Loading..."}
                        </TableCell>
                        <TableCell>{time(offer.createdAt)}</TableCell>
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
