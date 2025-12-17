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
            </Route>
          </Routes>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
