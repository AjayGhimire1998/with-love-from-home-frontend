import React from "react";
import { handleReadMore } from "../../app/services/other-services/service";

function ReadMore() {
  return (
    <div className="ui vertical stripe segment">
      <div className="ui text container">
        <br />
        <br />
        <hr />

        <h1 className="ui header" style={{ textAlign: "center" }}>
          Breaking The Grid, Grabbing Your Attention
        </h1>
        <br />
        <p>
          Instead of focusing on content creation and hard work, we have learned
          how to master the art of doing nothing by providing massive amounts of
          whitespace and generic content that can seem massive, monolithic and
          worth your attention.
        </p>
        <button
          className="ui button read-more"
          onClick={() => handleReadMore()}
        >
          Read More
        </button>
        <p id="hidden-paragraph" style={{ display: "none" }}>
          Ecommerce (or electronic commerce) is the buying and selling of goods
          or services on the Internet. It encompasses a wide variety of data,
          systems and tools for online buyers and sellers, including mobile
          shopping and online payment encryption. Most businesses with an online
          presence use an online store and/or platform to conduct ecommerce
          marketing and sales activities and to oversee logistics and
          fulfilment. According to eMarketer, in 2022, global retail ecommerce
          sales will surpass $5 trillion for the first time, accounting for more
          than a fifth of overall retail sales. And by 2025, total spending will
          exceed $7 trillion, despite slowing growth. To fully understand
          ecommerce, let's take a look at its history, growth and impact on the
          business world. We will also discuss some advantages and disadvantages
          to ecommerce as well as predictions for the future. For more expert
          insights on the go, check out our biweekly audio series, the Make it
          Big Podcast, where global thought leaders discuss all things ecommerce
          — from industry news and trends to growth strategies and success
          stories.
        </p>
      </div>
      <br />
      <br />
    </div>
  );
}

export default ReadMore;
