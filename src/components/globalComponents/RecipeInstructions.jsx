import React, { useContext } from 'react';
import Context from '../../context/Context';

export default function RecipeInstructions() {
  const { details } = useContext(Context);

  return (
    <div>
      <h4>Instructions</h4>
      <div>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </div>
    </div>
  );
}
