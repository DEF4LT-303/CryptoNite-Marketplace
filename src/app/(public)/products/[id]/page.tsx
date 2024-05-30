import NFTPage from "@/components/pages/single-nft-page";
import DigitalAssetPage from "@/components/pages/single-product-page";
import { getProductById } from "@/data/product";

const ProductPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const product = await getProductById(params.id);

  return (
    <div>
      {product?.category === "NFT" && <NFTPage id={params.id} />}
      {product?.category === "DigitalAsset" && (
        <DigitalAssetPage id={params.id} />
      )}
    </div>
  );
};

export default ProductPage;
