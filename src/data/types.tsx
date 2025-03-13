import type { StaticImageData } from 'next/image';

export type ProductType = {
  id: string;
  slug: string; 
  handle: string;
  title: string;
  productName: string; // Alias for title, as used in your mapping
  description?: string;
  shots: {
    url: string|StaticImageData;
    altText?: string;
  }[];
  currentPrice: number;
  previousPrice?: number;
  variantId?: string;
  shoeCategory?: string;
  rating?: number;
  pieces_sold?: number;
  justIn?: boolean;
};


export type BlogData = {
  sectionOne: {
    title: string;
    paragraph1: string;
    points: string[];
    paragraph2: string;
  };
  sectionTwo: {
    title: string;
    description: string;
    midImage: string;
  };
  sectionThree: {
    title: string;
    description: string;
  };
  sectionFour: {
    title: string;
    description: string;
    points: string[];
  };
  quote: string;
  sectionFive: {
    title: string;
    description: string;
  }[];
};

export type BlogType = {
  title: string;
  brief: string;
  date: string;
  coverImage: string;
  blogData: BlogData;
  tag: 'Style' | 'Fitting' | 'General';
  slug: string;
};
