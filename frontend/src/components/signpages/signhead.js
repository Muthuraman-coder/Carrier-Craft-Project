import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-carrier">Carrier Craft Academy</span>
        {/* <span className="logo-craft">CCA</span> */}
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="/centres">Our Centres</a></li>
          <li><a href="/help">Help</a></li>
          <li><a href="/about">About Us</a></li>
          <li ><button><a href='/signin'>Log In</a></button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
