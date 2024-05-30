"use client";

import NFTCards from "@/components/cards/nft-cards";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CardSkeletonLoader from "@/components/skeletons/card-skeleton-loader";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [assets, setAssets] = useState<Product[]>([]);
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
        <Separator className="bg-gradient-to-r from-violet-600 to-indigo-600" />
        <div className="flex justify-center items-center w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center w-full">
              <CardSkeletonLoader />
              <CardSkeletonLoader />
              <CardSkeletonLoader />
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center md:justify-start w-full">
              <h1 className="text-2xl font-semibold text-gray-500 mt-3">
                No NFTs available
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center w-auto md:w-full">
              {products.map((product) => (
                <NFTCards key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center md:items-start mb-16">
        <h1 className="text-3xl font-bold mt-10 mb-1 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Digital Assets
        </h1>
        <Separator className="bg-gradient-to-r from-violet-600 to-indigo-600" />
        <div className="flex justify-center items-center w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center w-full">
              <CardSkeletonLoader />
              <CardSkeletonLoader />
              <CardSkeletonLoader />
            </div>
          ) : assets.length === 0 ? (
            <div className="flex justify-center md:justify-start w-full">
              <h1 className="text-2xl font-semibold text-gray-500 mt-3">
                No Products available
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center w-auto md:w-full">
              {assets.map((asset) => (
                <NFTCards key={asset.id} {...asset} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
