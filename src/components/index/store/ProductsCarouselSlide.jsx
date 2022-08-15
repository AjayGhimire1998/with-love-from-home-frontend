import { useState } from "react";

import ReactSimplyCarousel from "react-simply-carousel";
import { v4 as uuid } from "uuid";

function ProductsCarouselSlide({ imagesToPreview }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
            border: "none",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          style: {
            alignSelf: "center",
            color: "black",
            cursor: "pointer",
            fontSize: "20px",
            border: "none",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
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
        {imagesToPreview.map((image) => {
          return (
            <div
              key={uuid()}
              style={{
                width: 300,
                height: 300,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
              }}
            ></div>
          );
        })}
      </ReactSimplyCarousel>
    </div>
  );
}

export default ProductsCarouselSlide;
