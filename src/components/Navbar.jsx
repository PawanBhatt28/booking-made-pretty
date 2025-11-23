import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onAdminClick, onLogoClick, restaurantName }) => {
    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo" onClick={onLogoClick}>
                    🍽️ TableFlow
                </Link>

                {restaurantName && (
                    <div style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                        <span style={{ color: 'var(--color-accent)' }}>•</span> {restaurantName}
                    </div>
                )}

                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/admin" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                        For Restaurants
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
