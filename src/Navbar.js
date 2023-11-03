import React from 'react';
import './css/Navbar.css';

function Navbar({ onChangeSearch }) {
  return (
    <div className="navbar">
      <div className="navbar--center">
        <div className="navbar--logo">
          <span>🍿</span>
          <h1 className="navbar--logo-h1">BasMovie</h1>
        </div>
        <input
          type="search"
          className="navbar--search"
          placeholder="Search something..."
          onChange={e => onChangeSearch(e)}
        ></input>
      </div>
    </div>
  );
}

export default Navbar;
