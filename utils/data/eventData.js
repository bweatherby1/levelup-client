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

export {
  getEvents, createEvent, getSingleEvent, updateEvent, deleteEvent,
};
