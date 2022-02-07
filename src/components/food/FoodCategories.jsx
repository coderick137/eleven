import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

export default function FoodCategories({ mealsCategories }) {
  // ESTADOS =======================================================================================
  const {
    fetchMeals,
  } = useContext(Context);
  const [currentCategory, setCurrentCategory] = useState('All');
  // const [isCategoryPressed, setIsCategoryPressed] = useState(false);

  // CONSTANTES ====================================================================================
  const four = 4;

  // FUNÇÃO =======================================================================================
  const onAllCategoryClick = () => {
    fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setCurrentCategory('All');
  };

  const onAllCategoryClickFilter = (endpoint) => {
    if (endpoint === currentCategory) {
      onAllCategoryClick();
    } else {
      setCurrentCategory(endpoint);
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${endpoint}`;
      fetchMeals(url);
    }
  };

  // ===============================================================================================
  return (
    <div>
      <button
        className="button--filter"
        data-testid="All-category-filter"
        type="button"
        onClick={ () => onAllCategoryClick() }
      >
        All
      </button>
      {mealsCategories.filter((_mealCat, i) => (i <= four))
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

FoodCategories.propTypes = {
  mealsCategories: PropTypes.arrayOf(String).isRequired,
};
