import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth} from '../static_pages/carousel_images/images'

function ReactSimplyCarouselExample() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const imageList = [First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth]

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          style: {
            alignSelf: "center",
            color: "black",
            cursor: "pointer",
            fontSize: "20px",
            border: 'none',
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          style: {
            alignSelf: "center",
            color: "black",
            cursor: "pointer",
            fontSize: "20px",
            border: 'none',
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {imageList.map((image) => {
            return (
                <div key={`${image}`} style={{ width: 300, height: 300, backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
                 </div>
            )
        })}
    
      </ReactSimplyCarousel>
    </div>
  );
}

export default ReactSimplyCarouselExample;
