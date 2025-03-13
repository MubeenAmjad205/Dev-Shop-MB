'use client';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import React, { useState, useEffect } from 'react';

import Heading from '@/shared/Heading/Heading';
import DotLoader from '@/shared/DotLoader/DotLoader';

import { GET_COLLECTIONS } from '@/queries/shopifyQueries';
import Shopifyclient from '@/lib/shopifyClient';



const SidebarFilters: React.FC<{
  selectedCollection: string;
  onSelectCollection: (collectionId: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: [number, number]) => void;
  dynamicPriceRange: number[];
}> = ({
  selectedCollection,
  onSelectCollection,
  priceRange,
  onPriceRangeChange,
  dynamicPriceRange,
}) => {
  const [collections, setCollections] = useState<any[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const [collectionsError, setCollectionsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await Shopifyclient.query({ query: GET_COLLECTIONS });
        const data = response.data;
        const fetchedCollections = data.collections.edges.map((edge: any) => edge.node);
        setCollections(fetchedCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setCollectionsError("Error loading collections.");
      } finally {
        setCollectionsLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const renderCollections = () => {
    if (collectionsLoading)
      return <div className="flex justify-center items-center h-20"><DotLoader /></div>;
    if (collectionsError) return <div>{collectionsError}</div>;

    return (
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-medium">Collections</h3>
        <div className="flex flex-wrap gap-2">
          <button
            key="all-collections"
            type="button"
            onClick={() => onSelectCollection('All')}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              selectedCollection === 'All' ? 'bg-primary text-white' : 'bg-gray'
            }`}
          >
            All
          </button>
          {collections.map((collection: any) => (
            <button
              key={collection.id}
              type="button"
              onClick={() => onSelectCollection(collection.id)}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                selectedCollection === collection.id ? 'bg-primary text-white' : 'bg-gray'
              }`}
            >
              {collection.title}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col space-y-5 py-8 pr-3 mb-20">
        <div className="space-y-5">
          <span className="font-semibold">Price range</span>
          <Slider
            range
            min={dynamicPriceRange[0]}
            max={dynamicPriceRange[1]}
            step={1}
            value={priceRange}
            allowCross={false}
            onChange={(newRange: number | number[]) => {
              if (Array.isArray(newRange) && newRange.length === 2) {
                onPriceRangeChange(newRange as [number, number]);
              }
            }}
          />
        </div>
        <div className="flex justify-between space-x-5">
          <div>
            <div className="block text-sm font-medium">Min price</div>
            <div className="relative mt-1 rounded-md">
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-500 sm:text-sm">
                $
              </span>
              <input
                type="text"
                name="minPrice"
                disabled
                id="minPrice"
                className="block w-32 rounded-full border-neutral-300 bg-transparent pl-4 pr-10 sm:text-sm"
                value={priceRange[0]}
              />
            </div>
          </div>
          <div>
            <div className="block text-sm font-medium">Max price</div>
            <div className="relative mt-1 rounded-md">
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-500 sm:text-sm">
                $
              </span>
              <input
                type="text"
                disabled
                name="maxPrice"
                id="maxPrice"
                className="block w-32 rounded-full border-neutral-300 bg-transparent pl-4 pr-10 sm:text-sm"
                value={priceRange[1]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  

  return (
    <div className="top-28 lg:sticky ">
      <Heading className="mb-0">Filter products</Heading>
      {renderCollections()}
      <div className="divide-y divide-neutral-300 ">
        {renderTabsPriceRage()}
      </div>
    </div>
  );
};

export default SidebarFilters;
