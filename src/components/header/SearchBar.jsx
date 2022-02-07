import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
// import mealsAndDrinksAPI from '../../services/API';
import Context from '../../context/Context';

export default function SearchBar() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const {
    meals,
    drinks,
    fetchMeals,
    fetchDrink,
  } = useContext(Context);
  const [searchedItem, setSearchedItem] = useState('');
  const [chosenRadioBtn, setChosenRadioBtn] = useState('');

  // CONSTANTES ------------------------------------------------------------------------------------
  const location = useLocation(); // REF: https://v5.reactrouter.com/web/api/Hooks/uselocation
  const currentPathName = location.pathname; // LOCALIZA NOME DA ROTA
  const history = useHistory();

  // FUNÇÕES ---------------------------------------------------------------------------------------
  const filterDirectFood = () => {
    if (meals.length === 1) {
      history.push(`/foods/${meals[0].idMeal}`);
    }
  };

  const filterDirectDrink = () => {
    if (drinks.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
    }
  };

  useEffect(() => {
    if (currentPathName === '/foods') {
      filterDirectFood();
    }
    if (currentPathName === '/drinks') {
      filterDirectDrink();
    }
  }, [meals, drinks]);

  const reqFoods = () => {
    let url = 'https://www.themealdb.com/api/json/v1/1/';
    if (chosenRadioBtn === 'ingredientRdBtn') url += `filter.php?i=${searchedItem}`;
    if (chosenRadioBtn === 'foodNameRdBtn') url += `search.php?s=${searchedItem}`;
    if (chosenRadioBtn === 'firstLetterRdBtn' && searchedItem.length <= 1) {
      url += `search.php?f=${searchedItem}`;
    }
    if (chosenRadioBtn === 'firstLetterRdBtn' && searchedItem.length > 1) {
      const err = 'Your search must have only 1 (one) character';
      global.alert(err);
      return err;
    }
    fetchMeals(url);
  };

  const reqDrinks = () => {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/';
    if (chosenRadioBtn === 'ingredientRdBtn') url += `filter.php?i=${searchedItem}`;
    if (chosenRadioBtn === 'foodNameRdBtn') url += `search.php?s=${searchedItem}`;
    if (chosenRadioBtn === 'firstLetterRdBtn' && searchedItem.length <= 1) {
      url += `search.php?f=${searchedItem}`;
    }
    if (chosenRadioBtn === 'firstLetterRdBtn' && searchedItem.length > 1) {
      const err = 'Your search must have only 1 (one) character';
      global.alert(err);
      return err;
    }
    fetchDrink(url);
  };

  const onSearchClick = () => {
    if (currentPathName === '/foods') {
      reqFoods();
    }
    if (currentPathName === '/drinks') {
      reqDrinks();
    }
  };

  return (
    <div className="Search">
      <div className="section__search">
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          className="search__input"
          placeholder="Search Recipe"
          onChange={ ({ target }) => setSearchedItem(target.value) }
          value={ searchedItem }
        />
        <button
          type="button"
          className="btn--search"
          data-testid="exec-search-btn"
          onClick={ onSearchClick }
        >
          Buscar
        </button>
      </div>
      <div className="SearchFilters">
        <label htmlFor="ingredientRdBtn">
          <input
            type="radio"
            name="ingredientRdBtn"
            id="ingredientRdBtn"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => setChosenRadioBtn(target.value) }
            value="ingredientRdBtn"
            checked={ chosenRadioBtn === 'ingredientRdBtn' }
          />
          {' '}
          Ingrediente
        </label>
        <label htmlFor="foodNameRdBtn">
          <input
            type="radio"
            name="foodNameRdBtn"
            id="foodNameRdBtn"
            data-testid="name-search-radio"
            value="foodNameRdBtn"
            onChange={ ({ target }) => setChosenRadioBtn(target.value) }
            checked={ chosenRadioBtn === 'foodNameRdBtn' }
          />
          {' '}
          Nome
        </label>
        <label htmlFor="firstLetterRdBtn">
          <input
            type="radio"
            name="firstLetterRdBtn"
            id="firstLetterRdBtn"
            data-testid="first-letter-search-radio"
            value="firstLetterRdBtn"
            onChange={ ({ target }) => setChosenRadioBtn(target.value) }
            checked={ chosenRadioBtn === 'firstLetterRdBtn' }
          />
          {' '}
          Primeira letra
        </label>
      </div>
    </div>
  );
}
