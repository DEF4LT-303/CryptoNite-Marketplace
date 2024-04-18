"use client";

import { ListFilter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ORDERS } from "@/config";
import { useCurrentUser } from "@/hooks/currentUser";
import axios from "axios";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useCurrentUser();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/order`);

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        // setError(error.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(orders);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="sticky top-0 z-30 w-full h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0 ">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 "
            />
          </div>
        </div>
        <div className="flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 ">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Delivered
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Pending
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Cancelled
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TabsContent value="all">
                <div className="hidden md:block">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>
                        Recent orders from your store.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Quantity
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Date
                            </TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ORDERS.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>
                                <div className="flex flex-row  gap-2">
                                  <img
                                    src={order.product.imageSrc}
                                    alt="product"
                                    className="w-10 h-10 hidden sm:block"
                                  />
                                  <div>
                                    <div className="font-medium">
                                      {order.product.name}
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      {order.product.id}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                x {order.product.quantity}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {order.date}
                              </TableCell>
                              <TableCell className="text-right">
                                ${order.total}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                {/* Mobile view */}
                <div className="block md:hidden">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader>
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>
                        Recent orders from your store.
                      </CardDescription>
                    </CardHeader>
                    {ORDERS.map((order) => (
                      <Card className="mx-2 my-5 p-2">
                        <CardHeader className="flex flex-col justify-between">
                          <CardTitle>Order</CardTitle>
                          <CardDescription>{order.id}</CardDescription>
                        </CardHeader>
                        <Separator className="my-2 bg-slate-100" />
                        <CardContent className="mt-5">
                          <div className="flex flex-col justify-between">
                            <div className="flex flex-row mb-5 justify-between">
                              <p>Product</p>
                              <div className="flex flex-col items-center gap-2">
                                <img
                                  src={order.product.imageSrc}
                                  alt="product"
                                  className="w-10 h-10 hidden sm:block"
                                />
                                <div className="flex flex-col ml-2">
                                  <CardTitle>{order.product.name}</CardTitle>
                                  <CardDescription>
                                    {order.product.id}
                                  </CardDescription>
                                </div>
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
                                <CardDescription>{order.date}</CardDescription>
                              </div>
                              <Separator className="my-2" />
                              <div className="flex flex-row justify-between">
                                <p>Quantity</p>
                                <CardDescription>
                                  x {order.product.quantity}
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
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="delivered">test</TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
