import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Menu: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-brand">Metropolitan Museum of Art</Link>
          </li>
        </ul>
          <Link to="/advanced-search" className="navbar-link">Recherche Avancée</Link>
      </div>
    </nav>
  );
};

export default Menu;
