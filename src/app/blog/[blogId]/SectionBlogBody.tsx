import Image from 'next/image';
import { pathOr } from 'ramda';
import type { FC } from 'react';
import React from 'react';
import Heading from '@/shared/Heading/Heading';

interface SectionBlogBodyProps {
  blogData: any | null;
}

const SectionBlogBody: FC<SectionBlogBodyProps> = ({ blogData }) => {
  if (!blogData) return <div>No blog content available.</div>;

  return (
    <div className="border-t border-neutral-300 py-10">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Section One */}
        <div className="space-y-5">
          <Heading isMain>{pathOr('', ['sectionOne', 'title'], blogData)}</Heading>
          <p className="text-neutral-500">{pathOr('', ['sectionOne', 'paragraph1'], blogData)}</p>
          <ul className="ml-5 space-y-5 text-neutral-500">
            {pathOr([], ['sectionOne', 'points'], blogData).map((point: string) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="text-neutral-500">{pathOr('', ['sectionOne', 'paragraph2'], blogData)}</p>
        </div>

        {/* Section Two */}
        <div className="space-y-5">
          <Heading desc={pathOr('', ['sectionTwo', 'description'], blogData)}>
            {pathOr('', ['sectionTwo', 'title'], blogData)}
          </Heading>

          <div className="overflow-hidden rounded-2xl">
            <Image
              src={pathOr('', ['sectionTwo', 'midImage'], blogData)}
              width={1000}
              height={1000}
              alt="Mid Section Image"
              className="size-full object-cover object-center"
            />
          </div>
        </div>

        {/* Section Three */}
        <div>
          <Heading desc={pathOr('', ['sectionThree', 'description'], blogData)}>
            {pathOr('', ['sectionThree', 'title'], blogData)}
          </Heading>
        </div>

        {/* Section Four */}
        <div className="space-y-5">
          <Heading desc={pathOr('', ['sectionFour', 'description'], blogData)}>
            {pathOr('', ['sectionFour', 'title'], blogData)}
          </Heading>
          <ol className="ml-5 space-y-5 text-neutral-500">
            {pathOr([], ['sectionFour', 'points'], blogData).map((point: string, index: number) => (
              <li key={point}>
                <span>{index + 1}.</span> {point}
              </li>
            ))}
          </ol>
        </div>

        {/* Quote Section */}
        <div className="relative overflow-hidden rounded-2xl p-14 shadow-xl">
          <div className="absolute left-0 top-0 h-full w-2.5 bg-primary" />
          <div className="text-2xl font-bold text-primary">
            {pathOr('', ['quote'], blogData)}
          </div>
        </div>

        {/* Section Five */}
        <div className="space-y-10">
          {pathOr([], ['sectionFive'], blogData).map((section: any) => (
            <div key={pathOr('', ['title'], section)}>
              <Heading desc={pathOr('', ['description'], section)}>
                {pathOr('', ['title'], section)}
              </Heading>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionBlogBody;
