'use client';

import React from 'react';
import {  useQuery } from '@apollo/client';
import { contentfulClient } from '@/lib/contentfulGraphQL';
import Heading from '@/shared/Heading/Heading';
import SectionBlogs from './SectionBlogs';
import { GET_BLOG_HEADING } from '@/queries/contentfulQueries';
// import SectionBlogsHero from './SectionBlogsHero';
import Loading from '../loading';



const Page = () => {
  const { data, loading, error } = useQuery(GET_BLOG_HEADING, {
    client: contentfulClient,
  });

  if (loading) return <div><Loading /></div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading blog heading: {error.message}
      </div>
    );

  const blogHeading = data?.blogHeadingCollection?.items[0] || {};
  const { title, description } = blogHeading;

  return (
    <div className="container pb-20 pt-10">
      <Heading desc={description} isMain>
        {title}
      </Heading>

      {/* <div className="pb-24">
        <SectionBlogsHero />
      </div> */}

      <div className="py-24">
        <SectionBlogs />
      </div>
    </div>
  );
};

export default Page;
