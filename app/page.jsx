import React from 'react';
import Banner from './HistoryBanner';
import Vedio from './Vedio';
import Handpicked from './Handpicked';
import Sample from './Sample';

const page = () => {
  return (
    <>
      <div className="w-screen h-full bg-gray-900">
        <Banner />
        <Vedio />
        <Handpicked />
        {/* <Sample /> */}
        {/* <Sample /> */}
      </div>
    </>
  );
};

export default page;
