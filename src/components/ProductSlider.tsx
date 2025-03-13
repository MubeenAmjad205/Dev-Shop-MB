'use client';

import React from 'react';

import { shoes } from '@/data/content';
import Slider from '@/shared/Slider/Slider';

import ProductCard from './ProductCard';

// Original data slice from shoes
const data = shoes.slice(3, 9);

const ProductSlider = () => {
  // Map each product to include the required properties for ProductType
  const mappedData = data.map((item: any) => ({
    id: item.id || item.slug || '',
    handle: item.handle || item.slug || '',
    title: item.title || item.shoeName || '',
    slug: item.slug,
    productName: item.shoeName,
    coverImage: item.coverImage, // if you're using shots, you might also include item.shots
    currentPrice: item.currentPrice,
    previousPrice: item.previousPrice,
    shoeCategory: item.shoeCategory,
    rating: item.rating,
    reviews: item.reviews,
    pieces_sold: item.pieces_sold,
    justIn: item.justIn,
    shots: item.shots,
    overview: item.overview,
    shipment_details: item.shipment_details,
  }));

  return (
    <div className="">
      <Slider
        itemPerRow={4}
        data={mappedData}
        renderItem={(item) => {
          if (!item) return null;
          return (
            <ProductCard showPrevPrice product={item} className="bg-white" />
          );
        }}
      />
    </div>
  );
};

export default ProductSlider;
