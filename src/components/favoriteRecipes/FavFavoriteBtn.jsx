import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Context from '../../context/Context';

export default function FavFavoriteBtn({ id }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(Context);

  const onClickFavoriteBtn = (recipeId) => {
    setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== recipeId));
  };

  return (
    <div>
      <div
        className="favoriteBtnContainer"
        onClick={ () => onClickFavoriteBtn(id) }
        onKeyDown={ () => onClickFavoriteBtn(id) }
        role="button"
        tabIndex={ 0 }
      >
        <img
          src={ blackHeartIcon }
          alt="Ícone de Favoritar"
        />
      </div>
    </div>
  );
}

FavFavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
};
