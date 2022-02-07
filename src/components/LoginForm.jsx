import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function LoginForm() {
  // ESTADOS ---------------------------------------------------------------------------------------
  const { userMail,
    setUserMail,
    userPassword,
    setUserPassword,
  } = useContext(Context);

  // CONSTANTES ------------------------------------------------------------------------------------
  const minNumOfCaracs = 6;
  const history = useHistory();

  // FUNÇÕES ---------------------------------------------------------------------------------------
  const mailValidator = (email) => { // REF: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validateMailRegex = /\S+@\S+\.\S+/;
    return validateMailRegex.test(email);
  };

  const signIn = () => {
    const LsUserMail = { email: userMail };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(LsUserMail));
    history.push('/foods');
  };

  // -------------------------------------------------
  return (
    <form>
      <div className="email">
        <label htmlFor="email-input">
          E-mail
          <input
            data-testid="email-input"
            type="email"
            name="userMail"
            onChange={ ({ target }) => setUserMail(target.value) }
            value={ userMail }
            id="email-input"
          />
        </label>
      </div>
      <div className="senha">
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="userPassword"
            onChange={ ({ target }) => setUserPassword(target.value) }
            value={ userPassword }
            id="password-input"
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          id="loginBtn"
          disabled={
            !(mailValidator(userMail) && (userPassword.length > minNumOfCaracs))
          }
          onClick={ signIn }
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
