import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../components/navbar.scss';
import search from '../assets/search.png'; 
import assinatura from '../assets/assinatura.png'; 
import heart from '../assets/Heart.png';
import shopping from '../assets/ShoppingCart.png'; 
import user from '../assets/UserCircle.png';
import group from '../assets/Group.png';

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    console.log('Search term:', searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="top-row">
        <img src={logo} alt="Logo" className="logo" />
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="O que você está buscando?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <img src={search} alt="Buscar" className="search-icon" />
            </button>
          </div>
        </form>
        <div className="icon-container">
          <img src={group} className="icon" />
          <img src={heart} className="icon" />
          <img src={user} className="icon" />
          <img src={shopping} className="icon" />
        </div>
      </div>

      <div className="bottom-row">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/produtos" className="nav-link">TODAS AS CATEGORIAS</Link>
          </li>
          <li className="nav-item">
            <Link to="/error" className="nav-link">SUPERMERCADO</Link>
          </li>
          <li className="nav-item">
            <Link to="/error" className="nav-link">LIVROS</Link>
          </li>
          <li className="nav-item">
            <Link to="/error" className="nav-link">MODA</Link>
          </li>
          <li className="nav-item">
            <Link to="/error" className="nav-link">LANÇAMENTOS</Link>
          </li>
          <li className="nav-item">
            <Link to="/error" className="nav-link">OFERTAS DO DIA</Link>
          </li>
          <li className="nav-item">
            <img src={assinatura} alt="Buscar" className="icon" />
            <Link to="/error" className="nav-link">ASSINATURA</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
