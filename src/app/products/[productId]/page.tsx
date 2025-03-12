'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import shopifyClient from '@/lib/shopifyClient';
import { GET_PRODUCT_BY_HANDLE } from '@/queries/shopifyQueries';

import SectionMoreProducts from './SectionMoreProducts';
import SectionNavigation from './SectionNavigation';
import SectionProductHeader from './SectionProductHeader';
import SectionProductInfo from './SectionProductInfo';

type Props = {
  params: { productId: string };
};

const SingleProductPage = (props: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await shopifyClient.query({
          query: GET_PRODUCT_BY_HANDLE,
          variables: { handle: props.params.productId },
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
  }, [props.params.productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }

  // Map the Shopify product data to match component expectations.
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

      <div className="mb-28">
        <SectionProductInfo
          overview={productData.overview}
          shipment_details={productData.shipment_details}
          ratings={productData.rating}
          reviews={productData.reviews}
        />
      </div>

      <div className="mb-28">
        <SectionMoreProducts />
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
