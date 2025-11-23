import React, { useState, useEffect } from 'react';

const SuperAdmin = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        cuisine: '',
        location: '',
        rating: 4.5,
        image: '',
        description: '',
        ownerPhone: '',
        ownerEmail: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/restaurants');
            if (response.ok) {
                const data = await response.json();
                setRestaurants(data);
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8081/api/restaurants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Restaurant added successfully! 🎉');
                setFormData({
                    name: '', cuisine: '', location: '', rating: 4.5,
                    image: '', description: '', ownerPhone: '', ownerEmail: ''
                });
                fetchRestaurants();
            } else {
                alert('Failed to add restaurant 😢');
            }
        } catch (error) {
            console.error('Error adding restaurant:', error);
            alert('Error connecting to server 🔌');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
            <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>Super Admin Dashboard 🦸‍♂️</h1>

            <div className="split-layout" style={{ minHeight: 'auto', gap: 'var(--spacing-xl)' }}>
                {/* Add Restaurant Form */}
                <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Add New Restaurant</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Name</label>
                            <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                            <div className="input-group">
                                <label className="input-label">Cuisine</label>
                                <input type="text" name="cuisine" className="input-field" value={formData.cuisine} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Location</label>
                                <input type="text" name="location" className="input-field" value={formData.location} onChange={handleChange} required />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                            <div className="input-group">
                                <label className="input-label">Rating</label>
                                <input type="number" step="0.1" name="rating" className="input-field" value={formData.rating} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Image URL</label>
                                <input type="url" name="image" className="input-field" value={formData.image} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Description</label>
                            <textarea name="description" className="input-field" rows="3" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                            <div className="input-group">
                                <label className="input-label">Owner Phone</label>
                                <input type="tel" name="ownerPhone" className="input-field" value={formData.ownerPhone} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Owner Email</label>
                                <input type="email" name="ownerEmail" className="input-field" value={formData.ownerEmail} onChange={handleChange} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Adding...' : 'Add Restaurant 🚀'}
                        </button>
                    </form>
                </div>

                {/* List of Restaurants */}
                <div>
                    <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Existing Restaurants</h2>
                    <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                        {restaurants.map(r => (
                            <div key={r.id} className="card" style={{ padding: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                <img src={r.image} alt={r.name} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{r.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>{r.cuisine} • {r.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdmin;
