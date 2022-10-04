import { Link } from "react-router-dom";
import '../styles/navBar.css'
import { BsSearch, BsPersonCircle } from 'react-icons/bs';

export const NavBar = () =>{
    return(
        <div className="navbar__container">
            <ul className="navbar__links">
                <Link to='/home' className="navbar__item-logo">Logo</Link>
                <Link to='/login' className="navbar__item-btn-login-mobil"><BsPersonCircle />Login</Link>
                <div className="navbar__item-search-container">
                    <li className="navbar__item-search">
                        <input
                            className="navbar__item-search-input"
                            type='text'
                            name="search"
                            placeholder="Search"
                        />
                        </li>
                    <li className="navbar__item-btn-search"><BsSearch /></li>
                </div>
                {/* 
                crear dentro del login
                <Link to='/userCreate' className="navbar__item btn btn-create">creat</Link>
                */}
            
                <Link to='/login' className="navbar__item-btn-login"><BsPersonCircle />Login</Link>
            </ul>

        </div>
    )
}