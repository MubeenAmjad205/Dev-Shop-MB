'use client';

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Heading from '@/shared/Heading/Heading';
import ButtonPrimary from '../Button/ButtonPrimary';
import DotLoader from '@/shared/DotLoader/DotLoader';
import { contentfulClient } from '@/lib/contentfulGraphQL';

const GET_FOOTER_BANNER = gql`
  query GetFooterBanner {
    footerBannerCollection(limit: 1) {
      items {
        heading
        description
        image {
          url
  
        }
      }
    }
  }
`;

const FooterBanner: React.FC = () => {
  const { data, loading, error } = useQuery(GET_FOOTER_BANNER, {
    client: contentfulClient,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-30">
        <DotLoader />
      </div>
    );
  }

  if (error) {
    console.error('Error loading footer banner:', error);
    return <div>Error loading footer banner</div>;
  }

  // Extract banner data from the Contentful response.
  const banner = data.footerBannerCollection.items[0];
  const bgImageUrl = banner.image?.url || '/fallback.jpg';

  return (
    <div
      className="rounded-2xl bg-cover bg-center bg-no-repeat py-16 w-full text-white"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <Heading className="mb-0" isMain isCenter>
        {banner.heading}
      </Heading>
      <p className="mx-auto w-4/5 text-center md:w-[50%]">
        {banner.description}
      </p>
      <div className="mt-10 flex items-center justify-center">
        <ButtonPrimary sizeClass="px-6 py-4">More about us</ButtonPrimary>
      </div>
    </div>
  );
};

export default FooterBanner;
