import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [reservations, setReservations] = useState([]);

    const loadReservations = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/reservations');
            if (response.ok) {
                const data = await response.json();
                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setReservations(sorted);
            }
        } catch (error) {
            console.error('Error loading reservations:', error);
        }
    };

    useEffect(() => {
        loadReservations();
        const interval = setInterval(loadReservations, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8081/api/reservations/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStatus)
            });
            if (response.ok) {
                loadReservations();
            } else {
                alert("Failed to update status. Please try again.");
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert("Failed to update status. Please try again.");
        }
    };

    // Analytics Logic
    const totalCovers = reservations.filter(r => r.status !== 'cancelled').reduce((acc, curr) => acc + parseInt(curr.guests), 0);
    const confirmedCount = reservations.filter(r => r.status === 'confirmed').length;

    // Peak Hours Data
    const peakHours = {};
    reservations.forEach(r => {
        if (r.time) {
            peakHours[r.time] = (peakHours[r.time] || 0) + 1;
        }
    });
    const sortedPeakHours = Object.entries(peakHours).sort((a, b) => b[1] - a[1]).slice(0, 3);

    // Frequent Diners (Mock logic based on phone number)
    const dinerHistory = {};
    reservations.forEach(r => {
        dinerHistory[r.phone] = (dinerHistory[r.phone] || 0) + 1;
    });
    const frequentDiners = Object.entries(dinerHistory)
        .filter(([_, count]) => count > 1)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    return (
        <div style={{ fontFamily: 'var(--font-main)', color: 'var(--color-text)' }}>
            <div style={{ marginBottom: '30px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '5px', color: 'var(--color-primary)' }}>Dashboard</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>Overview for tonight</p>
            </div>

            {/* Analytics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div className="card">
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Total Covers</h4>
                    <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-primary)', margin: '10px 0 0' }}>{totalCovers}</p>
                </div>
                <div className="card">
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Confirmed Bookings</h4>
                    <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-success)', margin: '10px 0 0' }}>{confirmedCount}</p>
                </div>
                <div className="card">
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Busiest Time</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-warning)', margin: '10px 0 0' }}>
                        {sortedPeakHours.length > 0 ? sortedPeakHours[0][0] : 'N/A'}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {sortedPeakHours.length > 0 ? `${sortedPeakHours[0][1]} bookings` : ''}
                    </p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>

                {/* Recent Bookings Table */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Recent Bookings</h3>
                    <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                            <thead style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                                <tr>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: 'var(--color-text-muted)' }}>Guest</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: 'var(--color-text-muted)' }}>Time</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: 'var(--color-text-muted)' }}>Status</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'right', fontWeight: '600', color: 'var(--color-text-muted)' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map(res => (
                                    <tr key={res.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: '12px 15px' }}>
                                            <div style={{ fontWeight: '500' }}>{res.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{res.guests} Pax • {res.phone}</div>
                                        </td>
                                        <td style={{ padding: '12px 15px' }}>{res.time}</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500',
                                                backgroundColor: res.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : res.status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                color: res.status === 'confirmed' ? 'var(--color-success)' : res.status === 'cancelled' ? 'var(--color-error)' : 'var(--color-warning)'
                                            }}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 15px', textAlign: 'right' }}>
                                            {res.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusChange(res.id, 'confirmed')}
                                                    className="btn btn-primary"
                                                    style={{
                                                        padding: '6px 12px',
                                                        fontSize: '0.85rem',
                                                    }}
                                                >
                                                    Accept
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar: Frequent Diners */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>VIP Insights</h3>
                    <div className="card">
                        {frequentDiners.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {frequentDiners.map(([phone, count]) => (
                                    <li key={phone} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>{phone}</span>
                                        <span style={{ fontWeight: 'bold', color: 'var(--color-warning)' }}>{count} visits</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No repeat customers yet.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
