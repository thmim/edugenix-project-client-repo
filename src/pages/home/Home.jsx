import React from 'react';
import Banner from './banner/Banner';
import Colaborators from './colaborators';
import InspireTeacher from './Inspire-teacher/InspireTeacher';
import HowItWorks from './HowItWorks';
import FeedBack from './reviews/FeedBack';
import PopularClasses from './highlightclass/PopularClasses';
import HomePageStats from './stats/HomePageStats';
import Mission from './Mission';
import FAQ from './faq';
import WhyChooseUs from './whyChooseUs';

const Home = () => {
    return (
        <div className='bg-background'>
            <Banner></Banner>
            <Colaborators></Colaborators>
            <PopularClasses></PopularClasses>
            <HowItWorks></HowItWorks>
            <HomePageStats></HomePageStats>
            <InspireTeacher></InspireTeacher>
            <FeedBack></FeedBack>
            <WhyChooseUs></WhyChooseUs>
            <Mission></Mission>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;