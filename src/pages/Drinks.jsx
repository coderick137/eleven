import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import DrinkCard from '../components/drink/DrinkCard';
import Context from '../context/Context';
import DrinkCategories from '../components/drink/DrinkCategories';

export default function Drinks() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const {
    drinks,
    fetchDrink,
    drinksCategories,
    fetchCategoriesDrinks,
  } = useContext(Context);

  // CONSTANTES ------------------------------------------------------------------------------------
  const DRINK_CAT_END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const LIST_END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const eleven = 11;

  // FUNÇÕES ---------------------------------------------------------------------------------------
  useEffect(() => { // DIDMOUNT
    fetchDrink(DRINK_CAT_END_POINT);
    fetchCategoriesDrinks(LIST_END_POINT);
  }, []);

  return (
    <div>
      <Header />
      <DrinkCategories
        drinksCategories={ drinksCategories }
      />
      { drinks.filter((drink, idx) => idx <= eleven)
        .map((drink, idx) => <DrinkCard key={ idx } item={ drink } index={ idx } />) }
      <Footer />
    </div>
  );
}
