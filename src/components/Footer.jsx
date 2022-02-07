import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineExplore, MdOutlineLunchDining } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiDrink } from 'react-icons/bi';

export default function Footer() {
  return (
    <footer className="footer grid" data-testid="footer">
      <div className="footer__logo">
        <Link to="/drinks">
          <BiDrink className="footer__icon" />
        </Link>
      </div>
      <div>
        <Link to="/foods">
          <MdOutlineLunchDining className="footer__icon" />
        </Link>
      </div>
      <div>
        <Link to="/explore">
          <MdOutlineExplore className="footer__icon" />
        </Link>
      </div>
      <div>
        <Link to="/favorite-recipes">
          <AiOutlineHeart className="footer__icon" />
        </Link>
      </div>
    </footer>
  );
}
