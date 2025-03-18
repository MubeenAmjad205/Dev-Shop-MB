import { pathOr } from 'ramda';
import React from 'react';
import { gql } from '@apollo/client';
import { contentfulClient } from '@/lib/contentfulGraphQL';
import SectionBlogHero from './SectionBlogHero';
import SectionBlogBody from './SectionBlogBody';

type Props = {
  params: { blogId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const GET_BLOG_BY_SLUG = gql`
  query GetBlog($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        brief
        coverImage {
          url
        }
        blogData
        slug
      }
    }
  }
`;

const SingleBlogPage = async ({ params }: Props) => {
  const { blogId } = params;

  const { data } = await contentfulClient.query({
    query: GET_BLOG_BY_SLUG,
    variables: { slug: blogId },
  });

  const selectedBlog = data?.blogPostCollection?.items[0];

  if (!selectedBlog) return <div>No blog data available.</div>;

  return (
    <div className="container">
      <div className="pt-10">
        <SectionBlogHero
          coverImage={pathOr('', ['coverImage', 'url'], selectedBlog)}
          title={pathOr('', ['title'], selectedBlog)}
          brief={pathOr('', ['brief'], selectedBlog)}
        />
      </div>

      <div className="py-24">
        Uncomment and implement SectionBlogBody when ready
        <SectionBlogBody blogData={pathOr(null, ['blogData'], selectedBlog)} />

      </div>
    </div>
  );
};

export default SingleBlogPage;
