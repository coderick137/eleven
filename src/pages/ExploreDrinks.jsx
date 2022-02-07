import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import '../index.css';

export default function ExploreFoods() {
  const history = useHistory();
  const [randomDrink, setRandomDrink] = useState('');

  const getRandomDrink = async () => {
    const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setRandomDrink(jsonFormat.drinks);
  };

  useEffect(() => {
    getRandomDrink();
  }, []);

  return (
    <div>
      <Header />
      <section className="SearchFilters" id="exploreFoodsBtnsContainer">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/drinks/${randomDrink[0].idDrink}`) }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}
