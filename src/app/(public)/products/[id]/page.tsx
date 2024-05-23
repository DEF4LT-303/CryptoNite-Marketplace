"use client";

import AddToCartButton from "@/components/cart/add-to-cart";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import { Product } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const ProductPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`/api/product?id=${params.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4 my-5">
        <div className="flex gap-4">
          <Card className="py-4 my-5 bg-primary-foreground rounded-sm">
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-[230px]"
                src={product.images[0]}
                width={270}
              />
            </CardBody>
            <CardFooter className="flex justify-center flex-col gap-4">
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>

          <Card className="py-4 my-5 bg-primary-foreground flex-grow rounded-sm">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h1>Description</h1>
            </CardHeader>
            <CardBody>
              <p className="font-bold text-large">{product.name}</p>
              <p className="text-tiny uppercase font-bold">
                {product.description}
              </p>
              <small className="text-default-500">$ {product.price}</small>
            </CardBody>
          </Card>
        </div>

        <div className="border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
