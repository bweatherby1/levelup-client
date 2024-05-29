import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const GameCard = ({
  title, maker, numberOfPlayers, skillLevel, gameId,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '/games/1game',
      query: { gameId },
    });
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <Button onClick={handleClick}>View Game Details</Button>
    </Card>
  );
};

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired, // Ensure gameId is defined as a prop
};

export default GameCard;
