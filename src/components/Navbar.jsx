import React from 'react';

const Navbar = ({ onAdminClick, onLogoClick, restaurantName }) => {
    return (
        <nav className="navbar animate-fade-in">
            <div className="container navbar-content">
                <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                    <span style={{ color: 'var(--color-primary)' }}>Table</span>
                    <span style={{ color: 'var(--color-secondary)' }}>Flow</span>
                </div>

                {restaurantName && (
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-text)' }}>
                        📍 {restaurantName}
                    </div>
                )}

                <div className="nav-links">
                    {!restaurantName && <span style={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>Discover</span>}
                    <button onClick={onAdminClick} className="nav-link btn-text" style={{ color: 'var(--color-text)', fontSize: '1rem' }}>
                        (Owner)
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
