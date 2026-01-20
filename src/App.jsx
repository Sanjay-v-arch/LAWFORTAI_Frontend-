import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import LawLibrary from './pages/LawLibrary';
import Profile from './pages/Profile';
import About from './pages/About';
import Auth from './pages/Auth';
import CyberPortal from './pages/CyberPortal';
import EmergencySupport from './pages/cyber-portal/EmergencySupport';
import RecoveryGuide from './pages/cyber-portal/RecoveryGuide';
import CyberAwareness from './pages/cyber-portal/CyberAwareness';

import ProtectedRoute from './components/auth/ProtectedRoute';
import InvestigationRecords from './pages/lawyer/InvestigationRecords';
import CaseNotebook from './pages/lawyer/CaseNotebook';
import InvestigationTimeline from './pages/lawyer/InvestigationTimeline';
import DigitalEvidenceVault from './pages/lawyer/DigitalEvidenceVault';
import LegalPrepTools from './pages/lawyer/LegalPrepTools';
import CaseRoadmap from './pages/lawyer/CaseRoadmap';
import ClientManager from './pages/lawyer/ClientManager';
import CyberLawIntelligence from './pages/lawyer/CyberLawIntelligence';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="laws" element={<LawLibrary />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Auth />} />
              <Route path="signup" element={<Auth />} />
              <Route path="cyber-portal" element={<CyberPortal />} />
              <Route path="cyber-portal/emergency-support" element={<EmergencySupport />} />
              <Route path="cyber-portal/recovery-guide" element={<RecoveryGuide />} />
              <Route path="cyber-portal/cyber-awareness" element={<CyberAwareness />} />

              {/* Lawyer Protected Routes */}
              <Route path="lawyer/investigation-records" element={<ProtectedRoute allowedRoles={['lawyer']}><InvestigationRecords /></ProtectedRoute>} />
              <Route path="lawyer/case-notebook" element={<ProtectedRoute allowedRoles={['lawyer']}><CaseNotebook /></ProtectedRoute>} />
              <Route path="lawyer/timeline" element={<ProtectedRoute allowedRoles={['lawyer']}><InvestigationTimeline /></ProtectedRoute>} />
              <Route path="lawyer/evidence-vault" element={<ProtectedRoute allowedRoles={['lawyer']}><DigitalEvidenceVault /></ProtectedRoute>} />
              <Route path="lawyer/legal-prep" element={<ProtectedRoute allowedRoles={['lawyer']}><LegalPrepTools /></ProtectedRoute>} />
              <Route path="lawyer/case-roadmap" element={<ProtectedRoute allowedRoles={['lawyer']}><CaseRoadmap /></ProtectedRoute>} />
              <Route path="lawyer/client-manager" element={<ProtectedRoute allowedRoles={['lawyer']}><ClientManager /></ProtectedRoute>} />
              <Route path="lawyer/cyber-law-intel" element={<ProtectedRoute allowedRoles={['lawyer']}><CyberLawIntelligence /></ProtectedRoute>} />
            </Route>
          </Routes>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
