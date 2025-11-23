import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loadingRestaurant, setLoadingRestaurant] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '7:00 PM',
        guests: 2,
        specialRequest: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/restaurants/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRestaurant(data);
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            } finally {
                setLoadingRestaurant(false);
            }
        };
        fetchRestaurant();
    }, [id]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData((prev) => ({ ...prev, date: today }));
    }, []);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const incrementGuests = () => {
        if (formData.guests < 20) handleChange('guests', formData.guests + 1);
    };

    const decrementGuests = () => {
        if (formData.guests > 1) handleChange('guests', formData.guests - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
            };
            const response = await fetch('http://localhost:8081/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert(`Table booked at ${restaurant.name}! 🎉`);
                navigate('/');
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loadingRestaurant) {
        return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    }

    if (!restaurant) {
        return <div className="container" style={{ padding: '2rem' }}>Restaurant not found</div>;
    }

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '800px' }}>
            {/* Restaurant Header */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        height: '250px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        marginBottom: '1rem'
                    }}
                />
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{restaurant.name}</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                    {restaurant.cuisine} • {restaurant.location} • ⭐ {restaurant.rating}
                </p>
            </div>

            {/* Booking Form */}
            <div className="card" style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Reserve Your Table</h2>
                <form onSubmit={handleSubmit}>
                    {/* Date & Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div className="input-group">
                            <label className="input-label">Date</label>
                            <input
                                type="date"
                                name="date"
                                className="input-field"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Time</label>
                            <select name="time" className="input-field" value={formData.time} onChange={handleInputChange}>
                                {['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Guests with Plus/Minus */}
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label">Number of Guests</label>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem',
                            border: '2px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--color-surface)'
                        }}>
                            <button
                                type="button"
                                onClick={decrementGuests}
                                disabled={formData.guests <= 1}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: formData.guests <= 1 ? '#E5E7EB' : 'var(--color-primary)',
                                    color: formData.guests <= 1 ? '#9CA3AF' : 'var(--color-text)',
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    cursor: formData.guests <= 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                −
                            </button>
                            <div style={{ flex: 1, textAlign: 'center', fontSize: '1.5rem', fontWeight: '600' }}>
                                {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                            </div>
                            <button
                                type="button"
                                onClick={incrementGuests}
                                disabled={formData.guests >= 20}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: formData.guests >= 20 ? '#E5E7EB' : 'var(--color-primary)',
                                    color: formData.guests >= 20 ? '#9CA3AF' : 'var(--color-text)',
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    cursor: formData.guests >= 20 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div className="input-group">
                            <label className="input-label">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                className="input-field"
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Special Request */}
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label">Special Requests (Optional)</label>
                        <textarea
                            name="specialRequest"
                            className="input-field"
                            placeholder="Dietary restrictions, allergies, special occasion..."
                            value={formData.specialRequest}
                            onChange={handleInputChange}
                            rows="3"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', fontSize: '1.1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Booking...' : 'Confirm Reservation'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
