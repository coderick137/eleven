import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Context from '../../context/Context';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

export default function RecipeHeader() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const { details,
    favoriteRecipes,
    setIsColoredMeal,
    setIsColoredDrink,
  } = useContext(Context);

  // CONSTANTES ------------------------------------------------------------------------------------
  const { idReceita } = useParams();
  const location = useLocation();
  const currentPathName = location.pathname;
  const foodOrDrink = (currentPathName.includes('food')) ? 'Meal' : 'Drink';
  const categoryOrAlcoholic = (
    currentPathName.includes('food')) ? 'Category' : 'Alcoholic';

  // HEART-COLOR -----------------------------------------------------------------------------------
  const changeColor = () => {
    if (currentPathName.includes('food')) {
      if (favoriteRecipes.some(({ id }) => id === idReceita)) {
        setIsColoredMeal(true);
      } else setIsColoredMeal(false);
    }
    if (currentPathName.includes('drink')) {
      if (favoriteRecipes.some(({ id }) => id === idReceita)) {
        setIsColoredDrink(true);
      } else setIsColoredDrink(false);
    }
  };

  useEffect(() => {
    changeColor();
  }, [favoriteRecipes, idReceita]);

  useEffect(() => {
    changeColor();
  }, []);

  // FAVORITE-RECIPES-LS ---------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);
  // -----------------------------------------------------------------------------------------------

  return (
    <header>
      <div>
        <img
          data-testid="recipe-photo"
          width="100%"
          src={ details[`str${foodOrDrink}Thumb`] }
          alt={ `${foodOrDrink} Recipe` }
        />
        <h1
          className="title"
          data-testid="recipe-title"
        >
          { details[`str${foodOrDrink}`] }
        </h1>
        <h3
          className="subTitle"
          data-testid="recipe-category"
        >
          { details[`str${categoryOrAlcoholic}`] }
        </h3>
      </div>
      <div>
        {/* Botoes */}
        <ShareBtn />
        <FavoriteBtn />
      </div>
    </header>
  );
}
