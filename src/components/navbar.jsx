import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">📚</span>
        <h1>Library Management</h1>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Books
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/members"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Members
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/borrowings"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Borrowings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;