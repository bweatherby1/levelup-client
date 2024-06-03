import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/game/GameCard';
import { getGames, deleteGame } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const handleDeleteGame = async (gameId) => {
    await deleteGame(gameId);
    const updatedGames = await getGames();
    setGames(updatedGames);
  };

  return (
    <article className="games">
      <header>
        <h1 className="header">Games</h1>
        <Button
          onClick={() => {
            router.push('/games/new');
          }}
        >
          Register New Game
        </Button>
      </header>
      <div className="gameContainer">
        {games.map((game) => (
          <div key={`game--${game.id}`} className="gameCard">
            <GameCard
              gameId={game.id}
              title={game.title}
              maker={game.maker}
              numberOfPlayers={game.number_of_players}
              skillLevel={game.skill_level}
              onDelete={handleDeleteGame}
            />
          </div>
        ))}
      </div>
    </article>
  );
}

export default Home;
