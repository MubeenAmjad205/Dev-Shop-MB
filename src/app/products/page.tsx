'use client';

import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';

import ProductCard from '@/components/ProductCard';
import SidebarFilters from '@/components/SideBarFilter';
import SectionBrands from '../home/SectionBrands';
import { getProducts } from '@/lib/shopify';
import Shopifyclient from '@/lib/shopifyClient';
import { GET_PRODUCTS_BY_COLLECTION } from '@/queries/shopifyQueries';

// Helper function to fetch products by collection using Shopifyclient.query
const getProductsByCollection = async (collectionId: string) => {
  const response = await Shopifyclient.query({
    query: GET_PRODUCTS_BY_COLLECTION,
    variables: { collectionId },
  });
  // Return an array of product nodes
  return response.data.collection.products.edges.map((edge: any) => edge.node);
};

const ProductsPageContent = () => {
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New states for dynamic price range filtering
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 0]);
  const [dynamicPriceRange, setDynamicPriceRange] = useState<[number, number]>([0, 1000]);

  // Fetch products based on the selected collection and update price range accordingly.
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let rawProducts;
        if (selectedCollection === 'All') {
          rawProducts = await getProducts();
        } else {
          rawProducts = await getProductsByCollection(selectedCollection);
        }
        // Map raw Shopify data to the shape expected by ProductCard.
        // Here we make sure to include id, handle, and title.
        const mappedProducts = rawProducts.map((product: any) => ({
          id: product.id,
          handle: product.handle,
          title: product.title,
          slug: product.handle, // assuming slug is same as handle
          shoeName: product.title, // you can alias title as shoeName
          description: product.description,
          image: product.images?.edges[0]?.node.url,
          price: Number(product.variants?.edges[0]?.node.price.amount),
          // If you need variantId for checkout, you might add:
          variantId: product.variants?.edges[0]?.node?.id || null,
          // Optionally, add other fields as required by ProductCard
        }));
        
        // Update dynamic price range based on fetched products
        if (mappedProducts.length > 0) {
          const prices = mappedProducts.map((p: any) => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setDynamicPriceRange([minPrice, maxPrice]);
          // If initial selected price range is not set, initialize it.
          if (selectedPriceRange[0] === 0 && selectedPriceRange[1] === 0) {
            setSelectedPriceRange([minPrice, maxPrice]);
          }
        }
        
        // Filter products based on the selected price range.
        const filteredProducts = mappedProducts.filter(
          (product: any) =>
            product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCollection, selectedPriceRange]);

  return (
    <div className="">
      <div className="container relative flex flex-col lg:flex-row" id="body">
        <div className="pr-4 pt-10 lg:basis-1/3 xl:basis-1/4">
          <SidebarFilters
            selectedCollection={selectedCollection}
            onSelectCollection={setSelectedCollection}
            priceRange={selectedPriceRange}
            onPriceRangeChange={(range) => setSelectedPriceRange(range)}
            dynamicPriceRange={dynamicPriceRange}
          />
        </div>
        <div className="mb-10 shrink-0 border-t lg:mx-4 lg:mb-0 lg:border-t-0" />
        <div className="relative flex-1">
          <div className="top-32 z-10 mb-3 flex items-center gap-5 space-y-5 bg-white py-10 lg:sticky lg:flex lg:space-y-0">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-neutral-300 px-4">
              <MdSearch className="text-2xl text-neutral-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-12 border-transparent bg-transparent placeholder:text-neutral-500 focus:border-transparent"
              />
            </div>
          </div>
          {loading ? (
            <div>Loading products...</div>
          ) : (
            <div className="grid flex-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product: any) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="my-24">
        <SectionBrands />
      </div>
    </div>
  );
};

export default ProductsPageContent;
