import React from 'react';

import SectionBestDeals from './SectionBestDeals';
import SectionHeader from './SectionHeader';

const Home = () => {
  return (
    <div>
      <div className="my-7">
        <SectionHeader />
      </div>

      <div className="mb-32">
        <SectionBestDeals />
      </div>

    </div>
  );
};

export default Home;
