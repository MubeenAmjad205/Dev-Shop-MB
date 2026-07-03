// import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

import type { ProductType } from '@/data/types';

import LikeButton from './LikeButton';

interface ProductCardProps {
  product: ProductType;
  className?: string;
  showPrevPrice?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  showPrevPrice = false,
}:any) => {

// console.log('Product Data : ' ,product) 

  return (
    <div
      className={`interactive-card relative p-3 bg-white dark:bg-neutral-800 ${className}`}
    >
      <div className="h-[250px] w-full overflow-hidden rounded-2xl lg:h-[220px] 2xl:h-[300px]">
        {product.justIn && (
          <div className="absolute left-4 top-0 rounded-b-xl bg-gradient-to-r from-secondary to-primary px-3 py-1.5 text-xs font-semibold uppercase text-white shadow-lg">
            New Arrival
          </div>
        )}
        <LikeButton className="absolute right-2 top-2 z-10" />
        <Link
          className="h-[250px] w-full lg:h-[220px]"
          href={`/products/${product.handle}`}
        >
          <img
            src={product.image}   
            alt={`${product.title} cover photo`}
            className="size-full object-cover object-bottom"
            // layout="fill"
          />
        </Link>
      </div>
      <div className="mt-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold line-clamp-2 pr-4">{product.title}</h3>
          <p
            className={`text-neutral-500 ${
              showPrevPrice ? 'block' : 'hidden'
            } text-sm line-through`}
          >
            ${product.previousPrice}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">{product.shoeCategory}</p>
          <p className="text-lg font-medium text-primary">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
