import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/navbar/Navbar';
import Footer from '../pages/shared/footer/Footer';

const MainLayout = () => {
    return (
        <div className='bg-background'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;