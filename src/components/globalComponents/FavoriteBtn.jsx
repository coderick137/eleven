import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Context from '../../context/Context';

export default function FavoriteBtn() {
  const { details,
    favoriteRecipes,
    addFavoriteRecipe,
    removeFavoriteRecipe,
    isColoredMeal,
    isColoredDrink,
  } = useContext(Context);
  // CONSTANTES ------------------------------------------------------------------------------------
  const location = useLocation();
  const currentPathName = location.pathname;

  // FUNÇÕES FAVORITE ------------------------------------------------------------------------------
  const saveFavoriteBtnMeal = () => {
    const favoriteMealRecipe = {
      id: details.idMeal,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
    };

    const isThisMealFav = favoriteRecipes.some(({ id }) => id === details.idMeal);

    if (!isThisMealFav) {
      addFavoriteRecipe(favoriteMealRecipe);
    } else {
      removeFavoriteRecipe(details.idMeal);
    }
  };

  const saveFavoriteBtnDrink = () => {
    const favoriteDrinkRecipe = {
      id: details.idDrink,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };

    const isThisDrinkFav = favoriteRecipes.some(({ id }) => id === details.idDrink);

    if (!isThisDrinkFav) {
      addFavoriteRecipe(favoriteDrinkRecipe);
    } else {
      removeFavoriteRecipe(details.idDrink);
    }
  };

  const onClickFavoriteBtn = () => {
    if (currentPathName.includes('food')) {
      saveFavoriteBtnMeal();
    }
    if (currentPathName.includes('drink')) {
      saveFavoriteBtnDrink();
    }
  };

  return (
    <div>
      {/* ========FAVORITE========= */}
      <div
        className="favoriteBtnContainer"
        onClick={ () => onClickFavoriteBtn() }
        onKeyDown={ () => onClickFavoriteBtn() }
        role="button"
        tabIndex={ 0 }
      >
        {currentPathName.includes('food')
          ? (
            <img
              data-testid="favorite-btn"
              src={ isColoredMeal ? blackHeartIcon : whiteHeartIcon }
              alt="Ícone de Favoritar"
            />)
          : (
            <img
              data-testid="favorite-btn"
              src={ isColoredDrink ? blackHeartIcon : whiteHeartIcon }
              alt="Ícone de Favoritar"
            />)}
      </div>
    </div>
  );
}
