import React, { useState, useEffect } from 'react';
import { getReservations, updateReservationStatus } from '../utils/storage';

const AdminDashboard = () => {
    const [reservations, setReservations] = useState([]);

    const loadReservations = async () => {
        const data = await getReservations();
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReservations(sorted);
    };

    useEffect(() => {
        loadReservations();
        const interval = setInterval(loadReservations, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        await updateReservationStatus(id, newStatus);
        loadReservations();
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
        <div className="animate-fade-in" style={{ fontFamily: 'Inter, sans-serif', color: '#333' }}>
            <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '5px', color: '#111' }}>Dashboard</h2>
                <p style={{ color: '#666' }}>Overview for tonight</p>
            </div>

            {/* Analytics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Covers</h4>
                    <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2C3E50', margin: '10px 0 0' }}>{totalCovers}</p>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Confirmed Bookings</h4>
                    <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#27AE60', margin: '10px 0 0' }}>{confirmedCount}</p>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Busiest Time</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#D35400', margin: '10px 0 0' }}>
                        {sortedPeakHours.length > 0 ? sortedPeakHours[0][0] : 'N/A'}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>
                        {sortedPeakHours.length > 0 ? `${sortedPeakHours[0][1]} bookings` : ''}
                    </p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>

                {/* Recent Bookings Table */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Recent Bookings</h3>
                    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                            <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #e0e0e0' }}>
                                <tr>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Guest</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Time</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: '#555' }}>Status</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'right', fontWeight: '600', color: '#555' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map(res => (
                                    <tr key={res.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '12px 15px' }}>
                                            <div style={{ fontWeight: '500' }}>{res.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#888' }}>{res.guests} Pax • {res.phone}</div>
                                        </td>
                                        <td style={{ padding: '12px 15px' }}>{res.time}</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500',
                                                backgroundColor: res.status === 'confirmed' ? '#E8F5E9' : res.status === 'cancelled' ? '#FFEBEE' : '#FFF3E0',
                                                color: res.status === 'confirmed' ? '#2E7D32' : res.status === 'cancelled' ? '#C62828' : '#EF6C00'
                                            }}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 15px', textAlign: 'right' }}>
                                            {res.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusChange(res.id, 'confirmed')}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#27AE60',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        fontSize: '0.85rem',
                                                        cursor: 'pointer'
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
                    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', padding: '20px' }}>
                        {frequentDiners.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {frequentDiners.map(([phone, count]) => (
                                    <li key={phone} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #f5f5f5' }}>
                                        <span style={{ color: '#555' }}>{phone}</span>
                                        <span style={{ fontWeight: 'bold', color: '#D35400' }}>{count} visits</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: '#888', fontStyle: 'italic' }}>No repeat customers yet.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
