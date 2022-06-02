import React, { useContext } from "react";
import '../styles/App.css'
import fing from '../components/photos/2fing.png'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

const About = () => {
  const router = useNavigate();
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const redirect = () => {
    if(!isAuth) {
      router('/login')
    } else {
      router('/posts')
    }
  }

  return (
      <div className="about">
        <div className="about__left">
          <h1 className="about__title">
            Отличное место, чтобы рассказать о своей жизни!
          </h1>
          <p className="about__p">
            Найди новых друзей.
          </p>
          <button onClick={redirect} className="about__button">Начать</button>
        </div>
        <div className="about__right">
          <img src={fing} style={{width: '500px', height: '500px'}}></img>
        </div>
      </div>
  )
}

export default About;
 