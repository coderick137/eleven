// import React, { useState } from 'react';
import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import mealsAndDrinksAPI from '../services/API';
import DtsIngredientes from '../components/details/DtsIngredientes';
import RecipeInstructions from '../components/globalComponents/RecipeInstructions';
import DtsRecommended from '../components/details/DtsRecommended';
import DtsStartBtn from '../components/details/DtsStartBtn';
import DtsVideo from '../components/details/DtsVideo';
import Context from '../context/Context';
import RecipeHeader from '../components/globalComponents/RecipeHeader';

export default function Details() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const { setDetails,
    inProgressRecipes,
    doneRecipes,
    details,
    setRecomended,
    setMeasure,
    setIngredients,
  } = useContext(Context);
  // CONSTANTES ------------------------------------------------------------------------------------
  const { idReceita } = useParams();
  const location = useLocation();
  const currentPathName = location.pathname;

  const startRecipe = 'Start Recipe';
  const continueRecipe = 'Continue Recipe';
  const [startBtnStatus, setStartBtnStatus] = React.useState(startRecipe);
  const [mustRenderStartBtn, setMustRenderStartBtn] = React.useState(true);

  // EndPoint Details
  const END_POINT_FOOD_FILTER_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`;
  const END_POINT_DRINK_FILTER_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`;

  // EndPoint Recomendações
  const END_POINT_FOOD_RANDOM = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const END_POINT_DRINK_RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  // FETCH ---------------------------------------------------------------------------------------
  useEffect(() => {
    if (currentPathName.includes('foods')) {
      mealsAndDrinksAPI(END_POINT_FOOD_FILTER_ID)
        .then((data) => setDetails(data.meals[0]));
      mealsAndDrinksAPI(END_POINT_DRINK_RANDOM)
        .then((data) => setRecomended(data.drinks));
    }
    if (currentPathName.includes('drinks')) {
      mealsAndDrinksAPI(END_POINT_DRINK_FILTER_ID)
        .then((data) => setDetails(data.drinks[0]));
      mealsAndDrinksAPI(END_POINT_FOOD_RANDOM)
        .then((data) => setRecomended(data.meals));
    }
  }, [idReceita]);

  // ==========================INGREDIENTS-LIST=====================================
  const filter = () => {
    const keysIngre = Object.keys(details)
      .filter((item) => item.includes('strIngredient'));
    const keysMeasu = Object.keys(details)
      .filter((item) => item.includes('strMeasure'));
    const ingredients = keysIngre.map((item) => details[item])
      .filter((ing) => ing !== '' && ing !== null);
    const measure = keysMeasu.map((item) => details[item])
      .filter((ms) => ms !== ' ' && ms !== null);

    setIngredients(ingredients);
    setMeasure(measure);
  };

  React.useEffect(() => {
    filter();
  }, [details]);

  // START BTN ---------------------------------------------------------------------------------------
  const mealStatus = () => {
    const isMealRecipeDone = doneRecipes.some(({ id }) => id === idReceita);
    const isMealRecipeInProgress = inProgressRecipes.meals[idReceita];

    if (isMealRecipeDone) {
      setMustRenderStartBtn(false);
    }
    if (!isMealRecipeDone) {
      setMustRenderStartBtn(true);
      if (isMealRecipeInProgress) {
        setStartBtnStatus(continueRecipe);
      } else {
        setStartBtnStatus(startRecipe);
      }
    }
  };

  const drinkStatus = () => {
    const isMealRecipeDone = doneRecipes.some(({ id }) => id === idReceita);
    const isDrinkRecipeInProgress = inProgressRecipes.cocktails[idReceita];

    if (isMealRecipeDone) {
      setMustRenderStartBtn(false);
    }
    if (!isMealRecipeDone) {
      setMustRenderStartBtn(true);
      if (isDrinkRecipeInProgress) {
        setStartBtnStatus(continueRecipe);
      } else {
        setStartBtnStatus(startRecipe);
      }
    }
  };

  React.useEffect(() => { // UPDATE =======
    if (currentPathName.includes('food')) {
      mealStatus();
    }
    if (currentPathName.includes('drink')) {
      drinkStatus();
    }
  }, [idReceita]);

  React.useEffect(() => { // DID-MOUNT ======
    if (currentPathName.includes('drink')) {
      drinkStatus();
    }
    if (currentPathName.includes('food')) {
      mealStatus();
    }
  }, []);

  // =======================================================================

  return (
    <div>
      <RecipeHeader />
      <DtsIngredientes />
      <RecipeInstructions />
      {currentPathName.includes('foods')
      && (
        <DtsVideo />)}
      <DtsRecommended />
      {mustRenderStartBtn
        && (
          <DtsStartBtn
            startBtnStatus={ startBtnStatus }
            setStartBtnStatus={ setStartBtnStatus }
          />
        )}
    </div>
  );
}
