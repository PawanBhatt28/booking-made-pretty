import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Hero from './components/Hero';
import BookingWidget from './components/BookingWidget';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleAdminClick = () => {
    setShowAdmin(!showAdmin);
    setSelectedRestaurant(null); // Reset restaurant view when going to admin
  };

  const handleLogoClick = () => {
    setShowAdmin(false);
    setSelectedRestaurant(null); // Go back to Home
  };

  return (
    <div className="app-container">
      <Navbar
        onAdminClick={handleAdminClick}
        onLogoClick={handleLogoClick}
        restaurantName={selectedRestaurant?.name}
      />
      <main>
        {showAdmin ? (
          <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
            <AdminDashboard />
          </div>
        ) : selectedRestaurant ? (
          <>
            <Hero restaurant={selectedRestaurant} />
            <section id="reservation" className="reservation-section">
              <div className="container">
                <BookingWidget restaurant={selectedRestaurant} />
              </div>
            </section>
          </>
        ) : (
          <Home onSelectRestaurant={setSelectedRestaurant} />
        )}
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
