import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame, getGameTypes } from '../../utils/data/gameData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({
    skill_level: '',
    number_of_players: '',
    title: '',
    maker: '',
    game_type: '',
  });
  const [gameTypes, setGameTypes] = useState([]);
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
    getGameTypes()
      .then((types) => {
        setGameTypes(types);
      })
      .catch((error) => console.error('Error fetching game types:', error));
  }, [gameId]);

  // Helper function to get the label for a given game type ID
  const getGameTypeLabel = (gameTypeId) => {
    const gameType = gameTypes.find((type) => type.id === gameTypeId);
    return gameType ? gameType.label : '';
  };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div>
        <h2>{gameDetails.title}</h2>
        <p>Maker: {gameDetails.maker}</p>
        <p>Skill Level: {gameDetails.skill_level}</p>
        <p>Number of Players: {gameDetails.number_of_players}</p>
        <p>Game Type: {getGameTypeLabel(gameDetails.game_type)}</p>
      </div>
    </div>
  );
}
