import React from 'react';

const Confirmation = ({ onReset }) => {
    return (
        <div className="card animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', backgroundColor: '#E0F2F1' /* Light teal */ }}>
            <div style={{
                fontSize: '4rem',
                marginBottom: 'var(--spacing-sm)'
            }}>
                🥳
            </div>

            <h2 style={{ color: 'var(--color-success)', marginBottom: 'var(--spacing-sm)', transform: 'rotate(2deg)' }}>Yay! Booked!</h2>
            <p style={{ color: 'var(--color-text)', marginBottom: 'var(--spacing-lg)', fontSize: '1.3rem' }}>
                We saved a spot for you. See you soon!
            </p>

            <button className="btn btn-primary" onClick={onReset}>
                Book Another?
            </button>
        </div>
    );
};

export default Confirmation;
