import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/header/Header';

export default function Profile() {
  const userEmail = localStorage.getItem('user');
  const user = JSON.parse(userEmail);
  return (
    <div>
      <Header />
      <div className="container">
        <h2
          data-testid="profile-email"
        >
          { user?.email }
        </h2>
        <div>
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>
        </div>
        <div>
          <Link to="/favorite-recipes">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
