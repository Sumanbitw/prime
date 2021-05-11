import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaPlayCircle } from "react-icons/fa"
import { FaTimes, FaBars } from "react-icons/fa"
import "./navbar.css"

function Navbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)
  
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    return (
        <div>
        <nav className="navbar">
         <div className="navbar__container container">
           <Link to="/" className="navbar__logo" 
           onClick={closeMobileMenu}
           >
           <FaPlayCircle className="navbar__icon"
           />
            Prime
            </Link>
            <div className="menu__icon" 
            onClick={handleClick}
            >
              {click ? <FaTimes/> : <FaBars/>}
            </div>

            <ul 
            className={click ? 
            'nav__menu active' : 
            'nav__menu'}>
                <li 
                className="nav__item">
                <Link to="/home" 
                  className="nav__links"
                  onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                
                <li className="nav__item">
                  <Link to="/playlist" 
                  className="nav__links"
                  onClick={closeMobileMenu}
                  >
                  Playlist
                  </Link>
                </li>
                
                <li className="nav__item">
                  <Link to="/login"
                  className="nav__links"
                  onClick={closeMobileMenu}>
                  Login
                  </Link>
                </li>
                
                <li className="nav__item">
                  <Link to="/" 
                  className="nav__links"
                  onClick={closeMobileMenu}>
                    <button>Join now</button>
                  </Link>
                </li>
            </ul>  
         </div>
       </nav>
        </div>
    )
}

export default Navbar
