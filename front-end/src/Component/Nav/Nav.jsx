import React from 'react'
import "./Nav.css"
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div className='nav'>
      <div className="logo"><p>IG</p></div>
      <div className="login">
        {localStorage.getItem('token')?<p className='nav_login' onClick={()=>{localStorage.removeItem('token');window.location('/login').window.location.reload()}}>Log out</p>:<Link to={'/login'}><p className='nav_login'>Login</p>
        </Link>}
        
      </div>
    </div>
  )
}

export default Nav
