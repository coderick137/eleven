import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShareIcon from '../../images/shareIcon.svg';

export default function ShareBtn() {
  const [isMessageHidden, setIsMessageHidden] = useState(true);

  const location = useLocation();
  const currentPathName = location.pathname;
  const filterCurrent = currentPathName.replace('/in-progress', '');

  const onClickShareBtn = () => {
    const TEN_SECONDS = 10000;
    const pathName = `http://localhost:3000${filterCurrent}`;

    navigator.clipboard.writeText(pathName); // REF: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    setIsMessageHidden(false);
    setTimeout(() => setIsMessageHidden(true), TEN_SECONDS);
  };

  return (
    <div>
      <div
        className="shareBtnContainer"
        id={ currentPathName }
        onClick={ () => onClickShareBtn() }
        onKeyDown={ () => onClickShareBtn() }
        role="button"
        tabIndex={ 0 }
      >
        <img
          id={ currentPathName }
          data-testid="share-btn"
          src={ ShareIcon }
          alt="Compartilhar"
        />
        <h4 hidden={ isMessageHidden }>Link copied!</h4>
      </div>
    </div>
  );
}
