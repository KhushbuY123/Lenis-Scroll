import Handpicked from "./Handpicked";
import HistoryBanner from "./HistoryBanner";
import ProgressAnimation from "./ProgressAnimation";
import Vedio from "./Vedio";

export default function Home() {
  return (
    <>
      <HistoryBanner />
      <Vedio />
      <Handpicked />
      <ProgressAnimation />
    </>
  );
}
