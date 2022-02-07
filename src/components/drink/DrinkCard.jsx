import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';

function DrinkCard({ item, index }) {
  const { idReceita } = useParams();
  const history = useHistory();
  const location = useLocation();
  const currentPathName = location.pathname;
  const handleDataTestId = (currentPathName.includes(idReceita))
    ? '-recomendation-card' : '-card-name';

  return (
    <div className="FoodOrDrinkCardsContainer">
      <div
        key={ item.idDrink }
        data-testid={ `${index}-recipe-card` }
        className="ItemFoodOrDrink"
        onClick={ () => history.push(`/drinks/${item.idDrink}`) }
        onKeyDown={ () => history.push(`/drinks/${item.idDrink}`) }
        role="button"
        tabIndex={ 0 }
      >
        <img
          src={ item.strDrinkThumb }
          alt={ item.strDrink }
          width="150px"
          data-testid={ `${index}-card-img` }
        />
        <h2
          className="NameFoodOrDrink"
          data-testid={ `${index}${handleDataTestId}` }
        >
          {item.strDrink}
        </h2>
      </div>
    </div>
  );
}

DrinkCard.propTypes = {
  item: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
