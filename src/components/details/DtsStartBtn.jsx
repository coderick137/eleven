// import React from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useParams } from 'react-router-dom';

function FDDetailsStartBtn({
  setStartBtnStatus, startBtnStatus,
}) {
  // CONSTANTES ------------------------------------------------------------------------------------
  const location = useLocation();
  const currentPathName = location.pathname;
  const { idReceita } = useParams();
  const history = useHistory();
  const startRecipe = 'Start Recipe';
  const continueRecipe = 'Continue Recipe';

  // ==========================IN-PROGRESS-RECIPES-REDUX // START/CONTINUE-BTN=============
  const startRecipeClick = () => {
    if (currentPathName.includes('food')) {
      if (startBtnStatus === startRecipe) {
        setStartBtnStatus(continueRecipe);
      }
      history.push(`/foods/${idReceita}/in-progress`);
    }
    if (currentPathName.includes('drink')) {
      if (startBtnStatus === startRecipe) {
        setStartBtnStatus(continueRecipe);
      }
      history.push(`/drinks/${idReceita}/in-progress`);
    }
  };
  // =======================================================================

  return (
    <button
      onClick={ () => startRecipeClick() }
      className="startRecipeBtn"
      data-testid="start-recipe-btn"
      type="button"
    >
      {startBtnStatus}
    </button>
  );
}

FDDetailsStartBtn.propTypes = {
  startBtnStatus: PropTypes.string.isRequired,
  setStartBtnStatus: PropTypes.func.isRequired,
};

export default FDDetailsStartBtn;
