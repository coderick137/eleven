import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import mealsAndDrinksAPI from '../services/API';
import PgrFinishBtn from '../components/inProgress/PgrFinishBtn';
import PgrIngredientes from '../components/inProgress/PgrIngredientes';
import RecipeInstructions from '../components/globalComponents/RecipeInstructions';
import RecipeHeader from '../components/globalComponents/RecipeHeader';
import Context from '../context/Context';

export default function InProgress() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const { setDetails,
    details,
    setIngredients,
    setMeasure,
    startMealRecipe,
    startDrinkRecipe,
  } = useContext(Context);

  const { idReceita } = useParams();
  const location = useLocation();
  const currentPathName = location.pathname;

  const END_POINT_FOOD_FILTER_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`;
  const END_POINT_DRINK_FILTER_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`;

  useEffect(() => {
    const inProgressRecipesObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (currentPathName.includes('foods')) {
      mealsAndDrinksAPI(END_POINT_FOOD_FILTER_ID)
        .then((data) => setDetails(data.meals[0]));
      startMealRecipe(idReceita,
        inProgressRecipesObj?.meals[idReceita] || []);
    }
    if (currentPathName.includes('drinks')) {
      mealsAndDrinksAPI(END_POINT_DRINK_FILTER_ID)
        .then((data) => setDetails(data.drinks[0]));
      startDrinkRecipe(idReceita,
        inProgressRecipesObj?.cocktails[idReceita] || []);
    }
  }, []);

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

  return (
    <div>
      <RecipeHeader />
      <PgrIngredientes />
      <RecipeInstructions />
      <PgrFinishBtn />
    </div>
  );
}
