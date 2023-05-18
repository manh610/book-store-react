import './style.css'
import { NavLink } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
            <NavLink className="navbar-brand" to="/" exact>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
              </svg>
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link" to="/about">ABOUT US</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/contact">CONTACT US</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/admin">ADMIN</NavLink>
                </li>
            </ul>
            <div className='form'>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" id='searchkey' placeholder="Search" aria-label="Search"/>
                    <button className="btn" onSubmit={e=>{e.preventDefault();}}  type="submit">Search</button>
                </form>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;