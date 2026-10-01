// import React from 'react';

// import { Link, NavLink } from 'react-router';
// import useAuth from '../../../hooks/useAuth';
// import Logout from '../Logout';
// import Logo from '../logo/Logo';

// const Navbar = () => {
//   const {user} = useAuth();
    
//     const navlinks = <>
//     <li className='font-bold hover:bg-green-300 rounded'><NavLink to="/">Home</NavLink></li>
//     <li className='font-bold hover:bg-green-300 rounded'><NavLink to="/allPaidClasses">All Classes</NavLink></li>
//     <li className='font-bold hover:bg-green-300 rounded'><NavLink to="/teacherApply">Teach on EduGenix</NavLink></li>
//     <li className='font-bold hover:bg-green-300 rounded'><NavLink to="/contact">Contact Us</NavLink></li>
//     </>
//     return (
//         <div className="navbar bg-green-50 sticky top-0 z-50">
//   <div className="navbar-start py-3">
//     <div className="dropdown">
//       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         {navlinks}
//       </ul>
//     </div>

//     <Logo/>
//     {/* <span className="hidden lg:block text-xl ml-16">
//       <Logo></Logo>
//       <img 
//       className='border w-20 h-20 font-bold'
//       src={Logo} alt="logo" />
//       </span> */}
//   </div>
//   <div className="navbar-center hidden lg:flex">
//     <ul className="menu menu-horizontal px-1">
//       {navlinks}
//     </ul>
//   </div>
//   <div className="navbar-end mr-16">
    
//     {
//       user? <Logout></Logout>:<Link to="/login" className="btn">SignIn</Link>
//     }
//   </div>
// </div>
//     );
// };

// export default Navbar;

import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Logout from '../Logout';

const Navbar = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  // UI only: adds a stronger shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
        : 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50'
    }`;

  const navlinks = (
    <>
      <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
      <li><NavLink to="/allPaidClasses" className={linkClass}>All Classes</NavLink></li>
      <li><NavLink to="/teacherApply" className={linkClass}>Teach on EduGenix</NavLink></li>
      <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 lg:px-6">
      <div
        className={`navbar mx-auto max-w-7xl rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl px-3 transition-all duration-300 ${
          scrolled ? 'shadow-xl shadow-emerald-900/10' : 'shadow-md shadow-emerald-900/5'
        }`}
      >
        {/* mobile menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 w-56 gap-1 rounded-2xl border border-emerald-100 bg-white p-3 shadow-2xl z-50"
            >
              {navlinks}
            </ul>
          </div>

          <Link to="/" className="group flex items-center gap-2.5 pl-1">
          {/* logo */}
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.42A12 12 0 0112 20.5 12 12 0 015.84 10.58L12 14z" />
              </svg>
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">
              Edu<span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Genix</span>
            </span>
          </Link>
        </div>

        {/* desktop*/}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-1 rounded-full bg-slate-100/70 p-1">
            {navlinks}
          </ul>
        </div>

        {/* Right: auth */}
        <div className="navbar-end">
          {user ? (
            <Logout />
          ) : (
            <Link
              to="/login"
              className="btn rounded-full border-0 bg-gradient-to-r from-emerald-500 to-teal-500 px-6 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;