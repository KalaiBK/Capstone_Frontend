import React, { useContext, useState } from 'react'
import '../CSS/NavBar.css'
import { Link } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav className="bg-navbar">
      <div className='d-flex'>
        <div className='w-25'>
          <a className="navbar-brand" href="#">Wardrob CRM</a>
        </div>
        {props.screen ?
          <></>
          :
          <div className='d-flex justify-content-end align-items-center w-75'>
            <Link to="/Dashboard" className={props.name == "dashboard" ? "nav-link active px-2" : "nav-link px-2"} aria-current="page" href="#">Dashboard</Link>
            <Link to="/Sales" className={props.name == "sales" ? "nav-link active px-2" : "nav-link px-2"} href="#">Sales</Link>
            <Link to="/AddCustomer" className={props.name == "addcustomer" ? "nav-link active px-2" : "nav-link px-2"} href="#">Add Customer</Link>
            <li className="nav-item dropdown d-flex justify-content-center align-items-center">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {localStorage.getItem("name")}&nbsp;
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/Profile" className="dropdown-item" href="#">Edit Profile</Link></li>
                <li><Link to="/ChangePassword" className="dropdown-item" href="#">Change Password</Link></li>
                <hr className="my -1border-dark"></hr>
                <li><Link to="/Logout" className="dropdown-item" href="#">Logout</Link></li>
              </ul>
            </li>
          </div>
        }
      </div>
    </nav>

  )
}

export default NavBar