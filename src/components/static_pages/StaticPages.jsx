import React from "react";
import Footer from "./Footer";
import ReadMore from "./ReadMore";
import Reviews from "./Reviews";
import StaticHomePage from "./StaticHomePage";
import StaticHomePage2 from "./StaticHomePage2";

function StaticPages() {
  return (
    <main>
      <StaticHomePage />
      <StaticHomePage2 />
      <Reviews />
      <ReadMore />
      <Footer />
    </main>
  );
}

export default StaticPages;
