import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { RiHome2Fill } from "react-icons/ri";
import {
  FaUserTie,
  FaUsers,
  FaChalkboardTeacher,
  FaUserCircle,

} from 'react-icons/fa';
const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open p-5">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-bold text-lg">Dashboard</div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

        <ul className="menu bg-gradient-to-b from-blue-200 via-white to-green-50 text-base-content min-h-full w-80 p-4 font-semibold space-y-2 shadow-lg">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'bg-blue-300 rounded-md' : ''}>
              <RiHome2Fill className="text-green-600 text-lg" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/teacher-requests" className={({ isActive }) => isActive ? 'bg-blue-300 rounded-md' : ''}>
              <FaUserTie className="text-green-600 text-lg" />
              Teacher Requests
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? 'bg-blue-300 rounded-md' : ''}>
              <FaUsers className="text-blue-600 text-lg" />
              Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/all-classes" className={({ isActive }) => isActive ? 'bg-blue-300 rounded-md' : ''}>
              <FaChalkboardTeacher className="text-purple-600 text-lg" />
              All Classes
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-class" className={({ isActive }) => isActive ? 'bg-green-200 rounded-md' : ''}>
              <FaChalkboardTeacher className="text-indigo-600 text-lg" />
              My Class
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/addClass" className={({ isActive }) => isActive ? 'bg-green-200 rounded-md' : ''}>
              <FaChalkboardTeacher className="text-teal-600 text-lg" />
              Add Class
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'bg-blue-300 rounded-md' : ''}>
              <FaUserCircle className="text-gray-600 text-lg" />
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;