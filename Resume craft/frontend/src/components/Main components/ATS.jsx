import Carousel from "../ATS Subcomponent/Carousel";
import AtsInfoSection from "../ATS Subcomponent/AtsInfoSection";
import DarkInputBar from "../ATS Subcomponent/SearchBar";
import HowAtsWork from "../ATS Subcomponent/AtsStepsDefinder";
import SearchBar from "../ATS Subcomponent/SearchBar";

function ATS(){
  return (
    <>
    <Carousel></Carousel>
    <AtsInfoSection></AtsInfoSection>
    <HowAtsWork></HowAtsWork>
  <SearchBar></SearchBar>
    </>
  )
}
export default ATS;