import React from 'react';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <main className="section section__login" id="loginPageMain">
      <div className="login__container ">
        <LoginForm />
      </div>
    </main>
  );
}
