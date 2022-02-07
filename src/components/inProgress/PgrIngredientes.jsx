import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Context from '../../context/Context';

export default function PgrIngredientes() {
  const { ingredients,
    measure,
    startMealRecipe,
    startDrinkRecipe,
    inProgressRecipes,
  } = useContext(Context);
  const location = useLocation();
  const currentPathName = location.pathname;
  const { idReceita } = useParams();

  const checkboxMealsChange = ({ target }) => {
    const { checked, name } = target;
    let ingredientsRisked = [...inProgressRecipes.meals[idReceita]]
      .filter((ingredient) => ingredient !== name);

    if (checked) {
      ingredientsRisked = [...ingredientsRisked, name];
    }
    startMealRecipe(idReceita, ingredientsRisked);
  };

  const checkboxDrinksChange = ({ target }) => {
    const { checked, name } = target;
    let ingredientsRisked = [...inProgressRecipes.cocktails[idReceita]]
      .filter((ingredient) => ingredient !== name);

    if (checked) {
      ingredientsRisked = [...ingredientsRisked, name];
    }
    startDrinkRecipe(idReceita, ingredientsRisked);
  };

  const handleChecked = (name) => {
    if (currentPathName.includes('food')) {
      return inProgressRecipes.meals[idReceita]
        ?.find((ingredient) => name === ingredient);
    }
    return inProgressRecipes.cocktails[idReceita]
      ?.find((ingredient) => name === ingredient);
  };

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <h4>Ingredientes</h4>
      { ingredients.map((ingredient, idx) => (
        <label
          key={ idx }
          htmlFor={ `${idx}-ingredient-step` }
          data-testid={ `${idx}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ `${idx}-ingredient-step` }
            name={ ingredient }
            onChange={ (currentPathName.includes('food'))
              ? checkboxMealsChange : checkboxDrinksChange }
            checked={ handleChecked(ingredient) }
          />
          <div
            className={ (handleChecked(ingredient)) ? 'riskedOn' : 'riskedOff' }
          >
            { ` - ${ingredient} - ${measure[idx]}` }
          </div>
        </label>
      )) }
    </div>
  );
}
