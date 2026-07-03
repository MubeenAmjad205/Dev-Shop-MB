'use client';

import React, { useEffect, useState, use } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import shopifyClient from '@/lib/shopifyClient';
import { GET_PRODUCT_BY_HANDLE } from '@/queries/shopifyQueries';

import SectionNavigation from './SectionNavigation';
import SectionProductHeader from './SectionProductHeader';
import Loading from '@/app/loading';
import Link from 'next/link';

type Props = {
  params: Promise<{ productId: string }>;
};

const SingleProductPage = (props: Props) => {
  const params = use(props.params);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await shopifyClient.query({
          query: GET_PRODUCT_BY_HANDLE,
          variables: { handle: params.productId },
        });
        console.log('Product Data: ', data.productByHandle);
        setSelectedProduct(data.productByHandle);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params.productId]);

  if (loading) {
    return <div><Loading/></div>;
  }

  if (!selectedProduct) {
    return (
      <div className="container flex flex-col items-center justify-center py-32 text-center">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-full p-6 mb-6">
          <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-md mb-8">
          We couldn't find the product you're looking for. It might have been removed or the link might be broken.
        </p>
        <Link href="/products" className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium shadow-md">
          Browse All Products
        </Link>
      </div>
    );
  }

  const productData = {
    id: selectedProduct.id,
    shots: selectedProduct.images?.edges?.map((edge: any) => edge.node) || [],
    shoeName: selectedProduct.title || '',
    currentPrice: selectedProduct.priceRange?.minVariantPrice?.amount || 0,
    prevPrice: selectedProduct.priceRange?.maxVariantPrice?.amount || 0,
    rating: 0,
    pieces_sold: 0,
    reviews: 0,
    overview: selectedProduct.description || '',
    shipment_details: [],
    variantId: selectedProduct.variants?.edges?.[0]?.node?.id || null,
  };

  return (
    <div className="container">
      <SectionNavigation />

      <div className="mb-20">
        <SectionProductHeader
          shots={productData.shots}
          productData={productData}
          shoeName={productData.shoeName}
          prevPrice={productData.prevPrice}
          currentPrice={productData.currentPrice}
          rating={productData.rating}
          pieces_sold={productData.pieces_sold}
          reviews={productData.reviews}
        />
      </div>
    </div>
  );
};

const SingleProductPageWithRedux = (props: Props) => {
  return (
    <Provider store={store}>
      <SingleProductPage {...props} />
    </Provider>
  );
};

export default SingleProductPageWithRedux;
