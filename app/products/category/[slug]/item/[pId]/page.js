import { getProduct } from "@/app/utils";
import DetailedProductComponent from "@/components/server/products/detailedProductComponent";
import React from "react";

export const revalidate = 3600;

export async function generateMetadata({ params }, parent) {
  const product = await getProduct(params.pId);

  return {
    title: `${product.name} - ${product.description}`,
    description: product.description,
    ogImage: {
      url: product.images[0].url,
      width: 250,
      height: 250,
      alt: product.name,
    },
  };
}

async function page({ params }) {
  return <DetailedProductComponent />;
}

export default page;
