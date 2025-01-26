import React from "react";
import Banner from "./HistoryBanner";
import Vedio from "./Vedio";
import Handpicked from "./Handpicked";
import Sample from "./Sample";
import Fourth from "./Fourth";
import { Last } from "./Last";

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
