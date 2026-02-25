import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembershipPage from './pages/MembershipPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/membership" element={<MembershipPage />} />
      </Routes>
    </BrowserRouter>
  );
}
