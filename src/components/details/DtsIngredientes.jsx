import React, { useEffect, useContext, useState } from 'react';
import Context from '../../context/Context';

export default function DtsIngredientes() {
  const { details } = useContext(Context);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientsArray = Object.keys(details)
      .filter((key) => key.includes('strIngredient'))
      .filter((ingredient) => (
        details[ingredient] !== '') && (details[ingredient] !== null));
    setIngredients(ingredientsArray);
  }, [details]);

  return (
    <div>
      <h4>Ingredientes</h4>
      <div>
        { ingredients.map((ingredient, idx) => (
          <p key={ idx } data-testid={ `${idx}-ingredient-name-and-measure` }>
            { ` - ${details[ingredient]} - ${details[`strMeasure${idx + 1}`]}` }
          </p>
        )) }
      </div>
    </div>
  );
}
