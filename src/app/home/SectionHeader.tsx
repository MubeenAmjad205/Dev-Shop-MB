'use client'
import PromoTag from '@/components/PromoTag';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import {GET_HOME__HEADER_SECTION} from '@/queries/contentfulQueries';
import { useQuery } from '@apollo/client';
import { contentfulClient } from '@/lib/contentfulGraphQL';
import Loading from '../loading';
import { useRouter } from 'next/navigation';


const SectionHeader = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_HOME__HEADER_SECTION, {
    client: contentfulClient,
  });
  const handleViewProduct = ()=>{
    router.push('/products');
  };

if (loading) return <div><Loading /></div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading Home Heading: {error.message}
      </div>
    );
  const homeHeading = data?.homeHeaderSectionCollection?.items[0] || {};
  const {heading, title, description,image } = homeHeading;



  return (
    <div className="container items-stretch gap-y-5 lg:flex lg:gap-5 lg:gap-y-0">
      <div className="basis-[68%] items-center space-y-10 rounded-2xl bg-gray p-5 md:flex md:space-y-0 ">
        <div className="basis-[63%]">
          <h4 className="mb-5 text-xl font-medium text-primary">
            {title}
          </h4>
          <h1
            className="text-[50px] font-medium tracking-tight"
            style={{ lineHeight: '1em' }}
          >
            {heading}
          </h1>
          <p className="my-10 w-4/5 text-neutral-500">
            {description}
          </p>
          <ButtonPrimary sizeClass="px-5 py-4" onClick={handleViewProduct}>View Product</ButtonPrimary>
        </div>
        <div className="basis-[37%]">
          <img src={image?.url||''} alt="shoe box" className="w-full" />
        </div>
      </div>

      <div className="mt-5 basis-[30%] lg:mt-0">
        <PromoTag />
      </div>
    </div>
  );
};

export default SectionHeader;
