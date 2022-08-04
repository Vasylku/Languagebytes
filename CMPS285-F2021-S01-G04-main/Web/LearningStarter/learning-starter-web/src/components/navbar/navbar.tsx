import React, {useState} from "react";
import {Link} from "react-router-dom";
import { LogoutButton } from "../../authentication/logout_btn";
import './navbar.css';


export const  Navbar =()=> {

    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);
    const handleClick = () => setClick(!click);
    
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
                        languagebytes
                        <i className="fas fa-book-open" />
                    </Link>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/resource" className="nav-links" onClick={closeMobileMenu}>
                                Resources
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-links" onClick={closeMobileMenu}>
                                My Account
                            </Link>
                        </li>
                        <li className="nav-item"  >
                            <div className="nav-links" onClick={closeMobileMenu}>
                                     <LogoutButton/>
                            </div> 
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    );
}


