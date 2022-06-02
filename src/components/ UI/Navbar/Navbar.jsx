import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const logout = () => {
     setIsAuth(false);
     localStorage.removeItem('auth')
  }

  return ( 
    <div className="navbar">
        <h5 style={{color: 'white'}}>LOGO</h5>
        <Link  to="/about" className="link">О сайте</Link>
        <Link to="/posts" className="link">Посты</Link>

      <div className="navbar__button">
      <MyButton style={{ border: '1px solid white', color: 'white' }} onClick={logout}>Выйти</MyButton>
      </div>
    </div>
  )
}

export default Navbar;
