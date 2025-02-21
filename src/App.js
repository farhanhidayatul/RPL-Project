import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Loading from './pages/loading';
import Home from './pages/home';
import NF from './pages/notfound';
import GamePage from "./pages/gamePage";

const TRACKING_ID = "G-FLNMFT2FES"; // Your Google Analytics tracking ID
ReactGA.initialize(TRACKING_ID);

const App = () => {
  useEffect(() => {
    const sendPageView = () => {
      ReactGA.send({
        hitType: "pageview",
        page_location: window.location.href,
        page_title: document.title
      });
    };

    sendPageView(); // Initial page view

    // Listen for route changes
    const handleRouteChange = () => {
      sendPageView();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gamePage" element={<GamePage />} />
        <Route path="*" element={<NF />} />

      </Routes>
    </Router>
  );
}

export default App;
