// import React from 'react';
// import { FaUserGraduate } from "react-icons/fa6";
// const Logo = () => {
//     return (
//         <div className='flex items-center gap-1'>
//             <div className='text-blue-500'><FaUserGraduate size={45} /></div>
//             <div className='text-3xl font-bold'>EduGenix</div>
//         </div>
//     );
// };

// export default Logo;

// components/AdvancedLogo.jsx
// components/Logo.jsx
import React from 'react';

const Logo = ({ dark = false }) => {
  return (
    <div className="flex items-center gap-2 group">
      {/* Simple Book Icon */}
      <div className="relative">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M4 4C4 3.44772 4.44772 3 5 3H15C15.5523 3 16 3.44772 16 4V16C16 16.5523 15.5523 17 15 17H5C4.44772 17 4 16.5523 4 16V4Z" 
              fill="white" 
              fillOpacity="0.9"
            />
            <rect x="7" y="7" width="6" height="1.5" rx="0.75" fill="white" />
            <rect x="7" y="10" width="4" height="1.5" rx="0.75" fill="white" fillOpacity="0.8" />
            <rect x="7" y="13" width="5" height="1.5" rx="0.75" fill="white" fillOpacity="0.6" />
          </svg>
        </div>
        {/* Small accent dot */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Text */}
      <div className="flex items-baseline">
        <span className={`text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
          Edu
        </span>
        <span className={`text-xl font-light ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          Genix
        </span>
      </div>
    </div>
  );
};

export default Logo;