"use client";

import { format } from "date-fns";
import { Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/hooks/currentUser";
import { Product } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

const ProductTablePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useCurrentUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/product`);

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        // setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 mx-2">
        <div className="w-full h-14 items-center bg-background px-2 sm:px-6 sm:bg-transparent">
          <div className="relative ml-auto flex-1 md:grow-0 ">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 "
            />
          </div>
        </div>
        <div className="gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
          <div className="">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <TabsContent value="all">
                  <div className="">
                    <Card x-chunk="dashboard-05-chunk-3">
                      <CardHeader className="px-7">
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                          Recent Products from your store.
                        </CardDescription>
                      </CardHeader>

                      {products && products.length !== 0 ? (
                        <>
                          <CardContent className="hidden md:block">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product Image</TableHead>
                                  <TableHead className="hidden sm:table-cell">
                                    product ID
                                  </TableHead>
                                  <TableHead className="hidden sm:table-cell">
                                    Product Name
                                  </TableHead>
                                  <TableHead className="hidden md:table-cell">
                                    Last Updated
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Unit Price
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {products.map((product) => (
                                  <TableRow key={product.id}>
                                    <TableCell>
                                      <div className="flex flex-col gap-2">
                                        <div className="relative w-20 h-20 overflow-hidden">
                                          <Image
                                            src={product.images[0]}
                                            alt="product"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                          />
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      <p className="truncate max-w-[120px]">
                                        {product.id}
                                      </p>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                      {product.name}
                                    </TableCell>

                                    <TableCell className="hidden md:table-cell">
                                      {format(
                                        new Date(product.createdAt),
                                        "yyyy-MM-dd"
                                      )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      ${product.price}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>

                          <div className="block md:hidden">
                            {products.map((product) => (
                              <Card className="mx-2 my-5 p-2" key={product.id}>
                                <CardHeader className="flex flex-col justify-between">
                                  <CardTitle>product</CardTitle>
                                  <CardDescription className="truncate min-w-[100px]">
                                    {product.id}
                                  </CardDescription>
                                </CardHeader>
                                <Separator className="my-2 bg-slate-100" />
                                <CardContent className="mt-5">
                                  <div className="flex flex-col justify-between">
                                    <div className="flex flex-row mb-5 justify-between">
                                      <div className="flex flex-col gap-5">
                                        <CardTitle>Product</CardTitle>
                                        <div className="flex flex-col">
                                          <CardTitle className="text-sm">
                                            {product.name}
                                          </CardTitle>
                                          <CardDescription className="truncate max-w-[100px] ">
                                            {product.id}
                                          </CardDescription>
                                        </div>
                                      </div>
                                      <div className="flex flex-col items-end ml-2 gap-2">
                                        <img
                                          src={product.images[0]}
                                          alt="product"
                                          className="w-10 h-10 hidden sm:block"
                                        />
                                      </div>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex flex-col">
                                      <Separator className="my-2" />
                                      <div className="flex flex-row justify-between">
                                        <p>Date</p>
                                        <CardDescription>
                                          {format(
                                            new Date(product.createdAt),
                                            "yyyy-MM-dd"
                                          )}
                                        </CardDescription>
                                      </div>
                                      <Separator className="my-2" />
                                      <div className="flex flex-row justify-between">
                                        <p>Amount</p>
                                        <CardDescription>
                                          ${product.price}
                                        </CardDescription>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-center items-center h-80">
                          <p className="text-lg text-muted-foreground">
                            No Products found
                          </p>
                        </div>
                      )}
                    </Card>
                  </div>
                </TabsContent>
              </Suspense>
              <TabsContent value="delivered">test</TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTablePage;
