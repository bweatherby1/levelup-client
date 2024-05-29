import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGame = (game) => fetch(`${clientCredentials.databaseURL}/games`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(game),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating game:', error);
    throw error; // Re-throw the error to propagate it to the caller
  });

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`, {})
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getGames, createGame, getGameTypes };
