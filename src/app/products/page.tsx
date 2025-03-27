'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import SidebarFilters from '@/components/SideBarFilter';
import { getProducts } from '@/queries/shopifyQueries';
import Shopifyclient from '@/lib/shopifyClient';
import { GET_PRODUCTS_BY_COLLECTION } from '@/queries/shopifyQueries';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Loading from '../loading';

const getProductsByCollection = async (
  collectionId: string,
  first: number,
  after?: string
) => {
  const response = await Shopifyclient.query({
    query: GET_PRODUCTS_BY_COLLECTION,
    variables: { collectionId, first, after },
  });
  if (!response.data.collection) {
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
  return response.data.collection.products;
};

const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [selectedCollection, setSelectedCollection] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 0]);
  const [dynamicPriceRange, setDynamicPriceRange] = useState<[number, number]>([0, 1000]);

  const itemsPerPage = 12;
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(undefined);
  const [cursorStack, setCursorStack] = useState<(string | undefined)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean; endCursor: string | null }>({
    hasNextPage: false,
    endCursor: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentCursor(undefined);
    setCursorStack([]);
    setCurrentPage(1);
  }, [selectedCollection, searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedCollection === 'All') {
          response = await getProducts(itemsPerPage, currentCursor);
        } else {
          response = await getProductsByCollection(selectedCollection, itemsPerPage, currentCursor);
        }
        const safePageInfo = response.pageInfo || { hasNextPage: false, endCursor: null };

        const mappedProducts = response.edges.map((edge: any) => ({
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

        if (mappedProducts.length > 0) {
          const prices = mappedProducts.map((p: any) => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setDynamicPriceRange([minPrice, maxPrice]);
          if (selectedPriceRange[0] === 0 && selectedPriceRange[1] === 0) {
            setSelectedPriceRange([minPrice, maxPrice]);
          }
        }
        let filteredProducts = mappedProducts.filter(
          (product: any) =>
            product.price >= selectedPriceRange[0] &&
            product.price <= selectedPriceRange[1]
        );
        if (searchQuery) {
          filteredProducts = filteredProducts.filter((product: any) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setProducts(filteredProducts);
        setPageInfo(safePageInfo);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCollection, selectedPriceRange, searchQuery, currentCursor]);

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      setCursorStack([...cursorStack, currentCursor]);
      setCurrentCursor(pageInfo.endCursor);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newStack = [...cursorStack];
      const prevCursor = newStack.pop() || undefined;
      setCursorStack(newStack);
      setCurrentCursor(prevCursor);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
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
        {loading ? (
          <div><Loading/></div>
        ) : (
          <>
            <div className="grid flex-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product: any) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
            <div className="my-8 flex items-center justify-center space-x-4">
              <ButtonSecondary
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-6 py-2 rounded-full shadow-md ${currentPage <= 1? 'opacity-50 cursor-not-allowed' : null}`}
              >
                Previous
              </ButtonSecondary>
              <ButtonPrimary disabled className="px-6 py-2 rounded-full shadow-md">
                {currentPage}
              </ButtonPrimary>
              <ButtonSecondary
                onClick={handleNextPage}
                disabled={!pageInfo?.hasNextPage}
                className={`px-6 py-2 rounded-full shadow-md ${!pageInfo?.hasNextPage ? 'opacity-50 cursor-not-allowed' : null}`}
              >
                Next
              </ButtonSecondary>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPageContent;