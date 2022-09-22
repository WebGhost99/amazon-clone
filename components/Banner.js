
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Banner() {
  return (
    <div className="relative">
        <div className="absolute w-full bottom-0 h-32 bg-gradient-to-t from-gray-500
        to-transparent z-20"></div>
        <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
        >

        <div>
            <img loading="lazy" src="https://links.papareact.com/6ff" alt="" />
        </div>

        <div>
            <img loading="lazy" src="https://links.papareact.com/7ma" alt="" />
        </div>
           
        <div>
            <img loading="lazy" src="https://links.papareact.com/gi1" alt="" />
        </div>
        </Carousel>
    </div>
   
);
}

export default Banner