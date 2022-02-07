import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import '../index.css';

export default function ExploreFoods() {
  const history = useHistory();
  const [randomMeal, setRandomMeal] = useState('');

  const getRandomMeal = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setRandomMeal(jsonFormat.meals);
  };

  useEffect(() => {
    getRandomMeal();
  }, []);

  return (
    <div>
      <Header />
      <section className="SearchFilters" id="exploreFoodsBtnsContainer">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-by-nationality"
          type="button"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/foods/${randomMeal[0].idMeal}`) }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}
