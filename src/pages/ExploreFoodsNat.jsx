import React, { useState, useEffect, useContext } from 'react';
import FoodCard from '../components/food/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import Context from '../context/Context';

export default function ExploreFoodsNat() {
  const {
    meals,
    setMeals,
  } = useContext(Context);

  const [allMealAreas, setAllMealAreas] = useState([]);
  const [chosenArea, setChosenArea] = useState('All');

  const getAllMealAreas = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setAllMealAreas(jsonFormat.meals);
  };

  const getAllMeals = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setMeals(jsonFormat.meals);
  };

  const getAllMealsByArea = async () => {
    const END_POINT = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${chosenArea}`;
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setMeals(jsonFormat.meals);
  };

  useEffect(() => {
    getAllMealAreas();
    getAllMeals();
  }, []);

  useEffect(() => {
    if (chosenArea === 'All') {
      getAllMeals();
    }
    if (chosenArea !== 'All') {
      getAllMealsByArea();
    }
  }, [chosenArea]);

  return (
    <div>
      <Header />
      <section>
        <select
          className="SelectOrigin"
          data-testid="explore-by-nationality-dropdown"
          onChange={ ({ target }) => setChosenArea(target.value) }
        >
          <option data-testid="All-option">All</option>
          {allMealAreas.map(({ strArea }) => (
            <option
              key={ strArea }
              className="OptionsOrigin"
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>
          ))}
        </select>
      </section>
      <FoodCard
        meals={ meals }
      />
      <Footer />
    </div>
  );
}
