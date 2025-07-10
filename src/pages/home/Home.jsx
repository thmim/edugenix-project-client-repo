import React from 'react';
import Banner from './banner/Banner';
import Colaborators from './colaborators';
import InspireTeacher from './Inspire-teacher/InspireTeacher';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Colaborators></Colaborators>
            <InspireTeacher></InspireTeacher>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;