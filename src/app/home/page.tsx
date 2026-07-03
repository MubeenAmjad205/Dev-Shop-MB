import React from 'react';

import SectionBestDeals from './SectionBestDeals';
import SectionHeader from './SectionHeader';
import SectionShopByLittleOne from './SectionShopByLittleOne';
import SectionPickYourPrice from './SectionPickYourPrice';
import SectionPopularCategories from './SectionPopularCategories';
import SectionPerfectToy from './SectionPerfectToy';
import SectionSummerBanner from './SectionSummerBanner';
import SectionTrendingToys from './SectionTrendingToys';
import SectionBeatSummerHeat from './SectionBeatSummerHeat';
import SectionAppDownload from './SectionAppDownload';

const Home = () => {
  return (
    <div>
      <div className="my-7">
        <SectionHeader />
      </div>

      <div className="mb-16">
        <SectionShopByLittleOne />
      </div>

      <div className="mb-16">
        <SectionPickYourPrice />
      </div>

      <div className="mb-16">
        <SectionPopularCategories />
      </div>

      <div className="mb-16">
        <SectionPerfectToy />
      </div>

      <div className="mb-4">
        <SectionSummerBanner />
      </div>

      <div className="mb-8">
        <SectionTrendingToys heading="Trending Toys Right Now" subHeading="Hot deals on the most requested items" />
      </div>

      <div className="mb-8">
        <SectionBeatSummerHeat />
      </div>

      <div className="mb-16">
        <SectionTrendingToys heading="Top Picks of the Month" subHeading="Curated selection just for your little ones" />
      </div>

      <div className="mb-16">
        <SectionAppDownload />
      </div>

    </div>
  );
};

export default Home;
