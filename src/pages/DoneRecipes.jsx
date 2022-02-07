import React, { useContext } from 'react';
import DrDrinkCard from '../components/doneRecipes/DrDrinkCard';
import DrFilter from '../components/doneRecipes/DrFilter';
import DrFoodCard from '../components/doneRecipes/DrFoodCard';
import Header from '../components/header/Header';
import Context from '../context/Context';

export default function DoneRecipes() {
  const { doneRecipes,
    inProgressRecipes,
  } = useContext(Context);
  const [selectFilter, setSelectFilter] = React.useState('All');
  const [doneRecipesArray, setDoneRecipesArray] = React.useState(doneRecipes);

  const isThereSomeMealRecipe = doneRecipesArray.some(({ type }) => type === 'food');
  const isThereSomeDrinkRecipe = doneRecipesArray.some(({ type }) => type === 'drink');

  React.useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [doneRecipesArray]);

  // FILTROS ---------------------------------------------------------------------------------------
  const onSelectFilter = () => {
    if (selectFilter === 'All') {
      setDoneRecipesArray(doneRecipes);
    }
    if (selectFilter === 'Food') {
      setDoneRecipesArray(doneRecipes
        .filter(({ type }) => type === 'food'));
    }
    if (selectFilter === 'Drinks') {
      setDoneRecipesArray(doneRecipes
        .filter(({ type }) => type === 'drink'));
    }
  };

  React.useEffect(() => {
    onSelectFilter();
  }, [selectFilter]);

  return (
    <div>
      <Header />
      <DrFilter
        setSelectFilter={ setSelectFilter }
      />
      {isThereSomeMealRecipe
        && <DrFoodCard
          doneRecipesArray={ doneRecipesArray }
        />}
      {isThereSomeDrinkRecipe
        && <DrDrinkCard
          doneRecipesArray={ doneRecipesArray }
        />}
    </div>
  );
}
