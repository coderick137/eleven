import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../../images/shareIcon.svg';

export default function DrShareBtn({ currentPathName,
  recipeId, index }) {
  const [isMessageHidden, setIsMessageHidden] = useState(true);

  const onClickShareBtn = ({ target }) => {
    const TEN_SECONDS = 10000;
    navigator.clipboard.writeText(`http://localhost:3000/foods/${target.id}`); // REF: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    setIsMessageHidden(false);
    setTimeout(() => setIsMessageHidden(true), TEN_SECONDS);
  };

  return (
    <div>
      <div
        className="shareBtnContainer"
        id={ currentPathName }
        onClick={ (ev) => onClickShareBtn(ev) }
        onKeyDown={ (ev) => onClickShareBtn(ev) }
        role="button"
        tabIndex={ 0 }
      >
        <img
          id={ recipeId }
          data-testid={ `${index}-horizontal-share-btn` }
          src={ ShareIcon }
          alt="Compartilhar"
        />
        <h4 hidden={ isMessageHidden }>Link copied!</h4>
      </div>
    </div>
  );
}

DrShareBtn.propTypes = {
  currentPathName: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
