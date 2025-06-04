import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Logo.png"; // adapte le chemin si besoin
import "../App.css";

const Menu: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="Logo du site" className="site-logo" />
        </Link>
        <div className="navbar-title-center">
          <Link to="/" className="navbar-brand">
            Metropolitan Museum of Art
          </Link>
        </div>
        <Link to="/advanced-search" className="navbar-link">
          Recherche Avancée
        </Link>
      </div>
    </nav>
  );
};

export default Menu;