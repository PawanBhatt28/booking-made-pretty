import React, { useState } from 'react';
import { addReservation } from '../utils/storage';

const BookingForm = ({ onBookingSuccess, restaurantName }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequest: '',
    });
    const [loading, setLoading] = useState(false);

    // Quick Select Options
    const timeSlots = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'];
    const guestOptions = [1, 2, 3, 4, 5, 6];

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.date || !formData.time) {
            alert("Please pick a day and time!");
            return;
        }
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 800)); // Remove fake delay
        await addReservation(formData);
        setLoading(false);
        onBookingSuccess();
    };

    return (
        <div className="card animate-fade-in" style={{ backgroundColor: '#FFF9C4', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)', transform: 'rotate(-2deg)', fontSize: '1.8rem' }}>
                {restaurantName ? `Book at ${restaurantName}!` : 'Reserve a Table! ✏️'}
            </h2>
            <form onSubmit={handleSubmit}>

                {/* 1. When? (Pill Select) */}
                <div className="input-group">
                    <label className="input-label">When?</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            className="btn"
                            style={{
                                flex: 1,
                                backgroundColor: formData.date === getTodayDate() ? 'var(--color-secondary)' : 'white',
                                color: formData.date === getTodayDate() ? 'white' : 'var(--color-text)',
                                fontSize: '1rem',
                                padding: '0.5rem'
                            }}
                            onClick={() => handleChange('date', getTodayDate())}
                        >
                            Today
                        </button>
                        <button
                            type="button"
                            className="btn"
                            style={{
                                flex: 1,
                                backgroundColor: formData.date === getTomorrowDate() ? 'var(--color-secondary)' : 'white',
                                color: formData.date === getTomorrowDate() ? 'white' : 'var(--color-text)',
                                fontSize: '1rem',
                                padding: '0.5rem'
                            }}
                            onClick={() => handleChange('date', getTomorrowDate())}
                        >
                            Tomorrow
                        </button>
                    </div>
                    <input
                        type="date"
                        name="date"
                        className="input-field"
                        style={{ marginTop: '10px', display: formData.date && formData.date !== getTodayDate() && formData.date !== getTomorrowDate() ? 'block' : 'none' }}
                        onChange={handleInputChange}
                        value={formData.date}
                    />
                </div>

                {/* 2. What Time? (iOS Style Wheel) */}
                <div className="input-group">
                    <label className="input-label">What Time?</label>
                    <div style={{
                        height: '120px',
                        overflowY: 'scroll',
                        scrollSnapType: 'y mandatory',
                        border: 'var(--border-sketchy)',
                        borderRadius: '15px',
                        backgroundColor: 'white',
                        position: 'relative',
                        textAlign: 'center'
                    }}>
                        {/* Selection Highlight Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: '40px',
                            left: 0,
                            right: 0,
                            height: '40px',
                            backgroundColor: 'rgba(78, 205, 196, 0.2)',
                            pointerEvents: 'none',
                            borderTop: '1px solid var(--color-secondary)',
                            borderBottom: '1px solid var(--color-secondary)'
                        }}></div>

                        <div style={{ padding: '40px 0' }}>
                            {timeSlots.map(time => (
                                <div
                                    key={time}
                                    onClick={() => handleChange('time', time)}
                                    style={{
                                        height: '40px',
                                        lineHeight: '40px',
                                        scrollSnapAlign: 'center',
                                        fontSize: formData.time === time ? '1.4rem' : '1.1rem',
                                        fontWeight: formData.time === time ? 'bold' : 'normal',
                                        color: formData.time === time ? 'var(--color-primary)' : 'var(--color-text)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {time}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-secondary)', marginTop: '5px' }}>
                        {formData.time ? `Selected: ${formData.time}` : 'Scroll to pick a time'}
                    </div>
                </div>

                {/* 3. How Many? (Circle Buttons) */}
                <div className="input-group">
                    <label className="input-label">How Many Friends?</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {guestOptions.map(num => (
                            <button
                                key={num}
                                type="button"
                                className="btn"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: 0,
                                    borderRadius: '50%',
                                    backgroundColor: formData.guests == num ? 'var(--color-primary)' : 'white',
                                    color: formData.guests == num ? 'white' : 'var(--color-text)',
                                }}
                                onClick={() => handleChange('guests', num)}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            type="button"
                            className="btn"
                            style={{ padding: '0 10px', fontSize: '0.9rem' }}
                            onClick={() => handleChange('guests', '7+')}
                        >
                            7+
                        </button>
                    </div>
                </div>

                {/* 4. Who are you? (Combined Row) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="input-group">
                        <label className="input-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="input-field"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="input-field"
                            placeholder="Mobile"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '1.3rem', marginTop: '5px' }}
                    disabled={loading}
                >
                    {loading ? 'Scribbling...' : 'Book It! 🎉'}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
