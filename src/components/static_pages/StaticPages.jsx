import React from "react";
import Footer from "./Footer";
import ReadMore from "./ReadMore";
import Reviews from "./Reviews";
import StaticHomePage from "./StaticHomePage";
import StaticHomePage2 from "./StaticHomePage2";
// import { useSelector } from "react-redux";


function StaticPages() {

  // const { staticReviews } = useSelector((store) => store.static);
  // const { allCustomers } = useSelector((store) => store.customer);

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
