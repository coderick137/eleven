import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import mealsAndDrinksAPI, { getCategoriesAPI } from '../services/API';

export default function MyProvider({ children }) {
  // USER ------------------------------------------------------------------------------------------
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // DETAILS ---------------------------------------------------------------------------------------
  const [details, setDetails] = useState(
    JSON.parse(localStorage.getItem('details')) || [],
  );
  const [recomended, setRecomended] = useState([]);

  useEffect(() => {
    localStorage.setItem('details', JSON.stringify(details));
  }, [details]);

  // FAVORITE --------------------------------------------------------------------------------------
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  );
  const [isColoredMeal, setIsColoredMeal] = useState(false);
  const [isColoredDrink, setIsColoredDrink] = useState(false);
  // --------
  const addFavoriteRecipe = (RECIPE_OBJ) => {
    setFavoriteRecipes([...favoriteRecipes, RECIPE_OBJ]);
  };

  const removeFavoriteRecipe = (ID) => {
    const filter = favoriteRecipes.filter(({ id }) => (id !== ID));
    setFavoriteRecipes(filter);
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  // RECEITAS EM PROGRESSO -------------------------------------------------------------------------
  const [inProgressRecipes, setInProgressRecipes] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { cocktails: {}, meals: {} },
  );
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  const startMealRecipe = (ID, RECIPE) => {
    const newMeals = { ...inProgressRecipes.meals };
    newMeals[ID] = RECIPE;
    setInProgressRecipes({ ...inProgressRecipes, meals: newMeals });
  };

  const startDrinkRecipe = (ID, RECIPE) => {
    const newCocktails = { ...inProgressRecipes.cocktails };
    newCocktails[ID] = RECIPE;
    setInProgressRecipes({ ...inProgressRecipes, cocktails: newCocktails });
  };

  // RECEITAS FEITAS -------------------------------------------------------------------------------
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) || [],
  );

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, [doneRecipes]);

  const addDoneRecipeMeal = (RECIPE_OBJ, ID) => {
    const newMeal = { ...inProgressRecipes.meals };
    delete newMeal[ID];
    setInProgressRecipes({ ...inProgressRecipes, meals: newMeal });
    setDoneRecipes([...doneRecipes, RECIPE_OBJ]);
  };

  const addDoneRecipeDrink = (RECIPE_OBJ, ID) => {
    const newCocktails = { ...inProgressRecipes.cocktails };
    delete newCocktails[ID];
    setInProgressRecipes({ ...inProgressRecipes, cocktails: newCocktails });
    setDoneRecipes([...doneRecipes, RECIPE_OBJ]);
  };

  // FILTRO RECEITAS FEITAS -------------------------------------------------------------------------------
  const [doneRcpFiltered, setDoneRcpFiltered] = useState('');

  // RECEITAS --------------------------------------------------------------------------------------
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const err = `Sorry, we haven't found any recipes for these filters${'.'}`;
  // ---------
  const fetchMeals = async (END_POINT) => { // REQUISIÇÃO DAS COMIDAS
    const responseAPI = await mealsAndDrinksAPI(END_POINT);
    if (responseAPI.meals === null) {
      global.alert(err);
    } else {
      setMeals(responseAPI.meals);
    }
  };

  const fetchDrink = async (END_POINT) => { // REQUISIÇÃO DAS BEBIDAS
    const responseAPI = await mealsAndDrinksAPI(END_POINT);
    if (responseAPI.drinks === null) {
      global.alert(err);
    } else {
      setDrinks(responseAPI.drinks);
    }
  };

  // CATEGORIAS ------------------------------------------------------------------------------------
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  // -----------
  const fetchCategoriesMeals = async (END_POINT) => {
    const responseAPI = await getCategoriesAPI(END_POINT);
    const mealsCategoriesArray = responseAPI.meals;
    setMealsCategories(mealsCategoriesArray);
  };

  const fetchCategoriesDrinks = async (END_POINT) => {
    const responseAPI = await getCategoriesAPI(END_POINT);
    const drinksCategoriesArray = responseAPI.drinks;
    setDrinksCategories(drinksCategoriesArray);
  };

  // RECOMENDATION ---------------------------------------------------------------------------------

  const contextValue = {
    // USER ==========
    userMail,
    setUserMail,
    userPassword,
    setUserPassword,
    // RECEITAS ==========
    meals,
    setMeals,
    drinks,
    setDrinks,
    // CATEGORIES ==========
    mealsCategories,
    setMealsCategories,
    drinksCategories,
    setDrinksCategories,
    // DETAILS ==========
    details,
    setDetails,
    recomended,
    setRecomended,
    // FAVORITE ==========
    favoriteRecipes,
    setFavoriteRecipes,
    isColoredMeal,
    setIsColoredMeal,
    isColoredDrink,
    setIsColoredDrink,
    addFavoriteRecipe,
    removeFavoriteRecipe,
    // RECEITAS EM PROGRESSO ==========
    inProgressRecipes,
    setInProgressRecipes,
    ingredients,
    setIngredients,
    measure,
    setMeasure,
    startMealRecipe,
    startDrinkRecipe,
    // RECEITAS FEITAS ==========
    doneRecipes,
    setDoneRecipes,
    addDoneRecipeMeal,
    addDoneRecipeDrink,
    // FETCH ==========
    fetchMeals,
    fetchDrink,
    fetchCategoriesMeals,
    fetchCategoriesDrinks,
    // FILTRO RECEITAS FEITAS  ==========
    doneRcpFiltered,
    setDoneRcpFiltered,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
