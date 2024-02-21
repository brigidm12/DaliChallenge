// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WeatherSearchPage from './WeatherSearchPage'; 
import WeatherDisplayPage from './WeatherDisplayPage';
import WeatherMainPage from './WeatherMainPage';


const AppRoutes = () => {
  return (
      <Route>
        <Route path="/" exact component={WeatherSearchPage} />
        <Route path="/weatherDisplay" component={WeatherDisplayPage} />
        <Route path="/weatherMain" component={WeatherMainPage} />
        <Route path="/weatherSearch" component={WeatherDisplayPage} />
      </Route>
  );
};

export default AppRoutes;
