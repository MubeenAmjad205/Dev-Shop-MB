import React from 'react';

import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import {GET_HOME__PROMOTION_SECTION} from '@/queries/contentfulQueries';
import Loading from '@/app/loading';
import { contentfulClient } from '@/lib/contentfulGraphQL';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

const PromoTag = () => {

const router = useRouter()
  const { data, loading, error } = useQuery(GET_HOME__PROMOTION_SECTION, {
    client: contentfulClient,
  });

  const promotionTag = data?.promotionTagCollection?.items[0] || {};
  const { heading, description ,image} = promotionTag;
  

  const handleClick = ()=>{
     router.push('/products');
  }
  const bgImageUrl = image?.url
    // ? image.url.startsWith('//')
    //   ? `https:${image.url}`
    //   : image.url
    // : '/fallback.jpg';

  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading Promo Tag: {error.message}
      </div>
    );

  if (loading) return <div><Loading /></div>; 
  return (  
    <div className='relative h-full space-y-10 rounded-2xl bg-primary  bg-cover bg-center bg-no-repeat p-5 text-white'>
      <h1 className="text-[40px] font-medium" style={{ lineHeight: '1em',backgroundImage: `url(${bgImageUrl})`  }}>
        {heading}
      </h1>
      <p className="w-[90%]">{description}</p>
      <ButtonSecondary className="bg-white text-primary" sizeClass="px-5 py-4" onClick={handleClick}>
        Event details
      </ButtonSecondary>
    </div>
  );
};

export default PromoTag;
