import React from "react";
import Header from "./signhead";

const Help = () => {
  return (
    <>
    <Header />
    <div className="head-page">
      <h1>Help</h1>
      <p>Need assistance? You can find answers to frequently asked questions below:</p>
      <ul>
        <li>How do I sign up for a course?</li>
        <li>What are the payment methods accepted?</li>
        <li>How can I contact customer support?</li>
      </ul>
      <p>If your question isn't answered here, please reach out via the <a style={{color:'blue'}} href="/signapp">Enquire page.</a></p>
    </div>
    </>
  );
};

export default Help;