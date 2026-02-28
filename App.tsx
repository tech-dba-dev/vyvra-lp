import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembershipPage from './pages/MembershipPage';
import SizeGuidePage from './pages/SizeGuidePage';
import TrackingPage from './pages/TrackingPage';

const COMMUNITY_SIGNUP_URL = "https://login.circle.so/sign_up?request_host=members.vyvra.com&user%5Binvitation_token%5D=00070f91c7fda583ad16aadc8119c47e9c4d03a9-af367d04-7cbe-44ac-93d4-26f11b59abca#email";

const hostname = window.location.hostname;
const isMembershipDomain = hostname === 'membership.vyvra.com';
const isJoinDomain = hostname === 'join.vyvra.com';
const isTrackingDomain = hostname === 'tracking.vyvra.com';

// Redirect join.vyvra.com directly to Circle signup
if (isJoinDomain) {
  window.location.href = COMMUNITY_SIGNUP_URL;
}

function SizeGuideProductRoute() {
  const { product } = useParams<{ product: string }>();
  return <SizeGuidePage product={product} />;
}

export default function App() {
  // If redirecting, show nothing while the browser navigates
  if (isJoinDomain) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isTrackingDomain ? (
          <>
            <Route path="/" element={<TrackingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : isMembershipDomain ? (
          <>
            <Route path="/" element={<MembershipPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/size-guide" element={<SizeGuidePage />} />
            <Route path="/size-guide/:product" element={<SizeGuideProductRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/size-guide" element={<SizeGuidePage />} />
            <Route path="/size-guide/:product" element={<SizeGuideProductRoute />} />
            <Route path="/tracking" element={<TrackingPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
