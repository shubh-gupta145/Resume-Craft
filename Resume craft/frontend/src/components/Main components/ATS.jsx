import Carousel from "../ATS Subcomponent/Carousel";
import AtsInfoSection from "../ATS Subcomponent/AtsInfoSection";
import HowAtsWork from "../ATS Subcomponent/AtsStepsDefinder";
import Result from "../ATS Subcomponent/result";
import Disclamer from "../ATS Subcomponent/Disclamer";

function ATS(){
  return (
    <>
    <Carousel></Carousel>
    <AtsInfoSection></AtsInfoSection>
    <HowAtsWork></HowAtsWork>
    <Disclamer></Disclamer>
    <Result></Result>
    </>
  )
}
export default ATS;