import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembershipPage from './pages/MembershipPage';

const isMembershipDomain = window.location.hostname === 'membership.vyvra.com';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {isMembershipDomain ? (
          <>
            <Route path="/" element={<MembershipPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/membership" element={<MembershipPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
