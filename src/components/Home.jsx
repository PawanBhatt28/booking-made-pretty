import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
        }
    };

    const filteredRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="container" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>Loading delicious spots... 🍕</div>;
    }

    return (
        <div>
            {/* Compact Search Header */}
            <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-lg) 0',
                backgroundColor: 'var(--color-bg)',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>
                    Find Your Table 🍽️
                </h1>
                <input
                    type="text"
                    placeholder="Search cuisine..."
                    className="input-field"
                    style={{ maxWidth: '300px', margin: '0 auto', display: 'block', borderRadius: 'var(--radius-pill)' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Bento Grid */}
            <div className="container" style={{ padding: 'var(--spacing-lg) var(--spacing-md)' }}>
                {filteredRestaurants.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                        No restaurants found. <Link to="/super-admin">Add one?</Link>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: 'var(--spacing-md)'
                    }}>
                        {filteredRestaurants.map(restaurant => (
                            <div key={restaurant.id} className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                                {/* Image Area (70%) */}
                                <div style={{ position: 'relative', height: '180px' }}>
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {/* Floating Pills */}
                                    <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px' }}>
                                        <span style={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            padding: '4px 8px',
                                            borderRadius: 'var(--radius-pill)',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            color: 'var(--color-primary)'
                                        }}>
                                            ★ {restaurant.rating}
                                        </span>
                                        <span style={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            padding: '4px 8px',
                                            borderRadius: 'var(--radius-pill)',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            color: 'var(--color-text-muted)',
                                            textTransform: 'uppercase'
                                        }}>
                                            {restaurant.cuisine}
                                        </span>
                                    </div>
                                </div>

                                {/* Info Area (Compact) */}
                                <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{restaurant.name}</h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: '1.3' }}>
                                            {restaurant.description.substring(0, 60)}...
                                        </p>
                                    </div>
                                    <Link
                                        to={`/book/${restaurant.id}`}
                                        className="btn btn-primary"
                                        style={{ width: '100%', marginTop: 'var(--spacing-md)', fontSize: '0.9rem', textAlign: 'center' }}
                                    >
                                        Book Table
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
