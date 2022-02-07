/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import Logo from '../images/logo-eleven.png';

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
      <div className="login__inputs grid">
        <img src={ Logo } alt="" className="logo" />
        <div className="login__content">
          <label className="login__label" htmlFor="email-input">E-mail</label>
          <input
            className="login__input"
            type="email"
            name="userMail"
            onChange={ ({ target }) => setUserMail(target.value) }
            value={ userMail }
            id="email-input"
          />
        </div>
      </div>
      <div className="login__content">
        <label className="login__label" htmlFor="password-input">Senha</label>
        <input
          className="login__input"
          type="password"
          name="userPassword"
          onChange={ ({ target }) => setUserPassword(target.value) }
          value={ userPassword }
          id="password-input"
        />
      </div>
      <div className="button--login">
        <button
          className="button"
          type="submit"
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
