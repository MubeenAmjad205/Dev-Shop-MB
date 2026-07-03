'use client';

import type { StaticImageData } from 'next/image';
// import Image from 'next/image';
// import { pathOr } from 'ramda';
import type { FC } from 'react';
import React, { useState } from 'react';

import LikeButton from './LikeButton';

interface ImageShowCaseProps {
  shots: StaticImageData[];
  productId: string;
}

// interface Shot {
//   url: string;
// }

const ImageShowCase: FC<ImageShowCaseProps> = ({ shots, productId }:any) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [transformOrigin, setTransformOrigin] = useState('50% 50%');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-300 dark:border-neutral-800 p-2">
      <div 
        className="relative overflow-hidden rounded-2xl md:h-[520px] cursor-crosshair group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <LikeButton productId={productId} className="absolute right-5 top-5 z-10" />
        <img
          // src={pathOr('', [activeImageIndex], shots)}
          src={shots[activeImageIndex]?.url}
          alt="shoe image"
          className="size-full object-cover object-center transition-transform duration-200 ease-out"
          style={{
            transform: isHovered ? 'scale(2)' : 'scale(1)',
            transformOrigin: isHovered ? transformOrigin : 'center center',
          }}
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
