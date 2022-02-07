import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer__logo">
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Ícone de bebidas"
          />
        </Link>
      </div>
      <div>
        <Link to="/explore">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="Ícone de explorar"
          />
        </Link>
      </div>
      <div>
        <Link to="/foods">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="Ícone de comidas"
          />
        </Link>
      </div>
    </footer>
  );
}
