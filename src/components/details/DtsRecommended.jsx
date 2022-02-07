import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Context from '../../context/Context';

export default function DtsRecommended() {
  const { recomended } = useContext(Context);

  const location = useLocation();
  const currentPathName = location.pathname;
  const five = 5;
  // const magicNumber = 0.5; // REF: https://flaviocopes.com/how-to-shuffle-array-javascript/
  const history = useHistory();

  return (
    <div className="recommendedCardsContainer">
      <h3 className="title">Recomendações</h3>
      { currentPathName.includes('bebidas')
        ? (
          <div className="meal scroll">
            { recomended.filter((_meal, i) => (i <= five))
              .map((item, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                  className="ItemRecomended"
                  onClick={ () => history.push(`/foods/${item.idMeal}`) }
                  onKeyDown={ () => history.push(`/foods/${item.idMeal}`) }
                  role="button"
                  tabIndex={ 0 }
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    className="ImgRecomended"
                    width="150px"
                  />
                  <h2
                    className="TitleRecomended"
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {item.strMeal}
                  </h2>
                  <h4 className="subTitle">{item.strCategory}</h4>
                </div>
              ))}
          </div>)
        : (
          <div className="drink scroll">
            { recomended.filter((_drink, i) => (i <= five))
              .map((item, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                  className="ItemRecomended"
                  onClick={ () => history.push(`/drinks/${item.idDrink}`) }
                  onKeyDown={ () => history.push(`/drinks/${item.idDrink}`) }
                  role="button"
                  tabIndex={ 0 }
                >
                  <img
                    src={ item.strDrinkThumb }
                    alt={ item.strDrink }
                    className="ImgRecomended"
                    width="150px"
                  />
                  <h2
                    className="TitleRecomended"
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {item.strDrink}
                  </h2>
                  <h4 className="subTitle">{item.strCategory}</h4>
                </div>
              ))}
          </div>)}
    </div>
  );
}
