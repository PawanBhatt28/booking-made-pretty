// API Client for Java Backend

export const getReservations = async () => {
  try {
    const response = await fetch('/api/reservations');
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
};

export const addReservation = async (reservation) => {
  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) throw new Error('Failed to create reservation');
    return await response.json();
  } catch (error) {
    console.error('Error adding reservation:', error);
    return null;
  }
};

export const updateReservationStatus = async (id, status) => {
  try {
    const response = await fetch(`/api/reservations/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain', // Controller expects String body
      },
      body: status,
    });
    if (!response.ok) throw new Error('Failed to update status');
    return await response.json();
  } catch (error) {
    console.error('Error updating status:', error);
    return null;
  }
};
