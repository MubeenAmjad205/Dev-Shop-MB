import React from 'react';
import ProductCard from '@/components/ProductCard';
import SidebarFilters from '@/components/SideBarFilter';
import { getProducts, GET_COLLECTIONS, GET_PRODUCTS_BY_COLLECTION } from '@/queries/shopifyQueries';
import Shopifyclient from '@/lib/shopifyClient';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Link from 'next/link';

export const metadata = {
  title: 'Products | Dev Shop MB',
  description: 'Browse our latest collection of premium products.',
};

// Shopify Storefront API uses specific filter structures for collections
const getProductsByCollection = async (
  collectionId: string, 
  first: number, 
  after?: string, 
  minPrice?: number, 
  maxPrice?: number
) => {
  const filters: any[] = [];
  if ((minPrice && minPrice > 0) || (maxPrice && maxPrice < 2000)) {
    filters.push({
      price: {
        min: minPrice || 0,
        max: maxPrice || 2000
      }
    });
  }

  const response = await Shopifyclient.query({
    query: GET_PRODUCTS_BY_COLLECTION,
    variables: { collectionId, first, after, filters },
  });
  if (!response.data.collection) {
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
  return response.data.collection.products;
};

const getCollections = async () => {
  const response = await Shopifyclient.query({ query: GET_COLLECTIONS });
  return response.data.collections.edges.map((edge: any) => edge.node);
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const collection = typeof params.collection === 'string' ? params.collection : 'All';
  const cursor = typeof params.cursor === 'string' ? params.cursor : undefined;
  const searchQuery = typeof params.search === 'string' ? params.search : '';
  const minPrice = typeof params.minPrice === 'string' ? Number(params.minPrice) : 0;
  const maxPrice = typeof params.maxPrice === 'string' ? Number(params.maxPrice) : 2000;
  
  const itemsPerPage = 12;

  // Build the global search query for Shopify
  const queryParts = [];
  if (searchQuery) queryParts.push(`title:*${searchQuery}*`);
  if (minPrice > 0) queryParts.push(`variants.price:>=${minPrice}`);
  if (maxPrice < 2000) queryParts.push(`variants.price:<=${maxPrice}`);
  const globalQuery = queryParts.join(' AND ');

  // Run both queries in parallel for performance
  const [collections, productsResponse] = await Promise.all([
    getCollections(),
    collection === 'All' || searchQuery !== '' 
      // If we are searching, we must use the global getProducts because collection products don't easily support fuzzy text search via filters
      ? getProducts(itemsPerPage, cursor, globalQuery || undefined) 
      : getProductsByCollection(collection, itemsPerPage, cursor, minPrice, maxPrice)
  ]);

  const safePageInfo = productsResponse.pageInfo || { hasNextPage: false, endCursor: null };
  const edges = productsResponse.edges || [];

  const mappedProducts = edges.map((edge: any) => ({
    id: edge.node.id,
    handle: edge.node.handle,
    title: edge.node.title,
    slug: edge.node.handle,
    shoeName: edge.node.title,
    description: edge.node.description,
    image: edge.node.images?.edges[0]?.node.url,
    price: Number(edge.node.variants?.edges[0]?.node.price.amount),
    variantId: edge.node.variants?.edges[0]?.node.id || null,
  }));

  // Generate pagination query
  const createQueryString = (name: string, value: string) => {
    const params2 = new URLSearchParams();
    if (collection !== 'All') params2.set('collection', collection);
    if (searchQuery) params2.set('search', searchQuery);
    if (minPrice > 0) params2.set('minPrice', minPrice.toString());
    if (maxPrice < 2000) params2.set('maxPrice', maxPrice.toString());
    params2.set(name, value);
    return params2.toString();
  };

  return (
    <div className="container relative flex flex-col lg:flex-row" id="body">
      <div className="pr-4 pt-10 lg:basis-1/3 xl:basis-1/4">
        <SidebarFilters 
          collections={collections}
          selectedCollection={collection}
          initialPriceRange={[minPrice, maxPrice]}
        />
      </div>
      <div className="mb-10 shrink-0 border-t lg:mx-4 lg:mb-0 lg:border-t-0" />
      <div className="relative flex-1 py-10">
        <div className="grid flex-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {mappedProducts.map((product: any) => (
            <ProductCard product={product} key={product.id} />
          ))}
          {mappedProducts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-full p-6 mb-4">
                <svg className="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mb-6">
                We couldn't find anything matching your current filters. Try adjusting your search criteria.
              </p>
              <Link href="/products" className="text-primary font-medium hover:underline">
                Clear all filters
              </Link>
            </div>
          )}
        </div>
        
        <div className="my-8 flex items-center justify-center space-x-4">
          {safePageInfo.hasNextPage && (
            <Link href={`/products?${createQueryString('cursor', safePageInfo.endCursor)}`} scroll={true}>
              <ButtonSecondary className="px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition-all">
                Load More Products
              </ButtonSecondary>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}