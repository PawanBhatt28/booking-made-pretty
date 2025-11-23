import React from 'react';

const Hero = ({ restaurant }) => {
    return (
        <section className="hero">
            <div className="container">
                <h1 className="hero-title animate-pop">
                    {restaurant ? `Welcome to ${restaurant.name}!` : "Hungry? Let's Book a Table!"}
                </h1>
                <p className="hero-subtitle">
                    {restaurant ? restaurant.description : "Skip the line and get straight to the good stuff. No phone calls required."}
                </p>
            </div>
        </section>
    );
};

export default Hero;
