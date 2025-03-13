'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_GUIDE } from '@/queries/contentfulQueries';
import { contentfulClient } from '@/lib/contentfulGraphQL';

interface ProductGuideSectionProps {
  productId: string;
}

const ProductGuideSection: React.FC<ProductGuideSectionProps> = ({ productId }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_GUIDE, {
    variables: { productId },
    client: contentfulClient,
  });

  if (loading) return <div>Loading product guide...</div>;
  if (error) {
    console.error('Error fetching product guide:', error);
    return <div>Error loading product guide.</div>;
  }

  const guide = data?.productGuideCollection?.items?.[0];

  if (!guide) return <div>No guide available for this product.</div>;

  return (
    <div className="product-guide my-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-2">{guide.title}</h2>
      <p className="mb-4">{guide.description}</p>
      {guide.image && (
        <img
          src={guide.image.url}
          alt={guide.image.altText || guide.title}
          className="w-full object-contain"
        />
      )}
    </div>
  );
};

export default ProductGuideSection;
