import React from 'react';
import { FaUserGraduate } from "react-icons/fa6";
const Logo = () => {
    return (
        <div className='flex items-center gap-1'>
            <div className='text-blue-500'><FaUserGraduate size={45} /></div>
            <div className='text-3xl font-bold'>EduGenix</div>
        </div>
    );
};

export default Logo;