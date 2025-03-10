'use client';

import type { StaticImageData } from 'next/image';
// import Image from 'next/image';
// import { pathOr } from 'ramda';
import type { FC } from 'react';
import React, { useState } from 'react';

import LikeButton from './LikeButton';

interface ImageShowCaseProps {
  shots: StaticImageData[];
}

// interface Shot {
//   url: string;
// }

const ImageShowCase: FC<ImageShowCaseProps> = ({ shots }:any) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-300 p-2">
      <div className="relative overflow-hidden rounded-2xl md:h-[520px]">
        <LikeButton className="absolute right-5 top-5" />
        <img
          // src={pathOr('', [activeImageIndex], shots)}
          src={shots[activeImageIndex]?.url}
          alt="shoe image"
          className="size-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {shots.map((shot:any, index:any) => (
          <div
            key={index}
            className={`${
              activeImageIndex === index ? 'border-2 border-primary' : ''
            } h-[100px] overflow-hidden rounded-lg`}
          >
            <button
              className="size-full"
              type="button"
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={shot.url}
                alt="shoe image"
                className="size-full object-cover object-center"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowCase;
