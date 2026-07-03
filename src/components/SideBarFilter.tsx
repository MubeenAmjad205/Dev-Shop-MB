'use client';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import React, { useState } from 'react';
import Heading from '@/shared/Heading/Heading';
import { useQueryState, parseAsString, parseAsInteger } from 'nuqs';

interface Collection {
  id: string;
  title: string;
}

const SidebarFilters: React.FC<{
  collections: Collection[];
  selectedCollection: string;
  initialPriceRange: [number, number];
}> = ({
  collections,
  selectedCollection,
  initialPriceRange,
}) => {
  // Using nuqs for highly optimized, type-safe URL state syncing without full page reloads
  const [collectionParam, setCollectionParam] = useQueryState('collection', parseAsString.withDefault('All'));
  const [minPriceParam, setMinPriceParam] = useQueryState('minPrice', parseAsInteger.withDefault(0));
  const [maxPriceParam, setMaxPriceParam] = useQueryState('maxPrice', parseAsInteger.withDefault(2000));
  const [, setCursorParam] = useQueryState('cursor'); // Just to clear it

  const [priceRange, setPriceRange] = useState<[number, number]>(initialPriceRange);
  const dynamicPriceRange = [0, 2000];

  const handleCollectionSelect = (id: string) => {
    setCursorParam(null); // Reset cursor on filter change
    setCollectionParam(id === 'All' ? null : id); // null removes the param
  };

  // Debounce the slider change to prevent spamming the server
  const handlePriceChangeComplete = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2 && value[0] !== undefined && value[1] !== undefined) {
      setCursorParam(null);
      setMinPriceParam(value[0] > 0 ? value[0] : null);
      setMaxPriceParam(value[1] < 2000 ? value[1] : null);
    }
  };

  const renderCollections = () => {
    if (!collections || collections.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-medium">Collections</h3>
        <div className="flex flex-wrap gap-2">
          <button
            key="all-collections"
            type="button"
            onClick={() => handleCollectionSelect('All')}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              selectedCollection === 'All' ? 'bg-primary text-white' : 'bg-gray'
            }`}
          >
            All
          </button>
          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              onClick={() => handleCollectionSelect(collection.id)}
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
            step={10}
            value={priceRange}
            allowCross={false}
            onChange={(newRange: number | number[]) => {
              if (Array.isArray(newRange) && newRange.length === 2) {
                setPriceRange(newRange as [number, number]);
              }
            }}
            onChangeComplete={handlePriceChangeComplete}
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
                placeholder='0'
                type="text"
                disabled
                className="block w-32 rounded-full border-neutral-300 bg-transparent pl-4 pr-10 sm:text-sm opacity-50"
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
                placeholder='2000'
                type="text"
                disabled
                className="block w-32 rounded-full border-neutral-300 bg-transparent pl-4 pr-10 sm:text-sm opacity-50"
                value={priceRange[1]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="top-28 lg:sticky">
      <Heading className="mb-0">Filter products</Heading>
      {renderCollections()}
      <div className="divide-y divide-neutral-300">
        {renderTabsPriceRage()}
      </div>
    </div>
  );
};

export default SidebarFilters;
