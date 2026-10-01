const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchDestinations(filters = {}) {
  try {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE_URL}/destinations?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch destinations');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API error, using local fallback:', err);
    return null;
  }
}

export async function generateItineraryApi(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/generate-itinerary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to generate itinerary');
    return await res.json();
  } catch (err) {
    console.warn('API error during generation:', err);
    return null;
  }
}

export async function sendChatMessageApi(message, destinationName) {
  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, destinationName })
    });
    if (!res.ok) throw new Error('Chat API error');
    return await res.json();
  } catch (err) {
    return { reply: "I'm having trouble connecting to the network right now, but here's a general tip: always keep digital backups of your travel documents!" };
  }
}

export async function submitBookingApi(bookingData) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('Booking API error');
    return await res.json();
  } catch (err) {
    return {
      success: true,
      bookingReference: 'TM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      message: 'Reservation simulation successful! Details saved to your itinerary.'
    };
  }
}
