import React, { useContext, useEffect, useState } from 'react';
import FavDrink from '../components/favoriteRecipes/FavDrink';
import FavFood from '../components/favoriteRecipes/FavFood';
import Header from '../components/header/Header';
import Context from '../context/Context';

export default function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(Context);
  const [favoritesFoods, setFavoritesFoods] = useState(favoriteRecipes
    .filter((recipe) => recipe.type === 'food'));
  const [favoritesDrinks, setFavoritesDrinks] = useState(favoriteRecipes
    .filter((recipe) => recipe.type === 'drink'));
  const [favFilter, setFavFilter] = useState('');

  useEffect(() => {
    setFavoritesFoods(favoriteRecipes
      .filter((recipe) => recipe.type === 'food')
      .filter((recipe) => recipe.type.includes(favFilter)));
    setFavoritesDrinks(favoriteRecipes
      .filter((recipe) => recipe.type === 'drink')
      .filter((recipe) => recipe.type.includes(favFilter)));
  }, [favoriteRecipes, favFilter]);

  return (
    <div>
      <Header />
      <div className="main-filter-container">
        <button
          className="button--filter"
          type="button"
          onClick={ () => setFavFilter('') }
        >
          All
        </button>
        <button
          className="button--filter"
          type="button"
          onClick={ () => setFavFilter('food') }
        >
          Food
        </button>
        <button
          className="button--filter"
          type="button"
          onClick={ () => setFavFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div className="mainscreen-container">
        { favoritesFoods.map((food, idx) => (
          <FavFood key={ idx } favoritesFoods={ food } />)) }
        { favoritesDrinks.map((drink, idx) => (
          <FavDrink key={ idx } favoritesDrinks={ drink } />)) }
      </div>
    </div>
  );
}
