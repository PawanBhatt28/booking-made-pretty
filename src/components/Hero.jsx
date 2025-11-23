import React from 'react';
import doodles from '../assets/doodles.png';

const Hero = ({ restaurant }) => {
    return (
        <section className="hero animate-fade-in">
            <div className="container hero-content" style={{ position: 'relative' }}>
                {/* Decorative Doodles - Hidden on very small screens to save space, or smaller */}
                <img
                    src={doodles}
                    alt="Crayon Doodles"
                    className="hero-doodle"
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '5%',
                        width: '80px',
                        transform: 'rotate(10deg)',
                        opacity: 0.8,
                        pointerEvents: 'none'
                    }}
                />

                <h1 className="hero-title">
                    {restaurant ? (
                        <span style={{ color: 'var(--color-primary)' }}>{restaurant.name}</span>
                    ) : (
                        <>
                            <span style={{ color: 'var(--color-primary)' }}>Eat.</span>
                            <span style={{ color: 'var(--color-secondary)' }}> Drink.</span>
                            <span style={{ color: 'var(--color-accent)' }}> Enjoy!</span>
                        </>
                    )}
                </h1>
                <p className="hero-subtitle">
                    {restaurant ? restaurant.description : "Welcome to our happy place! Come sit with us."}
                </p>
            </div>
        </section>
    );
};

export default Hero;
