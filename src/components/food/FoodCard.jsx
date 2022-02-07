import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function FoodCard({ meals }) {
  const eleven = 11;
  const history = useHistory();

  return (
    <div>
      {meals.filter((_meal, i) => (i <= eleven))
        .map((item, index) => (
          <div
            key={ item.idMeal }
            data-testid={ `${index}-recipe-card` }
            className="ItemFoodOrDrink"
            onClick={ () => history.push(`/foods/${item.idMeal}`) }
            onKeyDown={ () => history.push(`/foods/${item.idMeal}`) }
            role="button"
            tabIndex={ 0 }
          >
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              width="150px"
              data-testid={ `${index}-card-img` }
            />
            <h2
              data-testid={ `${index}-card-name` }
            >
              {item.strMeal}
            </h2>
          </div>
        ))}
    </div>
  );
}

FoodCard.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FoodCard;
