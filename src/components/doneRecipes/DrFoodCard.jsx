import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import DrShareBtn from './DrShareBtn';

export default function DrFoodCard({ doneRecipesArray }) {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <div>
      {doneRecipesArray.map((rec, index) => (
        rec.type === 'food'
        && (
          <div className="ItemFavorite" key={ rec.id }>
            <Link
              to={ `/foods/${rec.id}` }
            >
              <img
                src={ rec.image }
                alt="Imagem da Receita"
                data-testid={ `${index}-horizontal-image` }
                width="160px"
              />
            </Link>
            <div>
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${rec.nationality} - ${rec.category}`}
              </h4>
              <Link
                to={ `/foods/${rec.id}` }
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

DrFoodCard.propTypes = {
  doneRecipesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};
