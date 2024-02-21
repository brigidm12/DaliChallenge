
import React from 'react';
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherMainPage from './pages/WeatherMainPage';
import WeatherDisplayPage from './pages/WeatherDisplayPage';
import WeatherSearchPage from './pages/WeatherSearchPage';



import AppRoutes from './pages/AppRoutes';

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
      {/* WeatherMainPage */}
           <Route exact path="/main" element={<WeatherMainPage />} />WeatherMainPage
           <Route path="/display" component={<WeatherDisplayPage />} />
           <Route path="/search" component={<WeatherSearchPage />} />
           {/* Routes component still handles nested weather routes */}
           <Route path="/routes" component={Routes} />
           {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;







