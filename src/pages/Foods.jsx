import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import FoodCard from '../components/food/FoodCard';
import Context from '../context/Context';
import FoodCategories from '../components/food/FoodCategories';

export default function Foods() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const {
    meals,
    fetchMeals,
    mealsCategories,
    fetchCategoriesMeals,
  } = useContext(Context);

  // CONSTANTES ------------------------------------------------------------------------------------
  const MEALS_CAT_END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const LIST_END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  // FUNÇÕES ---------------------------------------------------------------------------------------
  useEffect(() => { // DIDMOUNT
    fetchMeals(MEALS_CAT_END_POINT);
    fetchCategoriesMeals(LIST_END_POINT);
  }, []);

  return (
    <div>
      <Header />
      <FoodCategories
        mealsCategories={ mealsCategories }
      />
      <FoodCard
        meals={ meals }
      />
      <Footer />
    </div>
  );
}
