import React from 'react';
import Banner from './banner/Banner';
import Colaborators from './colaborators';
import InspireTeacher from './Inspire-teacher/InspireTeacher';
import HowItWorks from './HowItWorks';
import FeedBack from './reviews/FeedBack';
import PopularClasses from './highlightclass/PopularClasses';
import HomePageStats from './stats/HomePageStats';
import Mission from './Mission';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Colaborators></Colaborators>
            <InspireTeacher></InspireTeacher>
            <PopularClasses></PopularClasses>
            <HowItWorks></HowItWorks>
            <HomePageStats></HomePageStats>
            <FeedBack></FeedBack>
            <Mission></Mission>
        </div>
    );
};

export default Home;