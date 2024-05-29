"use client";

import NFTCards from "@/components/cards/nft-cards";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CardSkeletonLoader from "@/components/skeletons/card-skeleton-loader";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      axios
        .get("/api/product")
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    };
    fetchProducts();
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center md:items-start">
        <h1 className="text-3xl font-bold mt-10 mb-1 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          NFTs
        </h1>
        <Separator className="bg-gradient-to-r from-violet-600 to-indigo-600 w-[300px] md:w-[200px]" />
        <div className="flex justify-center items-center">
          {products.length === 0 && (
            <div className="flex justify-center items-center mt-10">
              <p>No products found</p>
            </div>
          )}
          <Suspense fallback={<CardSkeletonLoader />}>
            {isLoading ? (
              <div className="flex justify-center items-center mt-10">
                <p>Loading...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center w-full">
                {products.map((product) => (
                  <NFTCards key={product.id} {...product} />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
