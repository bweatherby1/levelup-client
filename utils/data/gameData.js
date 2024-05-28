import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGame = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {})
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gameTypes`, {})
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getGames, createGame, getGameTypes };
