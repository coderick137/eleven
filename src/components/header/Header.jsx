import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
// import { BiSearchAlt } from 'react-icons/bi';
// import { BsPersonFill } from 'react-icons/bs';
import SearchBar from './SearchBar';
import '../../index.css';

export default function Header() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const [mustRenderSearchBar, setMustRenderSearchBar] = useState(false);

  // CONSTANTES ------------------------------------------------------------------------------------
  const location = useLocation(); // REF: https://v5.reactrouter.com/web/api/Hooks/uselocation
  const currentPathName = location.pathname; // LOCALIZA NOME DA ROTA

  // FUNÇÕES ---------------------------------------------------------------------------------------
  const definePageName = {
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/explore': 'Explore',
    '/explore/foods': 'Explore Foods',
    '/explore/foods/ingredients': 'Explore Ingredients',
    '/explore/drinks': 'Explore Drinks',
    '/explore/drinks/ingredients': 'Explore Ingredients',
    '/explore/foods/nationalities': 'Explore Nationalities',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  };

  const renderSearchBar = () => setMustRenderSearchBar(!mustRenderSearchBar);

  return (
    <header>
      <div className="section__header">
        <div className="header__icon">
          <Link className="header__icon" to="/profile">
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              className="header__icon--person" // ====
              alt="Ícone default de perfil"
            />
          </Link>
        </div>
        <div className="header__tilte">
          <h1
            className="header__tilte--h1"
            data-testid="page-title" // ====
          >
            { definePageName[currentPathName] }
          </h1>
        </div>
        <div className="header__icon">
          {(currentPathName === '/foods'
          || currentPathName === '/drinks'
          || currentPathName === '/explore/foods/nationalities') && (
            <div
              onClick={ renderSearchBar }
              onKeyPress={ renderSearchBar }
              role="button"
              tabIndex={ 0 }
            >
              <img
                src={ searchIcon }
                className="header__icon--search"
                data-testid="search-top-btn" // ====
                alt="Ícone default de pesquisa"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        {mustRenderSearchBar && (
          <SearchBar />
        )}
      </div>
    </header>
  );
}
