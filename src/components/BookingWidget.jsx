import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Confirmation from './Confirmation';

const BookingWidget = ({ restaurant }) => {
    const [isBooked, setIsBooked] = useState(false);

    if (isBooked) {
        return <Confirmation onReset={() => setIsBooked(false)} />;
    }

    return (
        <div className="booking-widget">
            <BookingForm onBookingSuccess={() => setIsBooked(true)} restaurantName={restaurant?.name} />
        </div>
    );
};

export default BookingWidget;
