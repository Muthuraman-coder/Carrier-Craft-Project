import React from "react";
import Header from "./signhead";

const AboutUs = () => {
  return (
    <>
    <Header />
    <div className="head-page">
      <h1>About Us</h1>
      <p>Welcome to Carrier Craft Academy, where we are dedicated to empowering individuals to achieve their goals through exceptional coaching and training programs.</p>
      <h2>Our Mission</h2>
      <p>To provide world-class coaching that fosters personal and professional growth, helping individuals unlock their full potential.</p>
      <h2>Our Vision</h2>
      <p>To be a leading academy recognized for transforming lives and creating opportunities for success.</p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Experienced and certified coaches</li>
        <li>Comprehensive and tailored programs</li>
        <li>Global reach with multiple centers</li>
        <li>Proven track record of success</li>
      </ul>
      <p>Join us on a journey to excellence and let us help you craft the career of your dreams.</p>
    </div>
    </>
  );
};

export default AboutUs;