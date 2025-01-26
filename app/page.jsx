import React from 'react';
import Vedio from './Vedio';
import Handpicked from './Handpicked';
import Sample from './Sample';
import HistoryBanner from './HistoryBanner';
import Banner2 from './Banner2';

const page = () => {
  return (
    <>
      <div className="w-screen h-full bg-gray-900">
        <HistoryBanner />
        <Banner2 />
        <Handpicked />
        <Sample />
        <Sample />
      </div>
    </>
  );
};

export default page;
