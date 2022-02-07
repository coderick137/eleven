import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/header/Header';

export default function ExploreDrinkIng() {
  const eleven = 11;
  const [allDrinkIngredientsArr, setAllDrinkIngredientsArr] = useState([]);

  const getAllDrinksIngredients = async () => {
    const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(END_POINT);
    const jsonFormat = await response.json();
    setAllDrinkIngredientsArr(jsonFormat.drinks);
  };

  useEffect(() => {
    getAllDrinksIngredients();
  }, []);

  return (
    <div>
      <Header />
      <section>
        <Link
          to="/drinks"
        >
          <div className="FoodOrDrinkCardsContainer">
            {allDrinkIngredientsArr.filter((_ing, index) => index <= eleven)
              .map(({ strIngredient1 }, ind) => (
                <div
                  className="ItemFoodOrDrink"
                  data-testid={ `${ind}-ingredient-card` }
                  key={ ind }
                  onClick={ () => localStorage
                    .setItem('lastDrinkIngExplored', strIngredient1) }
                  onKeyPress={ () => localStorage
                    .setItem('lastDrinkIngExplored', strIngredient1) }
                  role="button"
                  tabIndex={ 0 }
                >
                  <img
                    data-testid={ `${ind}-card-img` }
                    className="ImgIngredients"
                    width="150px"
                    src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                    alt="Foto do Ingrediente"
                  />
                  <h4
                    className="NameFoodOrDrink"
                    data-testid={ `${ind}-card-name` }
                  >
                    {strIngredient1}
                  </h4>
                </div>
              ))}
          </div>
        </Link>
      </section>
      <Footer />
    </div>
  );
}
