import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Fetured from '../Featured/Featured';
import Featured from '../Featured/Featured';
import Testimonial from '../Testimonial/Testimonial';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
      <Helmet>
        <title>Restaurent | Home</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
          <Banner></Banner>
          <Category></Category>
          <PopularMenu></PopularMenu>
          <Featured></Featured>
          <Testimonial></Testimonial>
        </div>
    );
};

export default Home;