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

import { Badge } from "@/components/ui/badge";
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
import axios from "axios";
import { Suspense, useEffect, useState } from "react";

interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  product: {
    name: string;
    image: string;
    id: string;
  };
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useCurrentUser();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/order?userId=${user?.id}`);

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        // setError(error.message);
        setLoading(false);
      }
    };
    fetchOrders();
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
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>
                          Recent orders from your store.
                        </CardDescription>
                      </CardHeader>

                      {orders && orders.length !== 0 ? (
                        <>
                          <CardContent className="hidden md:block">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product</TableHead>
                                  <TableHead className="hidden sm:table-cell">
                                    Order ID
                                  </TableHead>
                                  <TableHead className="hidden sm:table-cell">
                                    Status
                                  </TableHead>
                                  <TableHead className="hidden md:table-cell">
                                    Date
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Amount
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {orders.map((order) => (
                                  <TableRow key={order.id}>
                                    <TableCell>
                                      <div className="flex flex-col gap-2">
                                        <img
                                          src={order.product.image}
                                          alt="product"
                                          className="w-10 h-10 hidden md:block"
                                        />
                                        <div>
                                          <div className="flex flex-col">
                                            <div className="font-medium">
                                              {order.product.name}
                                            </div>
                                          </div>

                                          <div className="hidden text-sm text-muted-foreground md:inline">
                                            <p className="truncate max-w-[100px]">
                                              {order.product.id}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      <p className="truncate max-w-[120px]">
                                        {order.id}
                                      </p>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      <Badge
                                        className="text-xs"
                                        variant="secondary"
                                      >
                                        {order.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      {format(
                                        new Date(order.createdAt),
                                        "yyyy-MM-dd"
                                      )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      ${order.total}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>

                          <div className="block md:hidden">
                            {orders.map((order) => (
                              <Card className="mx-2 my-5 p-2" key={order.id}>
                                <CardHeader className="flex flex-col justify-between">
                                  <CardTitle>Order</CardTitle>
                                  <CardDescription className="truncate min-w-[100px]">
                                    {order.id}
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
                                            {order.product.name}
                                          </CardTitle>
                                          <CardDescription className="truncate max-w-[100px] ">
                                            {order.product.id}
                                          </CardDescription>
                                        </div>
                                      </div>
                                      <div className="flex flex-col items-end ml-2 gap-2">
                                        <img
                                          src={order.product.image}
                                          alt="product"
                                          className="w-10 h-10 hidden sm:block"
                                        />
                                      </div>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex flex-col">
                                      <div className="flex flex-row justify-between">
                                        <p>Status</p>
                                        <CardDescription>
                                          {order.status}
                                        </CardDescription>
                                      </div>
                                      <Separator className="my-2" />
                                      <div className="flex flex-row justify-between">
                                        <p>Date</p>
                                        <CardDescription>
                                          {format(
                                            new Date(order.createdAt),
                                            "yyyy-MM-dd"
                                          )}
                                        </CardDescription>
                                      </div>
                                      <Separator className="my-2" />
                                      <div className="flex flex-row justify-between">
                                        <p>Amount</p>
                                        <CardDescription>
                                          ${order.total}
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
                            No orders found
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

export default OrderPage;
