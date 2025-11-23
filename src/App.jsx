import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import BookingPage from './components/BookingPage';
import SuperAdmin from './components/SuperAdmin';
import OwnerLogin from './components/OwnerLogin';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="/partner-login" element={<OwnerLogin />} />
          <Route path="/admin" element={
            <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
              <AdminDashboard />
            </div>
          } />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 TableFlow Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
