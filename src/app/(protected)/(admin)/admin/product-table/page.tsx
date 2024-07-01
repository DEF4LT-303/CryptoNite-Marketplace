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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

const ProductTablePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/product/`, {
        data: { id },
      });
      if (response.data.success) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        setError(response.data.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again.");
    }
  };

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
          <div>
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
                  <div>
                    <Card x-chunk="dashboard-05-chunk-3">
                      <CardHeader className="px-7">
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                          Recent Products from your store.
                        </CardDescription>
                      </CardHeader>

                      {products && products.length !== 0 ? (
                        <>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product Image</TableHead>
                                  <TableHead>product Category</TableHead>
                                  <TableHead>Product Name</TableHead>
                                  <TableHead>Last Updated</TableHead>
                                  <TableHead>Unit Price</TableHead>
                                  {/* <TableHead>Options</TableHead> */}
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
                                    <TableCell>
                                      <p>{product.category}</p>
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>

                                    <TableCell>
                                      {format(
                                        new Date(product.updatedAt),
                                        "yyyy-MM-dd"
                                      )}
                                    </TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger>
                                          <Button variant="ghost">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              className="lucide lucide-ellipsis"
                                            >
                                              <circle cx="12" cy="12" r="1" />
                                              <circle cx="19" cy="12" r="1" />
                                              <circle cx="5" cy="12" r="1" />
                                            </svg>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                          <DropdownMenuItem className="cursor-pointer">
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            className="text-destructive cursor-pointer"
                                            onClick={() =>
                                              handleDelete(product.id)
                                            }
                                          >
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
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
