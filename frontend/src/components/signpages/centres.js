import React from "react";
import Header from "./signhead";

const Centres = () => {
  return (
    <>
    <Header />
    <div className="head-page">
      <h1>Our Centres</h1>
      <p>Welcome to the Carrier Craft Academy centres page. Below are the locations of our centres:</p>
      <ul>
        <li>Centre 1: Chennai</li>
        <li>Centre 2: Puducherry</li>
        <li>Centre 3: Banglore</li>
        <li>Centre 4: Coimbatore</li>
      </ul>
      <p>For more details, please contact the centre nearest to you.</p>
    </div>
    </>
  );
};

export default Centres;