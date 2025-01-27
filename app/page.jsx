// com
import React from 'react';
import Vedio from './Vedio';
import Handpicked from './Handpicked';
import Sample from './Sample';
import HistoryBanner from './HistoryBanner';
import Banner2 from './Banner2';


const page = () => {
  return (
    <>
      <div className="w-screen h-full">
        <Banner />
        <Vedio />
        <Handpicked />
        <Sample />
        <Fourth />
        <Last />
      </div>
    </>
  );
};

export default page;
