import React from "react";
import Banner from "./HistoryBanner";
import Vedio from "./Vedio";
import Handpicked from "./Handpicked";
// import ProgressAnimation from "./ProgressAnimation";

const page = () => {
  return (
    <>
      <Banner />
      <Vedio />
      <Handpicked />
      {/* <ProgressAnimation/> */}
    </>
  );
};

export default page;
