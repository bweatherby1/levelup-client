// EditGame.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame, updateGame } from '../../utils/data/gameData';
import GameForm from '../../components/game/GameForm';
import { useAuth } from '../../utils/context/authContext';

export default function EditGame() {
  const [editItem, setEditItem] = useState(null);
  const router = useRouter();
  const { gameId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (gameId) {
      getSingleGame(gameId).then(setEditItem);
    }
  }, [gameId]);

  const handleUpdate = (updatedGame) => {
    updateGame(gameId, updatedGame)
      .then(() => router.push('/games'));
  };

  return editItem && user ? (
    <GameForm obj={editItem} onSubmit={handleUpdate} user={user} />
  ) : (
    <div>Loading...</div>
  );
}
