"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import CardSkeletonLoader from "@/components/skeletons/card-skeleton-loader";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Product } from "@prisma/client";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      axios
        .get("/api/product")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    };
    fetchProducts();
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="flex justify-center items-center">
        <Suspense fallback={<CardSkeletonLoader />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
            {products.map((product) => (
              <Card
                className="py-4 my-5 bg-primary-foreground rounded-sm border hover:-translate-y-1"
                isPressable
                onPress={() =>
                  (window.location.href = `/products/${product.id}`)
                }
              >
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt={product.name}
                    className="w-full object-cover h-[240px]"
                    shadow="sm"
                    radius="sm"
                    width="100%"
                    src={product.images[0]}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{product.name}</b>
                  <p className="text-primary-500">ETH {product.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
