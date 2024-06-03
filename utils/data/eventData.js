import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}`, {})
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateEvent = (eventId, event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => {
      if (response.status === 204) {
        return resolve(event);
      }
      console.warn('Response status:', response.status);
      return response.json().then((data) => {
        console.warn('Resolved data:', data);
        resolve(data);
      });
    })
    .catch(reject);
});

const deleteEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 204) {
        return {};
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const joinEvent = (eventId, eventData) => {
  const userId = '1'; // Replace with the actual user_id value
  const headers = {
    'Content-Type': 'application/json',
  };

  const requestBody = JSON.stringify({ ...eventData, user_id: userId });

  return fetch(`${clientCredentials.databaseURL}/events/${eventId}/join`, {
    method: 'POST',
    headers,
    body: requestBody,
  })
    .then((response) => {
      console.warn('Join Event Response:', response); // Add this line
      if (!response.ok) {
        throw new Error('Failed to join event');
      }
      return getEvents();
    })
    .catch((error) => {
      console.error('Error joining event:', error);
      throw error;
    });
};

const leaveEvent = (eventId) => {
  const userId = '1'; // Replace with the actual user_id value
  const requestBody = JSON.stringify({ user_id: userId });

  return fetch(`${clientCredentials.databaseURL}/events/${eventId}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  })
    .then((response) => {
      console.warn('Leave Event Response:', response); // Add this line
      if (!response.ok) {
        throw new Error('Failed to leave event');
      }
      return getEvents();
    })
    .catch((error) => {
      console.error('Error leaving event:', error);
      throw error;
    });
};

export {
  getEvents, createEvent, getSingleEvent, updateEvent, deleteEvent, leaveEvent, joinEvent,
};
