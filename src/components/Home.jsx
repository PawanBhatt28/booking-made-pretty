import React, { useState } from 'react';
import { restaurants } from '../data/restaurants';

const Home = ({ onSelectRestaurant }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            {/* Search Hero */}
            <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-xl) 0',
                backgroundColor: '#FFF9C4',
                marginBottom: 'var(--spacing-lg)',
                borderBottom: 'var(--border-sketchy)',
                borderRadius: '0 0 50% 50% / 0 0 20px 20px'
            }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', transform: 'rotate(-2deg)' }}>
                    Find Your Spot! 🍽️
                </h1>
                <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-md)' }}>
                    Where do you want to eat today?
                </p>
                <input
                    type="text"
                    placeholder="Search for pizza, sushi, or cafe..."
                    className="input-field"
                    style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Restaurant Grid */}
            <div className="container" style={{ paddingBottom: 'var(--spacing-xl)' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 'var(--spacing-lg)'
                }}>
                    {filteredRestaurants.map(restaurant => (
                        <div
                            key={restaurant.id}
                            className="card"
                            style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                            onClick={() => onSelectRestaurant(restaurant)}
                        >
                            <div style={{ height: '180px', overflow: 'hidden', borderBottom: 'var(--border-sketchy)' }}>
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{restaurant.name}</h3>
                                    <span style={{
                                        backgroundColor: 'var(--color-accent)',
                                        padding: '2px 8px',
                                        borderRadius: '10px',
                                        fontWeight: 'bold',
                                        border: '1px solid var(--color-text)'
                                    }}>
                                        ★ {restaurant.rating}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold', marginBottom: '10px' }}>
                                    {restaurant.cuisine}
                                </p>
                                <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
                                    {restaurant.description}
                                </p>
                                <button className="btn btn-primary" style={{ width: '100%' }}>
                                    Book Table
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
