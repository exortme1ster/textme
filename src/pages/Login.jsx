import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/ UI/button/MyButton'
import MyInput from '../components/ UI/input/MyInput'
import { AuthContext } from "../context";
import '../styles/App.css'

const Login = () => {
  const router = useNavigate();
  const {isAuth, setIsAuth} = useContext(AuthContext)
  const login = (event) => {
     event.preventDefault();
     setIsAuth(true);
     localStorage.setItem('auth', 'true')
     router(`/posts`)
  }
  return (
    <div className="loginPage">
      <h1 className="loginPage__h1">Войдите в аккаунт 🤟🏻</h1>
      <form onSubmit={login} className="login__form">
        <div>
          <MyInput type="text" placeholder="Введите логин" />
          <MyInput type="password" placeholder="Введите пароль" />
        </div>
        <MyButton>Войти</MyButton>
      </form>
    </div>
  )
}

export default Login
