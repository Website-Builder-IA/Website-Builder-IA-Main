import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { WebsiteBuilder } from './pages/WebsiteBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<WebsiteBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;