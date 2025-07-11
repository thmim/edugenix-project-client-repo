import React from 'react';
import Logo from '../logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const {user,logout} = useAuth();
    
  const handleLogout = () =>{
        logout()
        .then(()=>{
            
        })
        .catch(error=>{
            console.log(error)
        })
  }

    const navlinks = <>
    <li className='font-bold'><NavLink to="/">Home</NavLink></li>
    <li className='font-bold'><NavLink to="/allClasses">All Classes</NavLink></li>
    <li className='font-bold'><NavLink to="/teach">Teach on EduGenix</NavLink></li>
    </>
    return (
        <div className="navbar shadow-sm border-b border-gray-500 bg-cyan-100/70">
  <div className="navbar-start py-3">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navlinks}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl ml-16"><Logo></Logo></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navlinks}
    </ul>
  </div>
  <div className="navbar-end mr-16">
    
    {
      user? <button onClick={handleLogout} className='btn'>LogOut</button>:<Link to="/login" className="btn">SignIn</Link>
    }
  </div>
</div>
    );
};

export default Navbar;