import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

export default function DrinkCategories({ drinksCategories }) {
  // ESTADOS =======================================================================================
  const {
    fetchDrink,
  } = useContext(Context);
  const [currentCategory, setCurrentCategory] = useState('All');

  // CONSTANTES ====================================================================================
  const four = 4;

  // FUNÇÃO ========================================================================================
  const onAllCategoryClick = () => {
    fetchDrink('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  };

  const onAllCategoryClickFilter = (endpoint) => {
    if (endpoint === currentCategory) {
      onAllCategoryClick();
    } else {
      setCurrentCategory(endpoint);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${endpoint}`;
      fetchDrink(url);
    }
  };

  // ===============================================================================================
  return (
    <div className="main-filter-container">
      <button
        className="button--filter"
        data-testid="All-category-filter"
        type="button"
        onClick={ () => onAllCategoryClick() }
      >
        All
      </button>
      {drinksCategories.filter((_drinkCat, i) => (i <= four))
        .map((category) => (
          <button
            className="button--filter"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            onClick={ () => onAllCategoryClickFilter(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
    </div>
  );
}

DrinkCategories.propTypes = {
  drinksCategories: PropTypes.arrayOf(String).isRequired,
};
