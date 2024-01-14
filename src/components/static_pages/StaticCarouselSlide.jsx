import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function StaticCarouselSlide() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const { staticImages } = useSelector((store) => store.static);

  return (
    <div >
      {staticImages !== null ? (
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
          {staticImages?.flat(Infinity).map((image) => {
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
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default StaticCarouselSlide;
