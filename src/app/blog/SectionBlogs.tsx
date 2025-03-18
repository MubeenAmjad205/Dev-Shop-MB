'use client';

import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { contentfulClient } from '@/lib/contentfulGraphQL';
import BlogCard from '@/components/BlogCard';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Heading from '@/shared/Heading/Heading';

export const GET_BLOGS = gql`
  query GetBlogs {
    blogPostCollection {
      items {
        title
        brief
        date
        coverImage {
          url
        }
        blogData
        tag
        slug
      }
    }
  }
`;

const tags = ['All', 'Style', 'Fitting', 'General'];

const SectionBlogs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const { data, loading, error } = useQuery(GET_BLOGS, {
    client: contentfulClient,
  });

  if (loading) return <div>Loading blogs...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading blogs: {error.message}
      </div>
    );

  // Extract blogs from the query data.
  const blogs = data?.blogPostCollection?.items || [];

  // Filter blogs based on active tab.
  const filteredBlogs =
    activeTab === 'All' ? blogs : blogs.filter((blog: any) => blog.tag === activeTab);

  const handleClick = (tag: string) => {
    setActiveTab(tag);
  };

  return (
    <div className="">
      <div className="mb-16 space-y-2">
        <Heading className="mb-0" isMain isCenter>
          Latest News
        </Heading>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {tags.map((tag) => (
            <ButtonSecondary
              key={tag}
              sizeClass="px-5 py-3"
              onClick={() => handleClick(tag)}
              className={`${
                activeTab === tag
                  ? 'bg-primary text-white'
                  : 'border-2 border-primary text-primary'
              }`}
            >
              {tag}
            </ButtonSecondary>
          ))}
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog: any) => (
          <BlogCard
            key={blog.slug}
            coverImage={blog.coverImage.url}
            brief={blog.brief}
            title={blog.title}
            tag={blog.tag}
            date={blog.date.split('T')[0]}
            slug={blog.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionBlogs;
