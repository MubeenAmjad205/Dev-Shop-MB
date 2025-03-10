import React from 'react';
import { LuFilter } from 'react-icons/lu';
import { MdOutlineFilterList, MdSearch } from 'react-icons/md';

import ProductCard from '@/components/ProductCard';
import SidebarFilters from '@/components/SideBarFilter';
import SectionBrands from '../home/SectionBrands';
import { getProducts } from '@/lib/shopify';

const page = async () => {
  // Fetch raw products from Shopify
  const rawProducts = await getProducts();
  console.log('raw:  ',rawProducts);

  // Map raw Shopify data to the shape expected by ProductCard
  const products = rawProducts.map((product:any) => ({
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    image:product.images?.edges[0]?.node.url,
    price: product.variants?.edges[0]?.node.price.amount,
    // Add any other keys that your ProductCard might require
  }));

  return (
    <div className="">
      <div className="container relative flex flex-col lg:flex-row" id="body">
        <div className="pr-4 pt-10 lg:basis-1/3 xl:basis-1/4">
          <SidebarFilters />
        </div>
        <div className="mb-10 shrink-0 border-t lg:mx-4 lg:mb-0 lg:border-t-0" />
        <div className="relative flex-1">
          <div className="top-32 z-10 mb-3 items-center gap-5 space-y-5 bg-white py-10 lg:sticky lg:flex lg:space-y-0">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-neutral-300 px-4">
              <MdSearch className="text-2xl text-neutral-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-12 border-transparent bg-transparent placeholder:text-neutral-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded">
                <LuFilter />
                Filters
              </button>
              <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded">
                Most popular
                <MdOutlineFilterList />
              </button>
            </div>
          </div>
          <div className="grid flex-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 ">
            {products.map((product:any) => (
              <ProductCard  product={product} key={product.handle} />
            ))}
          </div>
        </div>
      </div>

      <div className="my-24">
        <SectionBrands />
      </div>
    </div>
  );
};

export default page;
