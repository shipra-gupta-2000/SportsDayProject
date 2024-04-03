import React from 'react';
import './Header.css';

function Header() {
  const userName = "User";

  return (
    <div >
      <header className="App-header">
      <div className="event-name">Sports Day</div>
        <div className="user-greeting">Hi, {userName}</div>
      </header>
    </div>
  );
}

export default Header;
