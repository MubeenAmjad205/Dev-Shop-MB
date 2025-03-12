'use client';

import 'rc-slider/assets/index.css';
import { pathOr } from 'ramda';
import Slider from 'rc-slider';
import React, { useState, useEffect } from 'react';

import Heading from '@/shared/Heading/Heading';

import { GET_COLLECTIONS } from '@/queries/shopifyQueries';
import Shopifyclient from '@/lib/shopifyClient';
import Loader from '@/shared/Loader/Loader';


const PRICE_RANGE = [1, 500];

interface SidebarFiltersProps {
  selectedCollection: string;
  onSelectCollection: (collectionId: string) => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ selectedCollection, onSelectCollection }) => {
  const [rangePrices, setRangePrices] = useState([100, 500]);

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
    if (collectionsLoading) return  <div className="flex justify-center items-center h-20"><Loader /></div>
    if (collectionsError) return <div>{collectionsError}</div>;

    return (
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-medium">Collections</h3>
        <div className="flex flex-wrap gap-2">
          <button
            key="all-collections"
            type="button"
            onClick={() => onSelectCollection('All')}
            className={`px-4 py-2  rounded whitespace-nowrap ${
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
              className={`px-4 py-2  rounded whitespace-nowrap ${
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
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={1}
            defaultValue={[
              pathOr(0, [0], rangePrices),
              pathOr(0, [1], rangePrices),
            ]}
            allowCross={false}
            onChange={(_input: number | number[]) => setRangePrices(_input as number[])}
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
                value={rangePrices[0]}
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
                value={rangePrices[1]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const renderTabsLocation = () => {
  //   return (
  //     <div className="relative flex flex-col space-y-4 py-8">
  //       <h3 className="mb-2.5 text-xl font-medium">Location</h3>
  //       <div className="mb-2 flex items-center gap-2 space-y-3 rounded-full border border-neutral-300 px-4 md:flex md:space-y-0">
  //         <MdSearch className="text-2xl text-neutral-500" />
  //         <Input
  //           type="password"
  //           rounded="rounded-full"
  //           placeholder="Search..."
  //           sizeClass="h-12 px-0 py-3"
  //           className="border-transparent bg-transparent placeholder:text-neutral-500 focus:border-transparent"
  //         />
  //       </div>
  //       <div className="grid grid-cols-2 gap-4">
  //         {locations.map((item) => (
  //           <button
  //             key={item}
  //             type="button"
  //             onClick={() => setActiveLocation(item)}
  //             className={`rounded-lg py-4 ${
  //               activeLocation === item ? 'bg-primary text-white' : 'bg-gray'
  //             }`}
  //           >
  //             {item}
  //           </button>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

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
