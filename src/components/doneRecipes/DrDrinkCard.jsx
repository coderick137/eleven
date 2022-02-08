import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import DrShareBtn from './DrShareBtn';

export default function DrDrinkCard({ doneRecipesArray }) {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <div className="items-done-recipes">
      {doneRecipesArray.map((rec, index) => (
        rec.type === 'drink'
        && (
          <div className="ItemFavorite" key={ rec.id }>
            <Link
              className="item-favorite-link"
              to={ `/drinks/${rec.id}` }
            >
              <img
                src={ rec.image }
                alt="Imagem da Receita"
                data-testid={ `${index}-horizontal-image` }
                width="160px"
                className="item-favorite-img"
              />
            </Link>
            <div className="item-favorite-info">
              <h4 data-testid={ `${index}-horizontal-top-text` }>{rec.alcoholicOrNot}</h4>
              <Link
                to={ `/drinks/${rec.id}` }
                data-testid={ `${index}-horizontal-name` }
              >
                {rec.name}
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>{rec.doneDate}</p>
              {rec.tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}
              <div>
                <DrShareBtn
                  index={ index }
                  recipeId={ rec.id }
                  currentPathName={ currentPathName }
                />
              </div>
            </div>
          </div>)
      ))}
    </div>
  );
}

DrDrinkCard.propTypes = {
  doneRecipesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};
