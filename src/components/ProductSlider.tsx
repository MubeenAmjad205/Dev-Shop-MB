'use client';

import React, { useState, useEffect } from 'react';
import Slider from '@/shared/Slider/Slider';
import ProductCard from './ProductCard';
import Shopifyclient from '@/lib/shopifyClient';
import { GET_PRODUCTS_BY_COLLECTION } from '@/queries/shopifyQueries';
import Loading from '@/app/loading';
import type { ProductType } from '@/data/types';

const ProductCardTyped = ProductCard as React.FC<{
  product: ProductType;
  className?: string;
  showPrevPrice?: boolean;
}>;

const getProductsByCollection = async (collectionId: string, first: number = 20): Promise<ProductType[]> => {
  const response = await Shopifyclient.query({
    query: GET_PRODUCTS_BY_COLLECTION,
    variables: { collectionId, first },
  });
  return response.data.collection.products.edges.map((edge: any) => edge.node) as ProductType[];
};

const ProductSlider = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBestDealsProducts = async () => {
      setLoading(true);
      try {
        const bestDealsProducts = await getProductsByCollection('gid://shopify/Collection/328530264238', 20);
        setProducts(bestDealsProducts);
        console.log('Best Deals Products:', bestDealsProducts);
      } catch (error) {
        console.error('Error fetching Top Best Deals products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestDealsProducts();
  }, []);

  const mappedData = products.map((item: ProductType) => ({
    id: item.id,
    handle: item.handle,
    title: item.title,
    slug: item.handle, // assuming slug is same as handle
    productName: item.title,
    image: item.images?.edges[0]?.node?.url,
    price: Number(item.variants?.edges[0]?.node.price.amount),
    currentPrice:Number(item.variants?.edges[0]?.node.price.amount),
    shots: item.shots || [],
  }));

  console.log(mappedData);

  if (loading) return <div><Loading /></div>;

  return (
    <div className="">
      <Slider
        itemPerRow={4}
        data={mappedData}
        renderItem={(item) => {
          if (!item) return null;
          return <ProductCardTyped product={item} className="bg-white" />;
        }}
      />
    </div>
  );
};

export default ProductSlider;
