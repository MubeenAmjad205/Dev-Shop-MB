
// export interface ProductType {
//   id: string;
//   handle: string;
//   title: string;
  // images?: {
  //   edges: Array<{
  //     node: {
  //       url: string;
  //     };
  //   }>;
  // };
  // variants?: {
  //   edges: Array<{
  //     node: {
  //       price: {
  //         amount: string;
  //       };
  //     };
  //   }>;
  // };
//   shots?: any[]; 
// }

export interface ProductType {
  id: string;
  handle: string;
  title: string;
  productName?: string;
  currentPrice: number;
  slug?: string;
  shots?: Array<{
    url: string;
    altText?: string;
  }>;
  variants?: {
    edges: Array<{
      node: {
        price: {
          amount: string;
        };
      };
    }>;
  };
  images?: {
    edges: Array<{
      node: {
        url: string;
      };
    }>;
  };
  // add other optional fields if needed:
  shoeCategory?: string;
  rating?: number;
}

export interface CartItemType {
  product: ProductType;
  quantity: number;
}


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
