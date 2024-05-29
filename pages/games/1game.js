import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../utils/data/gameData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: '',
    maker: '',
    gameTypeId: 0,
  });
  const router = useRouter();

  const { gameId } = router.query;

  useEffect(() => {
    console.warn('Game ID:', gameId); // Log gameId to check if it's extracted properly
    if (gameId) {
      getSingleGame(gameId)
        .then((data) => {
          console.warn('Game Details:', data); // Log game details to check if the API call is successful
          setGameDetails(data);
        })
        .catch((error) => console.error('Error fetching game details:', error));
    }
  }, [gameId]);

  console.warn('Game Details State:', gameDetails); // Log gameDetails state to check if it's being set properly

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div>
        <h2>{gameDetails.title}</h2>
        <p>Maker: {gameDetails.maker}</p>
        <p>Skill Level: {gameDetails.skillLevel}</p>
        <p>Number of Players: {gameDetails.numberOfPlayers}</p>
      </div>
    </div>
  );
}
