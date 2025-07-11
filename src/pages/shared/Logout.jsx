import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';

const Logout = () => {
    const {user,logout} = useAuth();
        
      const handleLogout = () =>{
            logout()
            .then(()=>{
                
            })
            .catch(error=>{
                console.log(error)
            })
      }
    return (
        <div className="dropdown dropdown-end">
  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost btn-circle hover:scale-105 transition-transform duration-200"
  >
    <div className="w-10 sm:w-10 md:w-11 lg:w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      <img
        src={user?.photoURL}
        alt=""
        className="object-cover w-full h-full rounded-full"
      />
    </div>
  </div>

  <ul
    tabIndex={0}
    className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content bg-white text-gray-800 rounded-xl border border-gray-200 w-52 sm:w-56 md:w-60 lg:w-64"
  >
    <li className="mb-2">
      <div className="flex flex-col">
        <span className="font-semibold text-2xl truncate">
          {user?.displayName || 'No Name'}
        </span>
              </div>
    </li>
    <div className="divider my-1" />
    <Link to="/dashboard">Dashboard</Link>
    <div className="divider my-1" />
    <li>
      <button
        onClick={handleLogout}
        className="text-red-500 font-medium hover:bg-red-100 rounded-md px-2 py-1 w-full text-left"
      >
        Log Out
      </button>
    </li>
  </ul>
</div>
)
};

export default Logout;