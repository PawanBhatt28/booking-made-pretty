import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OwnerLogin = () => {
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Login Logic
        if (phone.length >= 10) {
            alert('Welcome back, Owner! 👋');
            navigate('/admin'); // Redirect to Admin Dashboard
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    return (
        <div className="container" style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="card" style={{ padding: 'var(--spacing-xl)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>Partner Login 🤝</h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                    Manage your restaurant reservations
                </p>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label className="input-label" style={{ textAlign: 'left' }}>Phone Number</label>
                        <input
                            type="tel"
                            className="input-field"
                            placeholder="Enter your registered phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}>
                        Login with Phone
                    </button>

                    <div style={{ position: 'relative', margin: 'var(--spacing-lg) 0' }}>
                        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />
                        <span style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'var(--color-surface)',
                            padding: '0 10px',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.85rem'
                        }}>OR</span>
                    </div>

                    <button type="button" className="btn btn-outline" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px' }} />
                        Continue with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OwnerLogin;
