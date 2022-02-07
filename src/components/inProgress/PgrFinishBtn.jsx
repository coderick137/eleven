import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Context from '../../context/Context';

export default function PgrFinishBtn() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const { details,
    doneRecipes,
    addDoneRecipeDrink,
    addDoneRecipeMeal,
  } = useContext(Context);

  // CONSTANTES ------------------------------------------------------------------------------------
  const location = useLocation();
  const currentPathName = location.pathname;
  const { idReceita } = useParams();
  const history = useHistory();
  const { inProgressRecipes, ingredients } = useContext(Context);
  const [buttonState, setButtonState] = useState(true);

  // DATA-CONCLUSÃO-RECEITA ------------------------------------------------------------------------
  const getDateOfConclusion = () => {
    const completeDate = new Date(); // Thu Dec 09 2021 08:22:25 GMT-0300 (Horário Padrão de Brasília).
    const day = String(completeDate.getDate()).padStart(2, '0'); // Caso seja dia 1 à 9, um 0 será adicionado. Resultado: 01, 02, 03....
    const month = String(completeDate.getMonth() + 1).padStart(2, '0'); // Caso seja mês 1 à 9, um 0 será adicionado. Resultado: 01, 02, 03....
    const year = completeDate.getFullYear(); // 2021
    return `${day}/${month}/${year}`;
  };

  // DONE-RECIPES ----------------------------------------------------------------------------------
  const concludeRecipeClick = () => {
    if (currentPathName.includes('food')) {
      const concludedMealObj = {
        id: idReceita,
        type: 'food',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
        doneDate: getDateOfConclusion(),
        tags: details.strTags.split(','),
      };

      addDoneRecipeMeal(concludedMealObj, idReceita);
      history.push('/done-recipes');
    }
    if (currentPathName.includes('drink')) {
      const concludedDrinkObj = {
        id: idReceita,
        type: 'drink',
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb,
        doneDate: getDateOfConclusion(),
        tags: [],
      };

      addDoneRecipeDrink(concludedDrinkObj, idReceita);
      history.push('/done-recipes');
    }
  };

  const countIngredients = (risked, igrd) => (risked?.length === igrd?.length);

  useEffect(() => {
    if (currentPathName.includes('food')) {
      setButtonState(!countIngredients(inProgressRecipes.meals[idReceita], ingredients));
    }
    if (currentPathName.includes('drinks')) {
      setButtonState(!countIngredients(inProgressRecipes
        .cocktails[idReceita], ingredients));
    }
  }, [inProgressRecipes]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, [doneRecipes]);

  // -----------------------------------------------------------------------------------------------
  return (
    <button
      onClick={ () => concludeRecipeClick() }
      className="startRecipeBtn"
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ buttonState }
    >
      Finish Recipe
    </button>
  );
}
