import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../utils/data/gameData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({
    skill_level: '',
    number_of_players: '',
    title: '',
    maker: '',
    game_type: '',
  });
  const router = useRouter();

  const { gameId } = router.query;

  useEffect(() => {
    if (gameId) {
      getSingleGame(gameId)
        .then((data) => {
          setGameDetails(data);
        })
        .catch((error) => console.error('Error fetching game details:', error));
    }
  }, [gameId]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div>
        <h2>{gameDetails.title}</h2>
        <p>Maker: {gameDetails.maker}</p>
        <p>Skill Level: {gameDetails.skill_level}</p>
        <p>Number of Players: {gameDetails.number_of_players}</p>
        <p>Game Type: {gameDetails.game_type}</p>
      </div>
    </div>
  );
}
