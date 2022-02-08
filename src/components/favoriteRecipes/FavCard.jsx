import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DrShareBtn from '../doneRecipes/DrShareBtn';
import FavFavoriteBtn from './FavFavoriteBtn';

export default function FavCard({ recipe }) {
  return (
    <div className="ItemFoodOrDrink">
      <Link
        to={ `/${recipe.type}s/${recipe.id}` }
      >
        <img
          className="food-image"
          src={ recipe.image }
          alt="Imagem da Receita"
          width="160px"
        />
        <h4>
          { recipe.title }
        </h4>
        <h2>
          { recipe.name }
        </h2>
      </Link>
      <DrShareBtn
        index={ 0 }
        recipeId={ recipe.id }
        currentPathName={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
      />
      <FavFavoriteBtn id={ recipe.id } />
    </div>
  );
}

FavCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
